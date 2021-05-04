var userFormEl = document.querySelector("#user-form");
var cityNameEl = document.querySelector("#username");
var citiesContainerEl = document.querySelector("#cities-container");
var weatherContainerEl = document.querySelector("#current-weather-container");
var citySearchInputEl = document.querySelector("#searched-city");
var cityEl = document.querySelector("#results-city");
var cityInputEl = document.querySelector("#results-city");
var lastSearchButtonEl = document.querySelector("#last-search-button");

var cities = [];

//button function
var citySearch = function (event) {
  event.preventDefault();

  var cityState = cityNameEl.value.trim();

  if (cityState) {
    getWeather(cityState);

    citySearchInputEl.textContent = "";
    cityNameEl.textContent = "";
  } else {
    alert("Please enter a city to start your search");
  }

  var saveSearch = function () {
    localStorage.setItem("cities", JSON.stringify(JSON.stringify(cities)));
  };
  saveSearch();
  lastSearch(cityState);
};

//fetch to get weather
var getWeather = function (city) {
  var apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=9fc0d146e8b9c3492bad6e84401335c1&units=imperial`;

  fetch(apiWeather).then(function (response) {
    response.json().then(function (data) {
      displayWeather(data, city);
    });
  });
};

//function to show weather
var displayWeather = function (weather, searchCity) {
  weatherContainerEl.textContent = "";
  citySearchInputEl.textContent = searchCity;

  //date
  var date = document.createElement("span");
  date.textContent = "(" + moment().format("MMM DD, YYYY") + ")";
  citySearchInputEl.appendChild(date);

  //temperature
  var temperature = document.createElement("span");
  temperature.textContent = "Temperature:" + weather.main.temp + "°F";
  temperature.classList = "list-group-item";

  //humidity
  var humidity = document.createElement("span");
  humidity.textContent = "Humidity:" + weather.main.humidity + "%";

  //windspeed
  var windSpeed = document.createElement("span");
  windSpeed.textContent = "Windspeed:" + weather.wind.speed + "mph";

  //uvindex

  // var uv = document.createElement("span");
  // uv.textContent = "UV Index: " + weather.current.uvi;

  //appends so that pieces will show in container
  weatherContainerEl.appendChild(temperature);

  weatherContainerEl.appendChild(humidity);

  weatherContainerEl.appendChild(windSpeed);
};

//functionto call UV so that it can be highlighted
var getUv = function (lat, lon) {
  var apiKey = "9fc0d146e8b9c3492bad6e84401335c1";
  var apiWeather = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;

  fetch(apiWeather).then(function (response) {
    response.json().then(function (data) {
      displayUv(data);
    });
  });
};
//function to show UV index
var displayUv = function (uvShow) {
  var uv = document.createElement("div");
  uv.textContent = "UV Index: ";
  uv.textContent.classList = "list-group-item";

  uvValue = document.createElement("span");
  uvValue.textContent = uvShow.value;

  if (uvShow.value < 3) {
    uvValue.classList = "favorable";
  } else if (uvShow.value > 3 && uvShow.value < 5) {
    uvValue.classList = "moderate";
  } else if (uvShow.value > 5) {
    uvValue.classList = "severe";

    uv.appendChild(uvValue);

    weatherContainerEl.appendChild(uv);
  }
};

//create a button that shows the last city that was searched
var lastSearch = function (lastSearch) {
  lastSearchEl = document.createElement("button");
  lastSearchEl.textContent = lastSearch;
  lastSearchEl.setAttribute("data-city", lastSearch);
  lastSearchEl.setAttribute("type", "submit");

  lastSearchButtonEl.prepend(lastSearchEl);
};

//show the last place that was searched
var lastSearchPlace = function (event) {
  var cityState = event.target.getAttribute("data-city");
  if (cityState) {
    getWeather(cityState);
  }
};

userFormEl.addEventListener("submit", citySearch);
cityNameEl.addEventListener("click", displayWeather);
lastSearchButtonEl.addEventListener("click", lastSearchPlace);
