# Celebrity Image Classifier Using ML Model
This project attempts to create an end-to-end ML model to classify different celebrity images given to it as an input.

## Content
This project aims to create an ML model to classify images of celebrities provided as input. Due to the lack of a ready-made dataset, this project will restrict the images to only 5 celebrities. The idea is to create an ML model using sklearn, deploy it on a server, and create a user-friendly UI for input. The input image will be processed by a Flask server and classified, with the result displayed to the user. This project is designed to be end-to-end and ready for deployment on a server.

## Steps for Project Completion
### 1. Data Finding
For this project, a large number of celebrity images were needed. Several approaches were considered:<br>
    a. Some images were directly downloaded from the internet.<br>
    b. Using the "Download Image" extension of Chrome, more images were downloaded.<br>
    c. Web scraping was also considered for data collection.
  
### 2. Data Cleaning
Face cascade and eye cascade from the OpenCV library were used to crop out only the face of the person. Manual cleaning was then performed to remove incorrect images.

### 3. Data Transformation
All images were converted to grayscale. Wavelet transformation was then applied to them for further processing.

### 4. Model Creation
The dataset was divided into training and test data. Various models like linear regression, logistic regression, and SVM were imported from the sklearn library. After parameter tuning, SVM was selected. The trained model achieved an accuracy of above 95%. The model was saved in a pickle file.

### 5. Server
The trained model file was imported into the server. A simple server was created using Flask to handle user image queries. A utility file was created to handle all functions related to image prediction. The image was converted into a base64 string and passed to the server, where it was further processed for prediction. Wavelet transformation was applied as part of this process.

### 6. UI
Simple HTML, CSS, and JavaScript were used to create a user-friendly UI. The JavaScript file sends the image through a POST request to the server and receives the response in JSON format, which is then displayed to the user.

### 7. Usage
A predefined dropbox is used for easy image upload. Once the response is received, it is displayed to the user in a tabular format along with the probability of each celebrity. The UI also handles cases where the image is not clearly visible or if the eyes are not clearly visible, providing appropriate messages to the user.
