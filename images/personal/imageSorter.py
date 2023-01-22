# Reads in all photos in file, downscales them to a width of 500 while maintaining aspsect ratio, and saves them with numbered names in a new folder called "resized" with the .webp extension

import os
import cv2

# Get all files in the current directory
files = os.listdir(os.getcwd())

# Create a new folder to store the resized images
if not os.path.exists("resized"):
    os.makedirs("resized")
    print("Created folder: resized")

# Loop through all files in the current directory
imgCount = 0
for i in range(len(files)):
    # Converts file name to lowercase 
    files[i] = files[i].lower()
    # If file is not image skip
    if not files[i].endswith(".jpg") and not files[i].endswith(".png") and not files[i].endswith(".jpeg"):
        continue

    # Read in the image
    img = cv2.imread(files[i])

    # Resize the image
    height, width = img.shape[:2]
    ratio = 500 / width
    dim = (500, int(height * ratio))
    img = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)

    # Save the image in .webp
    cv2.imwrite("resized/" + str(imgCount) + ".jpeg", img)
    imgCount += 1

# Print a message to the console
print("Done!")