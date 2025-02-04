document.getElementById("searchBtn").addEventListener("click", function () {
  document.getElementById("loading").style.display = "block"; // Show loading
  document.getElementById("errorMsg").textContent = ""; // Clear errors

  const city = document.getElementById("cityInput").value.trim();
  if (city === "") {
    document.getElementById("errorMsg").textContent =
      "Please enter a city name";
    document.getElementById("loading").style.display = "none"; // Hide loading
    return;
  }

  const apiKey = "7f1a185e63b08825317b052bb55002ac"; // Replace with a valid API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("loading").style.display = "none"; // Hide loading
      console.log(data); // Log data to check

      document.getElementById(
        "cityName"
      ).textContent = `Weather in ${data.name}`;
      document.getElementById(
        "temperature"
      ).textContent = `Temperature: ${data.main.temp}°C`;
      document.getElementById(
        "humidity"
      ).textContent = `Humidity: ${data.main.humidity}%`;
      document.getElementById("condition").textContent =
        data.weather[0].description;
      document.getElementById(
        "weatherIcon"
      ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

      document.getElementById("weatherInfo").style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById("errorMsg").textContent = "Error fetching data";
      document.getElementById("loading").style.display = "none";
    });
});
