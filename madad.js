const http = require("http");
const fs = require("fs");
const url = require("url");
const axios = require("axios");

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
const madadFile = fs.readFileSync("madad.html", "utf-8");

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;

  // Default to "Delhi" if no city is provided
  const city = queryObject.city || "Delhi";

  if (req.url.startsWith("/")) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=12e347fc60d51cb2410bb1ff5cd89c46&units=imperial`;

    console.log(`Fetching weather data for ${city}...`);

    // Use Axios to fetch the weather data
    axios
      .get(api)
      .then((response) => {
        console.log("Weather data fetched successfully:", response.data);

        const realdata = replaceVal(madadFile, response.data);
        res.setHeader("Content-Type", "text/html");
        res.write(realdata);
        res.end();
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error.message);
        res.statusCode = 500;
        res.end(`<h1>Could not fetch weather data for "${city}"</h1>`);
      });
  } else {
    res.statusCode = 404;
    res.end("Page Not Found");
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
