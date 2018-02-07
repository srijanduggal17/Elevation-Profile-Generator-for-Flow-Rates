function [sortedElevationData] = elevationProcesserEWB(elevationData)
% Label each column of the CSV
latData  = elevationData(:,1);
longData = elevationData(:,2);
elevData = elevationData(:,3);

% Scale the dimensions of the plot to a square
lowestElev = min(elevData);
highestElev = max(elevData);

latDiff = range(latData);
longDiff = range(longData);

latHalf = min(latData) + .5 .* latDiff;
longHalf = min(longData) + .5 .* longDiff;

scaleValue = max([longDiff, latDiff]);

latDim = [(latHalf - (.5 .* scaleValue)) (latHalf + (.5 .* scaleValue))];
longDim = [(longHalf - (.5 .* scaleValue)) (longHalf + (.5 .* scaleValue))];


% Gets the axis values for lat and long in degrees and meters from edge of
% region
latVal  = unique(latData);
longVal = unique(longData);

latValMeters = 111.19.*latVal.*1000;

averageLat = mean(latVal);
longValMeters = (pi./180).*longVal.*cosd(averageLat).*6371.*1000;

latValMeters = latValMeters - min(latValMeters);
longValMeters = longValMeters - min(longValMeters);

% Creates a table of undefined elements for our region
sortedElevationData = NaN(length(latVal),length(longVal));

% Populates the table with the elevation data
for latCount = 1:length(latVal)
    for longCount = 1:length(longVal)
        locInd = [latData == latVal(latCount) & longData == longVal(longCount)];
        if sum(locInd) > 0
            sortedElevationData(latCount, longCount) = elevData(locInd); 
        end
    end
end

% Surface plot in degrees
figure(101)
surf(longVal,latVal,sortedElevationData)
figure(gcf)
xlim(longDim)
ylim(latDim)
zlim([(lowestElev) (highestElev)])
xlabel('Latitude (deg)')
ylabel('Longitude (deg)')
zlabel('Elevation (meters)')

% Surface plot in meters
figure(102)
surf(longValMeters,latValMeters,sortedElevationData)
figure(gcf)
zlim([(lowestElev) (highestElev)])
xlabel('Latitude (meters)')
ylabel('Longitude (meters)')
zlabel('Elevation (meters)')

% Contour map in degrees
figure(103)
contour3(longVal,latVal,sortedElevationData,20)
zlim([(lowestElev) (highestElev)])
xlabel('Latitude (deg)')
ylabel('Longitude (deg)')
zlabel('Elevation (meters)')

% Contour map in meters
figure(104)
contour3(longValMeters,latValMeters,sortedElevationData,20)
zlim([(lowestElev) (highestElev)])
xlabel('Latitude (meters)')
ylabel('Longitude (meters)')
zlabel('Elevation (meters)')

% 3D plot of raw data
figure(105)
plot3(longData, latData, elevData);
zlim([(lowestElev) (highestElev)])
xlabel('Latitude (deg)')
ylabel('Longitude (deg)')
zlabel('Elevation (meters)')

% Plots we may use later
% % % figure(106)
% % % tri = delaunay(longData,latData);
% % % trisurf(tri,longData,latData,elevData)
% % % zlim([(lowestElev) (highestElev)])
% % % 
% % % ylabel('Latitude (deg)')
% % % xlabel('Longitude (deg)')
% % % zlabel('Elevation (meters)')
end


