# Health App 

Welcome to our Health App! This application is designed to provide users with various features aimed at enhancing their healthcare experience. Below, you'll find an overview of the app's functionalities, technologies used, and how to set it up for use.

## Features

### Disease Prediction using Machine Learning Model
Our app utilizes a machine learning model to predict diseases based on symptoms provided by the user. By inputting symptoms into the app, users can receive predictions on potential diseases, enabling early detection and proactive healthcare management.

### Medicine Finder
The Medicine Finder feature allows users to search for medicines by either inputting the name of the medicine or describing symptoms. The app provides a list of medicines corresponding to the input, helping users find the appropriate medications for their needs quickly and conveniently.

### Health Chatbot
Our app features a health chatbot trained on a medical book, providing users with instant access to medical information and advice. Whether users have questions about symptoms, treatments, or general health inquiries, the chatbot is available to assist 24/7, improving accessibility to healthcare resources.

## Technologies Used

- **Frontend**: Developed using React Native, providing a cross-platform mobile experience with a native look and feel.
- **Backend**: Powered by Flask, a lightweight Python web framework, enabling efficient handling of requests and seamless integration with machine learning models.
- **Machine Learning**: Utilizes machine learning algorithms for disease prediction, enhancing the app's capabilities in providing personalized healthcare insights.

## Setup Instructions

To set up the Health App locally for development or testing purposes, follow these steps:

1. **Clone the Repository**: Clone the repository to your local machine using the following command:
 ```bash
git clone <url>
```
2. **Install Dependencies**: Navigate to the project directory and install the required dependencies for both the frontend and backend:
 ```bash

cd health-app
npm install # For frontend dependencies
pip install -r requirements.txt # For backend dependencies
```
3. **Start the Backend Server**: Run the Flask server to handle backend operations and serve machine learning models:
 ```bash

flask run
```

4. **Start the Frontend Development Server**: Launch the React Native development server to run the app on your emulator or physical device:

 ```bash
npm start
```



