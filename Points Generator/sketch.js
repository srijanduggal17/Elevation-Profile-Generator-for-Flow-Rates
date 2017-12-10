const fs = require('fs');

//This assigns values to the boundaries of my region assuming it was a rectangle. 
//Basically creates a rectangle which I need to loop over
var minlat = 2.31710556;
var maxlat = 2.32687222;
var minlong = 33.24722222;
var maxlong = 33.26027778;

//Array to store coordinates in the region
var coordstotest = [];

//Nested for loop to loop through every point in the rectangle with intervals of .0001 decimal degrees (roughly 9 meters)
for (var y = minlong; y < maxlong; y +=.0001) {
	for (var x = minlat; x < maxlat; x +=.0001) {
		//These three conditionals use the line equations I came up with along with the x,y bounds from the image off Desmos
		//If a coordinate meets any of the conditions AKA is in the desired region, it will be pushed to the file
		if ((y < 33.24916667) && (x > (-2.149991000021955*(y - 33.24722222) + 2.32128611)) && (x < (0.46767410805848686*(y - 33.25916667) + 2.32687222))) {
			//This block creates a new coordinate object and assigns latitude-longitude values as floats with 4 decimal places
			var newcoord = {
				"lat" : parseFloat(x.toFixed(4)),
				"lng" : parseFloat(y.toFixed(4))
			};
			//Push the coordinate to the array
			coordstotest.push(newcoord);
		}
		else if ((y < 33.25916667) && (x < (0.46767410805848686*(y - 33.25916667) + 2.32687222)) && (x > (0.3404997340499306*(y - 33.24916667) + 2.31710556))) {
			var newcoord = {
				"lat" : parseFloat(x.toFixed(4)),
				"lng" : parseFloat(y.toFixed(4))
			};
			coordstotest.push(newcoord);
		}
		else if ((y < maxlong) && (x > (0.3404997340499306*(y - 33.24916667) + 2.31710556)) && (x < (-5.385002384984628*(y - 33.26027778) + 2.32088889))) {
			var newcoord = {
				"lat" : parseFloat(x.toFixed(4)),
				"lng" : parseFloat(y.toFixed(4))
			};
			coordstotest.push(newcoord);
		}
	}
}

//This uses node file system to write the JSON to a file
var out = JSON.stringify(coordstotest);
fs.writeFile("pointstotest.JSON", out, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 