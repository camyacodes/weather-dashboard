var getCityCoord = function (city) {
	var API_Key = "7944758690feb8acd835037db2bb2590";
	// format the open weather api url
	var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`;

	fetch(apiUrl).then(function (response) {
		response.json().then(function (data) {
      console.log(data);
      getCurrentWeather(data.coord.lat, data.coord.lon)
      
		});
	});
};

getCityCoord("jacksonville");

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

