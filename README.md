# School Management API

## Overview
The School Management API is a Node.js application built with the Express.js framework and MySQL database. It provides a set of APIs to manage school data, allowing users to add new schools and retrieve a list of schools sorted by proximity to a specified location.

## Features
- Add new schools with details such as name, address, latitude, and longitude.
- Retrieve a list of schools sorted by proximity to a user's location.

## Project Structure
```
school-management-api
├── src
│   ├── controllers          # Contains API request handlers
│   │   ├── schoolController.js
│   ├── models               # Defines database schema and interactions
│   │   ├── schoolModel.js
│   ├── routes               # Defines API routes
│   │   ├── schoolRoutes.js
│   ├── services             # Contains business logic
│   │   ├── schoolService.js
│   ├── app.js               # Entry point of the application
│   └── db.js                # Database connection setup
├── config                   # Configuration settings
│   ├── config.js
├── package.json             # npm configuration file
├── .env                     # Environment variables
├── README.md                # Project documentation
└── postman_collection.json   # Postman collection for API testing
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd school-management-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your database credentials:
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

4. Start the application:
   ```
   npm start
   ```

## API Endpoints

### Add School
- **Endpoint:** `/addSchool`
- **Method:** `POST`
- **Payload:** 
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.345678,
    "longitude": 98.765432
  }
  ```
- **Response:** 
  - Success: 201 Created
  - Error: 400 Bad Request

### List Schools
- **Endpoint:** `/listSchools`
- **Method:** `GET`
- **Query Parameters:**
  - `latitude`: User's latitude
  - `longitude`: User's longitude
- **Response:** 
  - Success: 200 OK with a sorted list of schools
  - Error: 400 Bad Request

## Testing
A Postman collection is included in the `postman_collection.json` file, which contains example requests and expected responses for both the add school and list schools endpoints. 

## License
This project is licensed under the MIT License.