function refreshWeather(response) {
  let tempElement = document.querySelector("#weather-app-temperature");
  let temperature = response.data.temperature.current;

  let cityElement = document.querySelector("#weather-app-city");
  cityElement.innerHTML = response.data.city;

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
