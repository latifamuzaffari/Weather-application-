document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "b2a5adcct04b33178913oc335f405433"; // Replace with your actual API key
  const currentWeatherUrl = "https://api.shecodes.io/weather/v1/current?query=";
  const forecastWeatherUrl =
    "https://api.shecodes.io/weather/v1/forecast?query=";

  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-form-input");
  const cityElement = document.querySelector("#city");
  const temperatureElement = document.querySelector("#temperature");
  const descriptionElement = document.querySelector("#description");
  const humidityElement = document.querySelector("#humidity");
  const windSpeedElement = document.querySelector("#wind-speed");
  const timeElement = document.querySelector("#time");
  const iconElement = document.querySelector("#icon");
  const forecastContainer = document.querySelector("#forecast");

  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
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

  function refreshWeather(data) {
    const date = new Date(data.time * 1000);
    cityElement.textContent = data.city;
    timeElement.textContent = formatDate(date);
    descriptionElement.textContent = data.condition.description;
    humidityElement.textContent = `${data.temperature.humidity}%`;
    windSpeedElement.textContent = `${data.wind.speed}km/h`;
    temperatureElement.textContent = Math.round(data.temperature.current);
    iconElement.innerHTML = `<img src="${data.condition.icon_url}" class="weather-app-icon" />`;
    getForecast(data.city);
  }

  function getForecast(city) {
    axios
      .get(`${forecastWeatherUrl}${city}&key=${apiKey}`)
      .then((response) => displayForecast(response.data.daily))
      .catch((error) => console.log("Error fetching forecast:", error));
  }

  function displayForecast(forecastData) {
    forecastContainer.innerHTML = "";
    forecastData.slice(0, 5).forEach((day) => {
      const forecastDay = document.createElement("div");
      forecastDay.className = "weather-forecast-day";
      const formattedDay = formatDay(day.time);
      forecastDay.innerHTML = `
        <div class="weather-forecast-date">${formattedDay}</div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <strong>${Math.round(day.temperature.maximum)}º</strong> /
          ${Math.round(day.temperature.minimum)}º
        </div>
      `;
      forecastContainer.appendChild(forecastDay);
    });
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }

  function searchCity(city) {
    axios
      .get(`${currentWeatherUrl}${city}&key=${apiKey}`)
      .then((response) => refreshWeather(response.data))
      .catch((error) => alert("City not found, please try again"));
  }

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = searchInput.value.trim();
    if (city) {
      searchCity(city);
    }
  });

  
  searchCity("Paris");
});
