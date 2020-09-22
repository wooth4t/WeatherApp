let time = new Date();

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[time.getDay()];

let months = [
  "Jan",
  "Feb",
  "Ma",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[time.getMonth()];

let date = time.getDate();
let year = time.getFullYear();

let h1 = document.querySelector("#present");
h1.innerHTML = `${day} ${month} ${date}, ${year}`;

function addZeroH() {
  if (hour < 10) {
    hour = "0" + hour;
  }
  return hour;
}

function addZeroM() {
  if (minute < 10) {
    minute = "0" + minute;
  }
  return minute;
}

let hour = time.getHours();
let minute = time.getMinutes();
addZeroH();
addZeroM();
let currentTime = `${hour}:${minute}`;

let h2 = document.querySelector("#hour-minute");
h2.innerHTML = `${currentTime}`;

function showTemperature(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);

  let updateCurrentTemp = document.querySelector("#currentTemp");
  updateCurrentTemp.innerHTML = `${temperature}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h4 = document.querySelector("#city-searched");
  h4.innerHTML = `${searchInput.value}`;

  let apiKey = "a293c24d2c990fb6e2eb0ee4dacc8fe9";
  let units = "metric";
  let city = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// let celsiusTemperature = Math.round(temperature);
// let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);
