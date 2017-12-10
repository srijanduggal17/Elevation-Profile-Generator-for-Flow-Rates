# Elevation-Profile-Generator-for-Flow-Rates
The goal of this project is to create a tool that helps people create elevation profiles and calculate flow rates for any region of the world.

I started this for the Uganda Project for Engineers without Borders at Georgia Tech. We were trying to figure out where to place a tapstand in a certain region of the country but we needed a certain flow rate output.

The first thing I did was test out how to query elevation data from the Google Maps API.
My code for this is under "/Maps API test".

My next goal was to generate elevations for every point in the region we wanted to put the tapstand in. 
So I went to Google Earth Pro Desktop and picked four corner points to define the region.
I recorded the latitude-longitude values in an Excel file titled "Boundary Points".
My thought process here was that I would use the four corner points to come up with equations for four lines that defined a boundary for the region and then use that to create an array of points within the region.
The latitude-longitude values were in Degrees-Minutes-Seconds notation, so first I converted them to decimal degrees using an online convertor.
These converted values are also in the excel.
Then I found the equations of the lines using some simple code I wrote called "linegenerator.py" which you can run in an online editor like Repl.it.
I put those equations into the excel and then into Desmos graphing calculator to visualize how I would split up the different conditional statements by x/y coordinates in my loop.
The image file of my graph from Desmos is called "Mathematical Graph of Region.JPG"

Then I wrote some code to generate all the points in the region we wanted. The code is under "/Points Generator"
The points are at interavals of about 9 meters.
