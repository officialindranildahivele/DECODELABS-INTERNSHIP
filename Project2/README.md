# Project 2 - User Management API

## Project Overview
This project is a modular Express.js backend API for managing users. It uses an in-memory array for data storage and provides RESTful endpoints for creating, reading, updating, and deleting users.

## Features
- Express server with JSON parsing and CORS enabled
- RESTful API endpoints for users
- Input validation for missing fields, empty payloads, and invalid email addresses
- In-memory user storage with CRUD operations
- Centralized error handling and JSON responses
- Clean modular folder structure for maintainability
- Postman collection included for quick API testing

## Folder Structure
```text
project2/
├── server.js
├── package.json
├── package-lock.json
├── routes/
│   └── userRoutes.js
├── controllers/
│   └── userController.js
├── middleware/
│   ├── errorMiddleware.js
│   └── validateUser.js
├── utils/
│   └── userStore.js
├── README.md
└── PostmanCollection.json
```

## Installation
From the project directory, install the dependencies:

```bash
npm install
```

## Run Commands
Start the server in development mode:

```bash
npm run dev
```

Or start it in production mode:

```bash
npm start
```

The server will run at:

```text
http://localhost:3000
```

## API Documentation
### Available Endpoints
- GET `/`
- GET `/users`
- GET `/users/:id`
- POST `/users`
- PUT `/users/:id`
- DELETE `/users/:id`

### HTTP Status Codes
- `200 OK`
- `201 Created`
- `400 Bad Request`
- `404 Not Found`
- `500 Internal Server Error`

### Example Requests
#### Get root health check
```bash
curl http://localhost:3000/
```

#### Get all users
```bash
curl http://localhost:3000/users
```

#### Get a single user
```bash
curl http://localhost:3000/users/1
```

#### Create a user
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Charlie Brown","email":"charlie@example.com"}'
```

#### Update a user
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated","email":"alice.updated@example.com"}'
```

#### Delete a user
```bash
curl -X DELETE http://localhost:3000/users/1
```

## Example Responses
### GET /
```json
{
  "message": "Backend API Running"
}
```

### GET /users
```json
[
  {
    "id": 1,
    "name": "Indranil Dahivele",
    "email": "indranildahivele@gmail.com"
  },
  {
    "id": 2,
    "name": "Rohan Tarange",
    "email": "rohantarange@gmail.com"
  }
]
```

### POST /users
```json
{
  "message": "User Created",
  "user": {
    "id": 3,
    "name": "Charlie Brown",
    "email": "charlie@example.com"
  }
}
```

### Validation error
```json
{
  "error": "Invalid email format"
}
```

### User not found
```json
{
  "error": "User not found"
}
```

## Screenshots
Add screenshots here after testing the API in Postman or a browser.

## Technologies Used
- Node.js
- Express.js
- CORS
- Nodemon

## Expected Terminal Output
When the server starts successfully:

```bash
Server running on http://localhost:3000
```

## Notes
- The project uses an in-memory array, so data resets when the server restarts.
- The Postman collection file can be imported directly for manual API testing.
