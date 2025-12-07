function displayCityTemperature(response) {
   let temperatureElement = document.querySelector("#current-temp");
   let temperature = Math.round(response.data.temperature.current);
   let cityElement = document.querySelector("#current-city");
   let date = new Date(response.data.time * 1000);
   let timeElement = document.querySelector("#time");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windSpeedElement = document.querySelector("#wind-speed");
  
   

cityElement.innerHTML = response.data.city;  
timeElement.innerHTML = formatDate;    
temperatureElement.innerHTML = temperature;
descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;  


}   

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

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

  let date = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

searchCurrentCity("Kingston");

