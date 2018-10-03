function getWeather() {
  //Weather Underground API discontinued 12/31/2018
  var zipcode = document.getElementById("zip_code").value;
  $.getJSON( "http://api.wunderground.com/api/6ea7cf3bc006012f/geolookup/forecast10day/q/US/" + zipcode + ".json",
  function(data) {
  	if (!data.response.error) {
		var d = new Date();
		var n = d.getHours();
		var time = (n > 15) ? 'tonight' : 'today';
		var city = data.location.city;
		var state = data.location.state;
		var zip = data.location.zip;
		var length = data.forecast.simpleforecast.forecastday.length;
		$('#location').html(city + ', ' + state + ' (' + zip + ') ' + length + ' Day Weather');
		$('title').html(city + ', ' + state + ' (' + zip + ') ' + length + ' Day Weather');
		var header = '<table cellspacing="0" cellpadding="0" width="750" id="forecast"><tr><th>day</th><th class="description">description</th><th>high/low</th><th>precip</th><th>wind</th><th>humidity</th></tr></table>';
		$('#weather').html(header);
		var forecast = data.forecast.simpleforecast.forecastday;
		var temp = (n > 15) ? '-&nbsp;-' : forecast[0].high.fahrenheit + '&deg';
		var i;
		for (i=0; i < length; i++) {
			var day = '<tr><td><img src="' + forecast[i].icon_url + '" class="icon">' + (i === 0 ? time : forecast[i].date.weekday_short) + '<br /><span>' + forecast[i].date.monthname_short + ' ' + forecast[i].date.day + '</span></td><td>' + forecast[i].conditions + '</td><td>' + (i === 0 ? temp : forecast[i].high.fahrenheit + '&deg') + '/' + forecast[i].low.fahrenheit + '&deg;</td><td><img src="images/precip.png" class="pop">' + forecast[i].pop + '%</td><td>' + forecast[i].avewind.dir + ' ' + forecast[i].avewind.mph + ' mph' + '</td><td>' + forecast[i].avehumidity + '%</td></tr>';
			$('#forecast').append(day);
		}
	} else {
		$('#location').html(data.response.error.description);
		$('#weather').html('');
	}
  })
  .fail(function() {
    console.log( "error" );
  });
}