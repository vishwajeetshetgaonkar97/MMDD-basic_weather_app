$(document).ready(function () {
  // Function to fetch weather data and update the UI
  function fetchWeather(cityName, containerId) {
    var apiKey = "5dd765a29b95b2e058dfd9f33a1dbd0d";
    var apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=metric";

    $.getJSON(apiUrl, function (data) {
      var weatherDescription = data.weather[0].description;
      var temp = data.main.temp;
      var iconCode = data.weather[0].icon;

      $("#" + containerId + " .city").html(cityName);
      $("#" + containerId + " .weather-description").html(weatherDescription);
      $("#" + containerId + " .temp").html(temp + " °C");

      // icon URL
      var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
      $("#" + containerId + " .weather-icon").attr("src", iconUrl);
    });
  }

  // Fetch weather for London
  fetchWeather("London", "city1");

  // Fetch weather for Mumbai
  fetchWeather("Mumbai", "city2");

  // geolocation enabled
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      var cityContainerId = "city3";
      $.getJSON( "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + "5dd765a29b95b2e058dfd9f33a1dbd0d" +"&units=metric",
        function (data) {
          var cityName = data.name;
          fetchWeather(cityName, cityContainerId);
        }
      );
    });
  }
});
