clear
clc

% Reads the CSV file with data and then calls the plotting function
rawElevData = csvread('finalelevdata.csv',1,0);
output = elevationProcesserEWB(rawElevData);