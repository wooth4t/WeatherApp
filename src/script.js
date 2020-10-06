function formatDate(timestamp) {
 let now = new Date(timestamp);

 let hours = now.getHours();
 if (hours < 10) {
  hours = `0${hours}`;
 }
 let minutes = now.getMinutes();
 if (minutes < 10) {
  minutes = `0${minutes}`;
 }

 let currentTime = `${hours}:${minutes}`;
 let h2 = document.querySelector("#hour-minute");
 h2.innerHTML = `${currentTime}`;

 let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
 let day = days[now.getDay()];
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
 let month = months[now.getMonth()];
 let date = now.getDate();
 let year = now.getFullYear();
 let presentDate = `${day} ${month} ${date}, ${year}`;
 return `${presentDate}`;
}

function formatHours(timestamp) {
 let now = new Date(timestamp);
 let hours = now.getHours();
 if (hours < 10) {
  hours = `0${hours}`;
 }

 let minutes = now.getMinutes();
 if (minutes < 10) {
  minutes = `0${minutes}`;
 }

 return `${hours}:${minutes}`;
}

function displayTemperature(response) {
 console.log(response.data);
 let temperatureElement = document.querySelector("#temperature");
 let cityElement = document.querySelector("#city");
 let descriptionElement = document.querySelector("#description");
 let humidityElement = document.querySelector("#humidity");
 let windElement = document.querySelector("#wind");
 let dateElement = document.querySelector("#date");
 let iconElement = document.querySelector("#icon");

 celsiusTemperature = response.data.main.temp;

 temperatureElement.innerHTML = Math.round(celsiusTemperature);
 cityElement.innerHTML = response.data.name;
 descriptionElement.innerHTML = response.data.weather[0].description;
 humidityElement.innerHTML = response.data.main.humidity;
 windElement.innerHTML = Math.round(response.data.wind.speed);
 dateElement.innerHTML = formatDate(response.data.dt * 1000);

 iconElement.setAttribute(
  "src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
 );
 iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
 let forecastElement = document.querySelector("#forecast");
 forecastElement.innerHTML = null;
 let forecast = null;

 for (let index = 0; index < 6; index++) {
  forecast = response.data.list[index];
  let forecastCalculated = forecast.dt * 1000;
  forecastElement.innerHTML += `
 <div class="col-3 mini-time">${formatHours(forecastCalculated)}</div>
         <div class="col-3">
          <img
           src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
           }@2x.png"
           class="mini-emoji"
          />
         </div>
         <div class="col-6 mini-temp">
          HI ${Math.round(forecast.main.temp_min)}° / LO ${Math.round(
   forecast.main.temp_max
  )}°
         </div>`;
 }
}

function search(city) {
 let apiKey = "a293c24d2c990fb6e2eb0ee4dacc8fe9";
 let units = "metric";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
 axios.get(apiUrl).then(displayTemperature);

 apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
 axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
 event.preventDefault();
 let searchInput = document.querySelector("#search-text-input");

 let city = `${searchInput.value}`;
 search(city);

 let h4 = document.querySelector("#city");
 h4.innerHTML = `${searchInput.value}`;
}

function displayFahrenheitTemperature(event) {
 event.preventDefault();
 let temperatureElement = document.querySelector("#temperature");
 celsiusLink.classList.remove("active");
 fahrenheitLink.classList.add("active");
 let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
 temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
 event.preventDefault();
 let temperatureElement = document.querySelector("#temperature");
 celsiusLink.classList.add("active");
 fahrenheitLink.classList.remove("active");
 temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Toronto");
