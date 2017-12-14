//Elevation limit: 1041.9603 (elevation at T4 junction)

//Include libraries
var csv = require("fast-csv");
const fs = require('fs');

//Define input and output variables
var outputdata = [];
var inputdata = JSON.parse(fs.readFileSync("elevationdata.JSON"));

//Push lat,long,elevation object to output array if elevation is below limit
for (var i = 0; i < inputdata.length; i++) {
	if (inputdata[i]["elevation"] < 1041.9603) {
		outputdata.push(inputdata[i]);
	}
}

//Write file as JSON for later programs
fs.writeFile("prelimtapoptions.JSON", JSON.stringify(outputdata), 'utf8', function(err) {
	if (err) {
		return console.log(err);
	}
	console.log("The file was saved");
});

//Open csv writing pipeline
var csvStream = csv.createWriteStream({headers: true}),
    writableStream = fs.createWriteStream("prelimtapoptions.csv");
 
writableStream.on("finish", function(){
  console.log("CSV created");
});
 
csvStream.pipe(writableStream);

//Write a line for each object
for (var j = 0; j < outputdata.length; j++) {
	csvStream.write(outputdata[j]);
}

//Close pipeline
csvStream.end();