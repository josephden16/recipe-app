# Recipe App - Backend

This is the **backend** part of the Recipe app built using **Nest.js**. It provides the necessary API endpoints for creating, updating, deleting, and fetching recipes. The backend integrates with **MongoDB** for data storage and **Cloudinary** for image uploads.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Testing](#testing)

## Features

- RESTful API with CRUD operations for managing recipes.
- Image upload and storage via **Cloudinary**.
- MongoDB for recipe data storage.
- Data validation with **class-validator**.
- Exception handling for proper API error responses.

## Technologies

- **Nest.js** (Node.js Framework)
- **MongoDB** for the database
- **Mongoose** for MongoDB object modeling
- **Cloudinary** for image uploads
- **TypeScript** for type safety
- **Jest** for unit testing

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js** (v14 or higher)
- **MongoDB**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/josephden16/recipe-app.git
   ```

2. Navigate to the `server` folder:

   ```bash
   cd recipe-app/server
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables:

   - Copy the `.env.example` file to `.env`:

     ```bash
     cp .env.example .env
     ```

   - Update the `.env` file with your environment variables (MongoDB connection, Cloudinary API keys, etc.).

### MongoDB Setup

Make sure to have **MongoDB** running locally or use a MongoDB Atlas instance. Update the MongoDB URI in the `.env` file with your database connection string:

```bash
MONGO_URI=mongodb://localhost:27017/recipe-app
```

## Project Structure

The backend project structure is organized as follows:

```bash
server
│
├── src/
│   ├── cloudinary/       # Cloudinary module
│   ├── common/           # Common utilities (interceptors, filters, etc.)
│   ├── recipes/          # Recipes module (controller, service, schema)
│   ├── app.module.ts     # Root module
│   ├── main.ts           # Entry point of the application
│
├── test/                 # Tests
├── .env.example          # Example environment variables file
├── jest.config.js        # Jest configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # This documentation
```

## Running the Application

1. Start the MongoDB server (if running locally):

   ```bash
   mongod
   ```

2. Run the Nest.js application in development mode:

   ```bash
   npm run start:dev
   ```

The backend server should now be running at `http://localhost:3001`.

### Building for Production

To create a production build:

```bash
npm run build
```

To run the production build:

```bash
npm run start:prod
```

## API Endpoints

The backend provides the following RESTful API endpoints:

- **GET /api/recipes**: Fetch all recipes with pagination.
- **GET /api/recipes/:id**: Fetch a single recipe by ID.
- **POST /api/recipes**: Create a new recipe (with image upload).
- **PUT /api/recipes/:id**: Update an existing recipe by ID.
- **DELETE /api/recipes/:id**: Delete a recipe by ID.

### Example API Usage

1. **Create a new recipe** (with image upload):

   ```bash
   POST /api/recipes
   Content-Type: multipart/form-data

   {
     "title": "Recipe Title",
     "instructions": "Step-by-step instructions",
     "ingredients": ["ingredient 1", "ingredient 2"],
     "image": <image-file>
   }
   ```

2. **Update a recipe**:

   ```bash
   PUT /api/recipes/:id
   Content-Type: application/json

   {
     "title": "Updated Title",
     "instructions": "Updated instructions",
     "ingredients": ["ingredient 1", "ingredient 2"]
   }
   ```

3. **Fetch a list of recipes**:

   ```bash
   GET /api/recipes?page=1&limit=10
   ```

## Environment Variables

The application requires several environment variables to run properly. These should be defined in a `.env` file located in the root of the `server` folder.

### Required Variables:

```bash
MONGO_URI=mongodb://localhost:27017/recipe-app
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
PORT=5000
```

- **MONGO_URI**: MongoDB connection string.
- **CLOUDINARY_CLOUD_NAME**, **CLOUDINARY_API_KEY**, **CLOUDINARY_API_SECRET**: Cloudinary credentials for image uploads.
- **PORT**: The port on which the backend server will run.

## Testing

To ensure the backend is working as expected, unit tests have been written using **Jest**.

### Running Tests

1. Run all tests:

   ```bash
   npm run test
   ```

2. Run tests in watch mode:

   ```bash
   npm run test:watch
   ```

3. Generate test coverage report:

   ```bash
   npm run test:cov
   ```
