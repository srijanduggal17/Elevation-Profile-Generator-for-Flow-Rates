//Declare important variables
const fs = require('fs');
var message = document.getElementById("message");
var go = true;
var csv = require("fast-csv");
var elevdata = JSON.parse(fs.readFileSync("elevdata.JSON", 'utf8'));

function initMap() {
	/*
	This function automatically runs when Google Maps API 
	recognizes that you are connected. It gets the next 
	set of 500 points and queries the API for their 
	elevation values. Then it refreshes and does another
	query until all the values have been retrieved. 
	Finally, it outputs a CSV which MATLAB will use to 
	plot the data.
	*/
	let metadata = JSON.parse(fs.readFileSync("metadata.JSON", 'utf8'));
	let rawdata = JSON.parse(fs.readFileSync("rawdata.JSON", 'utf8'));
	let intstart = metadata.nextinterval;
	let numints = Math.ceil(metadata.arrlength/500);
	console.log(metadata);
	let querypoints;

	if (metadata.nextinterval < numints) {
		metadata.nextinterval += 1;
		if (500*intstart + 500 < metadata.arrlength) {
			querypoints = rawdata.slice(500*intstart,500*(intstart + 1));
			console.log('middle');
			message.innerHTML = intstart + 1 + " of " + numints + " done";
		}
		else {
			querypoints = rawdata.slice(500*intstart);
			console.log('last');
			message.innerHTML = "Query done";
			go = false;
		}
		setTimeout(() => {
			console.log(querypoints);
		
			var elevator = new google.maps.ElevationService;
			elevator.getElevationForLocations({
				'locations' : querypoints
				//This was the actual query
			}, function(results, status) {
				console.log(status);
				if (status === 'OK') {
					if (results) {
						for (var i = 0; i < querypoints.length; i++) {
							querypoints[i].elevation = parseFloat(results[i].elevation.toFixed(4));
							querypoints[i].resolution = parseFloat(results[i].resolution.toFixed(4));
						}

						elevdata = elevdata.concat(querypoints);
						console.log(elevdata.length);

						fs.writeFile("elevdata.JSON", JSON.stringify(elevdata), 'utf8', function (err) {
						    if (err) {
						        return console.log(err);
						    }
						    console.log("The file was saved!");
						});

						fs.writeFile("metadata.JSON", JSON.stringify(metadata), 'utf8', function (err) {
							if (err) {
								return console.log(err);
							}
							else {
								console.log("Metadata saved!");
								if (go) {
									window.location.href = "query.html";									
								}
								else {
									var csvStream = csv.createWriteStream({headers: true}),
									    writableStream = fs.createWriteStream("finalelevdata.csv");
									 
									writableStream.on("finish", function(){
									  console.log("CSV created");
									});
									 
									csvStream.pipe(writableStream);

									for (var j = 0; j < elevdata.length; j++) {
										csvStream.write(elevdata[j]);
									}

									csvStream.end();
								}
							}
						});
					}
				}
			})
		}, 500)
	}
}