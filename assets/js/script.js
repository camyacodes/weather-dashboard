//global variables

var cityNameEl = document.querySelector("#cityName");
var searchInputEl = document.querySelector("#citySearch");
var searchFormEl = document.querySelector("#search-form");
var currentWeatherAttributesEl = document.querySelector("#current-attributes");
var cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];

var getCityCoord = function (city) {
	var API_Key = "7944758690feb8acd835037db2bb2590";
	// format the open weather api url
	var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`;

	fetch(apiUrl).then(function (response) {
		if (response.ok) {
			response.json().then(function (data) {
				// console.log(data);
				displayCity(data.name);
				getCurrentWeather(data.coord.lat, data.coord.lon);
			});
		} else {
			alert("Error: City not found");
		}
	});
};

// 2. city search function
var formSubmitHandler = function (event) {
	event.preventDefault();
	// get value from search bar
	var searchedCity = searchInputEl.value.trim();

	if (searchedCity) {
		// console.log(searchedCity);
		getCityCoord(searchedCity);
		recentSearches(searchedCity);
	}
};

searchFormEl.addEventListener("submit", formSubmitHandler);

var getCurrentWeather = function (lat, lon) {
	// console.log(lat, lon);

	var API_Key = "7944758690feb8acd835037db2bb2590";

	var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${API_Key}`;

	fetch(currentWeatherUrl).then(function (response) {
		response.json().then(function (data) {
			displayCurrentWeather(data.current);
			// console.log(data.current);
			// console.log(data.daily)
			displayForecastWeather(data.daily);
		});
	});
};

var displayCurrentWeather = function (current) {
	console.log(current);

	currentWeatherAttributesEl.textContent = "";

	//date
	var unixDate = current.dt;

	var unixMillisecs = unixDate * 1000;

	var dateObject = new Date(unixMillisecs);

	var convertedDate = dateObject.toDateString();

	var dateEl = document.createElement("h2");

	dateEl.textContent = convertedDate;

	currentWeatherAttributesEl.appendChild(dateEl);

	//weather icon
	var wiconCode = current.weather[0].icon;

	var wicon = document.createElement("img");

	var iconurl = `http://openweathermap.org/img/wn/${wiconCode}@2x.png`;

	wicon.setAttribute("src", iconurl);

	currentWeatherAttributesEl.appendChild(wicon);

	// Temp
	var tempEl = document.createElement("li");

	tempEl.textContent = "Temp: " + current.temp + "F";

	currentWeatherAttributesEl.appendChild(tempEl);

	// humidity
	var humidityEl = document.createElement("li");

	humidityEl.textContent = "Humidity: " + current.humidity + "%";

	currentWeatherAttributesEl.appendChild(humidityEl);

	//wind speed

	var windEl = document.createElement("li");

	windEl.textContent = "Wind: " + current.wind_speed + " MPH";

	currentWeatherAttributesEl.appendChild(windEl);

	//uv index

	var uvEl = document.createElement("li");

	uvEl.textContent = "UV Index: " + current.uvi;

	currentWeatherAttributesEl.appendChild(uvEl);
};

var displayCity = function (city) {
	cityNameEl.innerHTML = city;
};

var displayForecastWeather = function (forecasts) {
	console.log(forecasts);

	var forecastContainer = document.querySelector("#forecast-container");

	forecastContainer.textContent = "";

	for (var i = 1; i < forecasts.length - 2; i++) {
		// card container
		var forecastCardEl = document.createElement("div");

		forecastCardEl.classList = "col card border border-red";

		forecastContainer.appendChild(forecastCardEl);
		//date on card

		var dateEl = document.createElement("p");

		var unixDate = forecasts[i].dt;

		var unixMillisecs = unixDate * 1000;

		var dateObject = new Date(unixMillisecs);

		var convertedDate = dateObject.toDateString();

		dateEl.textContent = convertedDate;

		forecastCardEl.appendChild(dateEl);

		//weather icon
		var wiconCode = forecasts[i].weather[0].icon;

		var wicon = document.createElement("img");

		var iconurl = `http://openweathermap.org/img/wn/${wiconCode}@2x.png`;

		wicon.setAttribute("src", iconurl);

		forecastCardEl.appendChild(wicon);
		// Temp
		var tempEl = document.createElement("li");

		tempEl.textContent = "Temp: " + forecasts[i].temp.day + "F";

		forecastCardEl.appendChild(tempEl);

		// humidity
		var humidityEl = document.createElement("li");

		humidityEl.textContent = "Humidity: " + forecasts[i].humidity + "%";

		forecastCardEl.appendChild(humidityEl);

		//wind speed

		var windEl = document.createElement("li");

		windEl.textContent = "Wind: " + forecasts[i].wind_speed + " MPH";

		forecastCardEl.appendChild(windEl);
	}
};

var recentSearches = function (searchedCity) {
  
	cityHistory.push(searchedCity);

	cityHistory.splice(6);
	localStorage.setItem("city", JSON.stringify(cityHistory));

  var historyEl = document.querySelector("#history-container");

  historyEl.textContent = ""
  
  for (var i = 0; i < cityHistory.length; i++) {

  var recentCity = document.createElement("button");

	recentCity.classList = "btn btn-primary w-100 mb-2";

	recentCity.textContent = cityHistory[i];

	historyEl.appendChild(recentCity);
  }

};
