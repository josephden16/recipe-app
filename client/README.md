# Recipe App - Frontend

This is the **frontend** part of the Recipe Management System built using **Next.js**. The application allows users to create, view, edit, and delete recipes, with features like form validation and image handling. The frontend interacts with the backend API, which is built using **Nest.js**.

## Table of Contents

- [Features](#features)
- [Tools](#tools)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Environment Variables](#environment-variables)

## Features

- List recipes with pagination.
- View details of a single recipe.
- Create new recipes.
- Edit existing recipes.
- Delete recipes.

## Tools

- **React.js** (via Next.js)
- **Tailwind CSS** for styling
- **react-hook-form** for form management and validation
- **Axios** for API calls
- **React Testing Library** and **Jest** for unit testing
- **TypeScript** for type safety

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/josephden16/recipe-app.git
   ```

2. Navigate to the `client` folder:

   ```bash
   cd recipe-app/client
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables:

   - Copy `.env.example` to `.env.local`:

     ```bash
     cp .env.example .env.local
     ```

   - Update the `.env.local` file with your environment variables.

## Project Structure

The frontend project structure is organized as follows:

```bash
client
│
├── tests/             # Tests
├── components/        # Reusable UI components
├── pages/             # Next.js pages (routes)
│   ├── api/           # API route proxies
│   ├── recipes/       # Recipe-specific routes (create, edit, etc.)
│   ├── index.tsx      # Homepage (list of recipes)
│
├── public/            # Public assets (images, icons, etc.)
├── styles/            # Global and component-level styles
├── types/             # TypeScript types and interfaces
├── utils/             # Helper functions (API fetchers, constants)
├── jest.config.js     # Jest configuration for unit testing
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Dependencies and scripts
```

## Running the Application

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open the application in your browser at `http://localhost:3000`.

### Building for Production

To create an optimized build for production:

```bash
npm run build
```

You can preview the production build using:

```bash
npm run start
```

## Testing

To ensure the reliability of the frontend, unit tests and integration tests have been written using **Jest** and **React Testing Library**.

### Running Tests

1. Run all tests:

   ```bash
   npm test
   ```

2. Run a specific test file:

   ```bash
   npm test -- <test-file-name>
   ```

## Environment Variables

Make sure to configure the following environment variables in your `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=<backend API base URL>
```
