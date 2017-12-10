const fs = require('fs');
var pointslist = JSON.parse(fs.readFileSync("pointstotest.JSON"));

/*
)utput is a variable that I had to change each time I ran the code in order to get datasets of 500 points each.
For some reason, queries for datasets up to about 500 points came back instantly but anything more
took forever so I ran the code 21 times.
*/
var output = pointslist.slice(10000);
console.log(pointslist.length);

function initMap() {
	var elevator = new google.maps.ElevationService;

	//This was for me to test the query speed. Irrelevant for the purpose of the code
	var startdate = new Date();
	var starttime = startdate.getMilliseconds();

	elevator.getElevationForLocations({
		'locations' : output
		//This was the actual query
	}, function(results, status) {
		if (status === 'OK') {
			if (results) {
				//This was for me to test the query speed. Irrelevant for the purpose of the code.
				var enddate = new Date();
				var endtime = enddate.getMilliseconds();
				console.log(endtime - starttime);

				//For each point, add the elevation as a property of the point object
				for (var i = 0; i < output.length; i++) {
					output[i].elevation = parseFloat(results[i].elevation.toFixed(4));
				}

				//Write the file to a JSON. I changed the file name each of the 21 times I ran it.
				fs.writeFile("rawdatawithelevation21.JSON", JSON.stringify(output), 'utf8', function (err) {
				    if (err) {
				        return console.log(err);
				    }
				    console.log("The file was saved!");
				}); 
			}
		}
	})
}