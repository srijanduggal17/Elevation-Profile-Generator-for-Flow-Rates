#This code first requests you to input points in the format "x,y"
a = input("first point")
b = input("second point")

#Create a 2-value array for each point
array1 = a.split(',')
array2 = b.split(',')

#Convert from string to float
y1 = float(array1[1])
y2 = float(array2[1])
x1 = float(array1[0])
x2 = float(array2[0])

#Calculate the slope of the line between the points
m = (x2-x1)/(y2-y1)

#Convert to a string for display purposes
z = str(m)

#Define line and print to console
line = "x = %s (y - %s) + %s" % (z,y2,x2)
print(line)