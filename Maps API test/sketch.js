function initMap() {
	var elevator = new google.maps.ElevationService;

	elevator.getElevationForLocations({
		'locations' : [{lat: 36.579, lng: -118.292}, {lat: 36.579, lng: -118.292}] 
		//this array just needs objects containing latitude and longitudes
	}, function(results, status) {
		if (status === 'OK') {
			//This callback function just prints out the results.
			if (results) {
				console.log(results);
			}
		}
	})
}