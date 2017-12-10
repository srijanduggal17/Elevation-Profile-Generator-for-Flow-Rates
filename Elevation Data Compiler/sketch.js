const fs = require('fs');

//Define output array
var elevationdata = [];

//This loops through all the files and pushes their data to the output array
var first = elevationdata;
var second = JSON.parse(fs.readFileSync("rawdatawithelevation1.JSON"));
for (var i = 2; i < 22; i++) {
	first = first.concat(second);
	second = JSON.parse(fs.readFileSync("rawdatawithelevation" + i + ".JSON"));
}
elevationdata = first.concat(second);

//Write the output to a file

fs.writeFile("elevationdata.JSON", JSON.stringify(elevationdata), 'utf8', function (err) {
	if (err) {
		return console.log(err);
	}
	console.log("The file was saved!");
});