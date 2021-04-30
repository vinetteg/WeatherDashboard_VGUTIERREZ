var userFormEl = document.querySelector("#user-form");
var cityNameEl = document.querySelector("#username");
var citiesContainerEl = document.querySelector("#cities-container");
var cityEl = document.querySelector("#results-city");
var cityInputEl = document.querySelector("#results-city");
//button function
var citySearch = function (event) {
  event.preventDefault();

  var cityState = cityNameEl.value.trim();

  if (cityState) {
    getUserRepos(cityState);

    citiesContainerEl.textContent = "";
    cityNameEl.textContent = "";
  } else alert("Please enter a city to start your search");
};

var getWeather = function (weather) {
  var apiWeather =
    "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";
  fetch(apiWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
};

var displayWeather = function (repos, searchTerm) {
  if (repos.length === 0) {
    cityInputEl.textContent = "Please check city name that was entered";
    return;
  }
  cityInputEl.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    var cityNameResult = repos[i].owner.login;

    var weatherEl = document.createElement("a");
    weatherEl.classList = "list-item";
    weatherEl.setAttribute(cityNameResult);

    var titleEl = document.createElement("span");
    titleEl.textContent = cityNameResult;

    weatherEl.appendChild(titleEl);

    repoContainerEl.appendChild(titleEl);
  }
};

userFormEl.addEventListener("submit", citySearch);
