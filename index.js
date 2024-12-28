import http from "http";
import fs from "fs";
import path from "path";
import fetch from "node-fetch"; // Import node-fetch

// Function to replace placeholders in the HTML template with actual weather data
const replaceVal = (tempVal, orgVal) => {
  let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
  temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
  temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);
  temperature = temperature.replace("{%location%}", orgVal.name);
  return temperature;
};

// Read the HTML template into memory
const indexFile = fs.readFileSync("staticfile/madad.html", "utf-8");

const server = http.createServer((req, res) => {
  // Handle the favicon request (without running endlessly)
  if (req.url == "/favicon.ico") {
    res.statusCode = 204; // No Content
    res.end();
    return; // Exit early to avoid handling this as a full request
  }

  // Handle the root request
  if (req.url == "/") {
    const api =
      "https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=12e347fc60d51cb2410bb1ff5cd89c46";

    console.log("Fetching weather data...");

    fetch(api)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Weather data fetch failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Weather data fetched successfully:", data);

        const realdata = replaceVal(indexFile, data);
        res.write(realdata);
        res.end();
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        res.statusCode = 500;
        res.end("Server Error");
      });
  }

  // Serve the static CSS and JS files
  else if (req.url == "/madad.css") {
    const filePath = path.join(__dirname, "staticfile", "madad.css");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end("CSS file not found");
        return;
      }
      res.setHeader("Content-Type", "text/css");
      res.write(data);
      res.end();
    });
  } else if (req.url == "/madad.js") {
    const filePath = path.join(__dirname, "staticfile", "madad.js");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end("JavaScript file not found");
        return;
      }
      res.setHeader("Content-Type", "application/javascript");
      res.write(data);
      res.end();
    });
  }

  // If the user requests any other unknown file, return 404
  else {
    res.statusCode = 404;
    res.end("Page Not Found");
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
