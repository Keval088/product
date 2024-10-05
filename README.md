Product API

Overview

This is a RESTful API for managing products and their variants. Built with Node.js, Express, and Sequelize, it provides endpoints to create, read, update, and delete products. The API is documented using Swagger, making it easy to explore and test.

Features

- Create new products with optional variants
- Retrieve a list of products with pagination
- Get details of a single product
- Update existing products
- Delete products and their associated variants
- Swagger documentation for API exploration

Technologies Used

- Node.js
- Express
- Sequelize (for MySQL)
- Joi (for validation)
- Swagger (for API documentation)
- Jest (for testing)

Getting Started

Prerequisites

- Node.js (v12 or later)
- MySQL database

Installation

1. Clone the repository:

   git clone <repository-url>
   cd product-api

2. Install the dependencies:

   npm install

3. Create a .env file in the root directory and set your database configuration:

   HOST=localhost
   USER=root
   PASSWORD=yourpassword
   DB=product_db

4. Start the MySQL server and create the database specified in your .env file.

5. Run database migrations (if applicable).

6. Start the application:

   npm start

API Documentation

The API documentation is available at:

http://localhost:3000/api-docs

API Endpoints

- POST /api/v1/products: Create a new product
- GET /api/v1/products: Retrieve a list of products
- GET /api/v1/products/:id: Retrieve a single product by ID
- PUT /api/v1/products/:id: Update a product by ID
- DELETE /api/v1/products/:id: Delete a product by ID

Running Tests

To run the test suite, use the following command:

npm test

Example Test Cases

- Create a new product
- Retrieve a list of products
- Retrieve a single product by ID
- Update a product
- Delete a product