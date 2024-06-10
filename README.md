# Photos Application

This project provides a web application for managing images using a Node.js backend and a React frontend. Users can perform CRUD operations on images and shorten image links using external APIs.

## Description

This project provides a full-stack solution for image management, combining a Node.js backend for handling server-side logic and a React frontend for providing an interactive user interface. Users can perform CRUD operations on images stored in a database and shorten image links using external APIs.

## Features

1. Create, read, update, and delete images.
2. Shorten image links using external APIs.
3. User authentication and authorization.
4. Responsive and user-friendly React frontend.

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

1. Node.js and npm installed on your machine.
2. Access to Firebase Firestore or a similar database.
3. API key for an external URL shortening service (optional).

### Installation

1. Clone the repository:
git clone https://github.com/Khaled-Abdelbaset/photos-app.git


2. Navigate to the server directory:
cd server


3. Install node.js dependencies:
npm install


4. Navigate to the client directory:
cd ../client


5. Install react.js dependencies:
npm install


6. To start the Node.js server, run:
cd server
npm start


7. To start the React.js server, run:
cd client
npm start


The frontend will be accessible at http://localhost:3000.

## API Endpoints

1. POST /api/images: Create a new image.
2. GET /api/images: Retrieve all images.
3. GET /api/images/:id: Retrieve a specific image by ID.
4. PUT /api/images/:id: Update a specific image by ID.
5. DELETE /api/images/:id: Delete a specific image by ID.
6. POST /api/images/shorten: Shorten an image link.

## Built With

### Backend
- Node.js
- Express
- Firebase Firestore
- Axios

### Frontend
- React
- React Router
- Axios
- Material-UI




