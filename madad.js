let date = document.getElementById("date");
let minmax = document.getElementsByClassName("min-max");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temperature");

const tempstatus = "{%tempstatus%}";
// console.log(tempstatus);
if (tempstatus == "Sunny") {
  icon.innerHTML = "<i class='fa-solid fa-sun fa-5x'></i>";
} else if (tempstatus == "Clouds") {
  icon.innerHTML =
    "<i class='fa-solid fa-cloud fa-5x'  style='color:#fff'></i>";
} else if (tempstatus == "Rain" || tempstatus == "Thunderstorm") {
  icon.innerHTML =
    "<i class='fa-solid fa-cloud-rain fa-5x'  style='color:#747d8c'></i>";
} else if (tempstatus == "Clouds") {
  icon.innerHTML =
    "<i class='fa-solid fa-cloud fa-5x'  style='color:#44c3de'></i>";
} else {
  icon.innerHTML =
    "<i class='fa-solid fa-cloud fa-5x'  style='color:#778beb'></i>";
}
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getDate() {
  const d = new Date();
  return `${days[d.getDay()]} || ${d.getDate().toString().padStart(2, "0")} ${
    months[d.getMonth()]
  } ${d.getFullYear()} |`;
}

function getTime() {
  const now = new Date();
  let hours = now.getHours() % 12 || 12; // Convert 0 or 24 to 12
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours.toString().padStart(2, "0")} : ${minutes} ${
    hours >= 12 ? "PM" : "AM"
  }`;
}

date.innerHTML = `${getDate()}| ${getTime()}`;
