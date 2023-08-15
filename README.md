# JWT Authentication and Authorization in MERN Stack (React.js)

This GitHub repository contains a comprehensive example of how to implement JSON Web Token (JWT) based authentication and authorization in a MERN (MongoDB, Express.js, React.js, Node.js) stack application. The application provides user registration and login functionality, allowing users to securely sign up and log in.

## Features

- User Registration: New users can sign up by providing their email and password.
- User Login: Existing users can log in using their registered email and password.
- JWT Implementation: JWT is used to manage user authentication and authorization.
- Protected Routes: Certain routes are protected and can only be accessed by authenticated users.
- React.js Frontend: A user-friendly frontend interface built with React.js.
- Express.js Backend: A secure backend API built with Express.js for handling authentication and authorization.
- MongoDB Database: User data is stored and managed using a MongoDB database.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js: Download and install Node.js from [https://nodejs.org/](https://nodejs.org/).
- MongoDB: Install and configure MongoDB on your machine or use a cloud-based MongoDB service.

## Installation

1. Clone this repository to your local machine using:

   ```bash
   git clone https://github.com/your-username/repo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd -repo
   ```

3. Install the server dependencies:

   ```bash
   cd server
   npm install
   ```

4. Rename `.env.example` to `.env` and update the environment variables:

   ```dotenv
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

5. Install the client dependencies:

   ```bash
   cd ../client
   npm install
   ```

6. Rename `.env.example` to `.env` and update the environment variables:

   ```dotenv
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## Usage

1. Start the server:

   ```bash
   cd ../server
   npm start
   ```

2. Start the client:

   ```bash
   cd ../client
   npm start
   ```

3. Access the application in your browser at [http://localhost:5000](http://localhost:5000).

## Implementation Details

- User Registration: New users can sign up by sending a POST request to `/api/auth/register` with their email and password.

- User Login: Existing users can log in by sending a POST request to `/api/auth/login` with their email and password. Upon successful login, a JWT token is returned.

- Protected Routes: Certain routes in the frontend are protected using the `react-router-dom` library. Users must be authenticated (logged in) to access these routes. The JWT token is sent in the request headers for authentication.

- JWT Implementation: JWT tokens are generated upon successful login and sent to the client. The token is stored in local storage and included in the headers of authenticated requests.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or create a pull request.


---

**Note:** This README is a template and should be customized to suit the specifics of your project. Make sure to replace placeholders (`<your-username>`, `<your-repo>`, `<your-mongodb-uri>`, `<your-jwt-secret>`) with your actual information and add the connection.js file
