function refreshWeather(response) {
  let tempElement = document.querySelector("#weather-app-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#weather-app-date");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  tempElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = ` ${Math.round(
    response.data.wind.speed / 1.609344
  )} mph`;
  dateElement.innerHTML = formateDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class= "weather-app-icon"/>`;

  getForecast(response.data.city);
}

function formateDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  //make the api call and update to interface
  let apiKey = "1o334f343ac7e4f31b2ae638t364b007";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Miami");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "1o334f343ac7e4f31b2ae638t364b007";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast">
              <div class="weather-forecast-date">${formatDay(day.time)}</div>

              <img src="${
                day.condition.icon_url
              }" class="weather-forecast-icon" />
              <div class="weather-forecast-temperatures">

              <div class="weather-forecast-temperature-max">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>

              <div class="weather-forecast-temperature-min">${Math.round(
                day.temperature.minimum
              )}°</div>
              </div>
           </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
searchCity("Miami");
