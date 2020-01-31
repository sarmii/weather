var temp = 0;
function getForecast(lat, lon) {
  var apid = "https://api.opendota.com/api/heroStats";
  $.ajax({
    url: apid,
    dataType: "json",
    type: "GET",
    success: function(weatherUpdate) {

      $("#temp").on("click", function() {

        if (this.checked) {
          document.getElementById("temp-text").innerHTML=(cels.toFixed(1) + " C&deg");
        } else
          document.getElementById("temp-text").innerHTML=(fahr.toFixed(0) + " F&deg");
      });
      if (weatherUpdate.name) {
        document.getElementById("wcityy").innerHTML= weatherUpdate.name + ", " + weatherUpdate.sys.country;
      }
      if (weatherUpdate.wind) {
        document.getElementById("windCondd").innerHTML=(weatherUpdate.wind.speed + " m/s");
      }
	  if (weatherUpdate.main) {
        document.getElementById("humidCondd").innerHTML=(weatherUpdate.main.humidity + " %");
      }
      if (weatherUpdate.main.temp) {
        var fahr = (weatherUpdate.main.temp * 9 / 5) - 459.67;
        var cels = (weatherUpdate.main.temp - 273.15);
		 document.getElementById("temp-text").innerHTML=((temp === 0 ? fahr.toFixed(0) + " F&deg" : cels.toFixed(0) + " C&deg"));
      }

  switch(weatherUpdate.weather[0].main) {

    case "Clear":
document.getElementById("icon").src= "img/sunny.svg" 
        break;
    case "Broken clouds":
    case "Few clouds":
    case "Scattered clouds":
document.getElementById('icon').src= "img/cloudy.svg" 
        break;
    case "Rain":
	case "Shower rain":
document.getElementById('icon').src= "img/rainy.svg" 
        break;
    case "Overcast clouds":
document.getElementById('icon').src= "img/cloudy-2.svg" 
        break;
		    case "Thunderstorm":
document.getElementById('icon').src= "img/stormy.svg" 
        break;
    case "Mist":
document.getElementById('icon').src= "img/rainy-2.svg" 
        break;
     case "Snow":
document.getElementById('icon').src= "img/snowy.svg" 
        break;
}  
    },
    error: function(weatherUpdate) {
       alert("Error! Please check back later!");
    }
  });
}

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getForecast(position.coords.latitude, position.coords.longitude);
    })
  }
    else {
    alert("Can't get Geolocation!");
  }
}
$('form').submit(function() {
                    $.get('https://api.opendota.com/api/heroStats' + $('#weather_input').val() + '&appid=5da8a5f9205bb762c04eb26d0662f61a', function(weather) {
getForecast(weather.coord.lat, weather.coord.lon);
                    }, "json");

                    return false;
                });
getLocation();