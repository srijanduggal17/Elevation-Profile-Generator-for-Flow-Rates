//Declare constants
const fs = require('fs');
const resolution = .0001;
const sizelim = 16000001;

//Link buttons
document.getElementById("savepointsbutton").addEventListener("click", verifyPoints);

//Get DOM elements
var latinput1 = document.getElementById("latinput1");
var longinput1 = document.getElementById("longinput1");
var latinputaster1 = document.getElementById("latinputaster1");
var longinputaster1 = document.getElementById("longinputaster1");
var latinput2 = document.getElementById("latinput2");
var longinput2 = document.getElementById("longinput2");
var latinputaster2 = document.getElementById("latinputaster2");
var longinputaster2 = document.getElementById("longinputaster2");
var message = document.getElementById("message");

//Declare storage variables
var pointstatus;
var coordofregion = [];
var elevdata = [];


function verifyPoints() {
	/*
	This function takes the inputted points and verifies that they are in
	the right format and are in the right bounds for latitude and longitude
	*/
	pointstatus = true;
	let latin1 = latinput1.value;
	let longin1 = longinput1.value;
	let fltlatin1 = parseFloat(latin1);
	let fltlongin1 = parseFloat(longin1);
	let latin2 = latinput2.value;
	let longin2 = longinput2.value;
	let fltlatin2 = parseFloat(latin2);
	let fltlongin2 = parseFloat(longin2);

	if (latin1 === "" || latin1.includes("-")  || latin1.includes("+") || fltlatin1 >= 90) {
		latinputaster1.style.display = "inline";
		pointstatus = false;
	}
	else {
		latinputaster1.style.display = "none";
	}

	if (longin1 === "" || longin1.includes("-")  || longin1.includes("+") || fltlongin1 >= 180) {
		longinputaster1.style.display = "inline";
		pointstatus = false;
	}
	else {
		longinputaster1.style.display = "none";
	}
	if (latin2 === "" || latin2.includes("-")  || latin2.includes("+") || fltlatin2 >= 90) {
		latinputaster2.style.display = "inline";
		pointstatus = false;
	}
	else {
		latinputaster2.style.display = "none";
	}

	if (longin2 === "" || longin2.includes("-")  || longin2.includes("+") || fltlongin2 >= 180) {
		longinputaster2.style.display = "inline";
		pointstatus = false;
	}
	else {
		longinputaster2.style.display = "none";
	}

	let coord1 = [fltlongin1, fltlatin1];
	let coord2 = [fltlongin2, fltlatin2];

	if (pointstatus) {
		generatePoints(coord1, coord2);
	}
}

function generatePoints(p1, p2) {
	/*
	This function is called if the inputted points are valid.
	It finds the bounds of the rectangular region and then 
	creates a file of all the latitude-longitude points
	if the total number of points is within a certain limit
	for speed considerations. Once the file is written, the 
	query script is called.
	*/
	let minlong = parseFloat(Math.min(...[p1[0], p2[0]]).toFixed(4));
	let maxlong = parseFloat(Math.max(...[p1[0], p2[0]]).toFixed(4));
	let minlat = parseFloat(Math.min(...[p1[1], p2[1]]).toFixed(4));
	let maxlat = parseFloat(Math.max(...[p1[1], p2[1]]).toFixed(4));

	let arrsize = Math.ceil(((maxlong - minlong)/resolution)*((maxlat - minlat)/resolution));
	console.log((maxlong-minlong)/resolution);
	console.log(arrsize);
	counter = 0;
	let perc = 1;

	if (arrsize < sizelim) {
		for (let x = minlong; x < maxlong; x += resolution) {
			for (let y = minlat; y < maxlat; y += resolution) {
				let newcoord = {
					"lng" : parseFloat(x.toFixed(4)),
					"lat" : parseFloat(y.toFixed(4))
				};
				coordofregion.push(newcoord);
			}
		}

		message.innerHTML = "Region points generated. Proceeding to get elevation values";
		message.style.display = "block";

		fs.writeFile("rawdata.JSON", JSON.stringify(coordofregion), 'utf8', function (err) {
			if (err) {
				return console.log(err);
			}
			else {
				console.log("Data saved!");
				let metadata = {
					arrlength : coordofregion.length,
					nextinterval : 0 
				}

				fs.writeFile("elevdata.JSON", JSON.stringify(elevdata), 'utf8', function (err) {
					if (err) {
						return console.log(err);
					}
					else {
						console.log("Metadata saved!");
						fs.writeFile("metadata.JSON", JSON.stringify(metadata), 'utf8', function (err) {
							if (err) {
								return console.log(err);
							}
							else {
								console.log("Metadata saved!");
								window.location.href = "query.html";
							}
						});
					}
				});
			}
		});
	}
	else {
		//display for a set time and h
		message.style.display = "block"; 
		setTimeout(() => {
			message.style.display = "none";
		}, 500);
	}
	console.log(coordofregion);
}