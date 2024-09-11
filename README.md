# Recipe App

This project is a full-stack web application that allows users to manage a collection of recipes. Users can create, view, update, and delete recipes. Each recipe includes a title, ingredients, instructions, and an optional image.

## Table of Contents

- [Objective](#objective)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Testing](#testing)
- [Note on API Performance](#note-on-api-performance)

## Objective

The goal is to build a recipe management system using a Next.js frontend and a Nest.js backend, with functionality to create, edit, view, and delete recipes.

## Technologies

- **Frontend:** Next.js
- **Backend:** Nest.js
- **Database:** MongoDB
- **Image Handling:** Cloudinary

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/josephden16/recipe-app.git
   ```

2. Navigate to the project folder:

   ```bash
   cd recipe-app
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

4. Configure environment variables:
   - Create a `.env` file in both `client` and `server` directories from the `.env.example` file.
   - Add necessary environment variables (e.g., MongoDB connection string, Cloudinary API keys).

### Running the Application

1. Start the backend (Nest.js):

   ```bash
   cd server
   npm start
   ```

2. Start the frontend (Next.js):

   ```bash
   cd client
   npm run dev
   ```

3. Open the application in your browser at `http://localhost:3000`.

## API Endpoints

- **GET /api/recipes**: Fetch paginated recipes.
- **GET /api/recipes/:id**: Fetch details of a single recipe.
- **POST /api/recipes**: Create a new recipe.
- **PUT /api/recipes/:id**: Update an existing recipe.
- **DELETE /api/recipes/:id**: Delete a recipe.

## Testing

This project includes tests to ensure the reliability and correctness of the codebase. The tests are written using `Jest` and `React Testing Library` for the frontend and `Jest` for the backend.

### Running Tests

To run the tests for both the frontend and backend, follow these steps:

#### Frontend (Next.js)

1. Navigate to the client folder:

   ```bash
   cd client
   ```

2. Run the tests:

   ```bash
   npm test
   ```

#### Backend (Nest.js)

1. Navigate to the server folder:

   ```bash
   cd server
   ```

2. Run the tests:

   ```bash
   npm test
   ```

## Deployment

- **Frontend:** Deployed on Vercel.
- **Backend:** Deployed on Render.
- Links to the deployed applications:
  - Frontend: [https://recipe-app-nu-drab.vercel.app](https://recipe-app-nu-drab.vercel.app)
  - Backend: [https://recipe-app-volg.onrender.com](https://recipe-app-volg.onrender.com)

## Note on API Performance

Please note that the API is hosted on a free server on Render, which may result in slower response times. The server provider automatically shuts down the API when it is not actively receiving requests, leading to some delays when starting up after a period of inactivity. If you experience slow responses, this is likely due to the server warming up.
