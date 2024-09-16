document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const searchBtn = document.getElementById("search-btn");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const weatherIcon = document.getElementById("weather-icon");
  const timeDay = document.getElementById("time-day");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");

  const apiKey = "t2c95710o0f6f81ca031b16df4bbe950";
  const apiUrl = "https://api.shecodes.io/weather/v1/current?query=";

  function fetchWeather(city) {
    fetch(`${apiUrl}${city}&key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        updateWeatherUI(data);
      })
      .catch((error) => console.log("Error:", error));
  }

  function formatDateTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleDateString(undefined, options);
  }

  function updateWeatherUI(data) {
    cityName.textContent = data.city;
    temperature.textContent = `${Math.round(data.temperature.current)}°C`;
    weatherIcon.src = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${data.condition.icon}.png`;

    const formattedTime = formatDateTime(data.time);
    timeDay.textContent = `${formattedTime}, ${data.condition.description}`;

    humidity.textContent = `Humidity: ${data.temperature.humidity}%`;
    wind.textContent = `Wind: ${data.wind.speed} km/h`;
  }

  searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
      fetchWeather(city);
    }
  });

  fetchWeather("Paris");
});
