function refreshWeather(response) {
  let tempElement = document.querySelector("#weather-app-temperature");
  let temperature = response.data.temperature.current;

  let cityElement = document.querySelector("#weather-app-city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = ` ${Math.round(
    response.data.wind.speed / 1.609344
  )} mph`;
  let dateElement = document.querySelector("#weather-app-date");
  let date = new Date(response.data.time * 1000);

  dateElement.innerHTML = formateDate(date);

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

  tempElement.innerHTML = Math.round(temperature);
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
