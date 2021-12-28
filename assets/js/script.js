var cityNameEl = document.querySelector("#cityName");
var searchInputEl = document.querySelector("#citySearch")
var searchFormEl = document.querySelector("#search-form")

var getCityCoord = function (city) {
	var API_Key = "7944758690feb8acd835037db2bb2590";
	// format the open weather api url
	var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayCity(data.name)
        getCurrentWeather(data.coord.lat, data.coord.lon)
      });
    } else {
      alert("Error: City not found")
    }
		
	});
};

// 2. city search function
var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from search bar
  var searchedCity = searchInputEl.value.trim();

  if (searchedCity) {
    console.log(searchedCity);
    getCityCoord(searchedCity);
  } 
};

searchFormEl.addEventListener("submit", formSubmitHandler);

var getCurrentWeather = function (lat, lon) {
  console.log(lat, lon);

  var API_Key = "7944758690feb8acd835037db2bb2590";

  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_Key}`
  
  fetch(currentWeatherUrl).then(function (response) {
		response.json().then(function (data) {
      console.log(data);
		});
	});
}

var displayCity = function (city) {
  cityNameEl.innerHTML = city
}
