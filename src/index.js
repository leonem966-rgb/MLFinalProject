function displayCityTemperature(response) {
   let temperatureElement = document.querySelector("#current-temp");
   let temperature = Math.round(response.data.temperature.current);
   let cityElement = document.querySelector("#current-city");
   let date = new Date(response.data.time * 1000);
   let timeElement = document.querySelector("#time");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windSpeedElement = document.querySelector("#wind-speed");
   let iconElement = document.querySelector("#icon");

  
cityElement.innerHTML = response.data.city;  
timeElement.innerHTML = formatDate(date);    
temperatureElement.innerHTML = temperature;
descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;  
iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temp-icon"/>`;

getForecast(response.data.city);  
}   

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDate();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[date.getDay()];
  return `${formattedDay} ${day}, ${hours}:${minutes}`;
}

function searchCurrentCity(cityElement) {
    let apiKey = "abtb6a92443361bbdo4b8fd76decc014";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityElement}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityTemperature);
  }

function search(event) {
event.preventDefault();
let searchInputElement = document.querySelector("#search-input");
searchCurrentCity(searchInputElement.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "abtb6a92443361bbdo4b8fd76decc014";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {

  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
  forecastHTML =
  forecastHTML + 
  `
  <div class="range-forecast-day">
      <div class="range-forecast-date">${formatDay(day.time)}</div>

      <img src="${day.condition.icon_url}" class="range-forecast-icon" />
      <div class="range-forecast-temperatures">
        <div class="range-forecast-temperature">
          <strong>${Math.round(day.temperature.maximum)}°</strong>
        </div>
        <div class="range-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
     </div>
  </div>
`;
  });

let forecastElement = document.querySelector("#forecast");    
forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

searchCurrentCity("Kingston");
getForecast("Kingston");
displayForecast();

