var getCityCoord = function (city) {
	var API_Key = "7944758690feb8acd835037db2bb2590";
	// format the open weather api url
	var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`;

	fetch(apiUrl).then(function (response) {
		response.json().then(function (data) {
			console.log(data);
		});
	});
};

getCityCoord("london");
