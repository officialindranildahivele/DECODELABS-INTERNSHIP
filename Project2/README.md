# ⚙️ Project 2 - User Management API

![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Project Overview
This project is a professional Express.js backend API for managing users. It demonstrates clean RESTful design, input validation, modular architecture, and structured JSON responses while using an in-memory data store for simplicity and rapid testing.

## ✨ Features
- Express server with JSON parsing and CORS enabled
- RESTful endpoints for user management
- Input validation for empty payloads, missing fields, and invalid email formats
- In-memory user storage with CRUD operations
- Centralized error handling and consistent JSON responses
- Clean modular architecture with separate routes, controllers, middleware, and utilities
- Postman collection included for quick API testing

## 📁 Folder Structure
```text
Project2/
├── server.js
├── package.json
├── package-lock.json
├── routes/
├── controllers/
├── middleware/
├── utils/
├── README.md
└── PostmanCollection.json
```

## ▶️ Installation
From the project directory, install the dependencies:

```bash
npm install
```

## 🧪 How to Run
Start the server in development mode:

```bash
npm run dev
```

Or start it in production mode:

```bash
npm start
```

The API will run at:

```text
http://localhost:3000
```

## 🛠️ Technologies Used
- Node.js
- Express.js
- CORS
- Nodemon
- JSON
- REST API Design

## 📚 API Documentation
### Available Endpoints
- `GET /`
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

### HTTP Status Codes
- `200 OK`
- `201 Created`
- `400 Bad Request`
- `404 Not Found`
- `500 Internal Server Error`

### Example Requests
#### Health check
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

## 📦 Example Responses
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

### Validation error
```json
{
  "error": "Invalid email format"
}
```

## 📸 Screenshots
- Postman API collection available in [PostmanCollection.json](PostmanCollection.json)
- Add screenshots here after testing the API in Postman or a browser

## 🔮 Future Improvements
- Add a database layer for persistent storage
- Add authentication and authorization
- Add automated tests
- Improve error messages and request validation

## 📝 Notes
- The project uses an in-memory array, so data resets when the server restarts.
- The Postman collection file can be imported directly for manual API testing.
- This project is ideal for demonstrating backend API fundamentals in a portfolio.

## 📄 License
This project is licensed under the MIT License.
