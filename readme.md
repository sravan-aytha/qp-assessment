# Grocery API 

A scalable TypeScript-based REST API that enables admin to manage grocery items and allows users to browse and order groceries. Built with Express.js and containerized using Docker for easy deployment and scalability.

## Description

This API provides a comprehensive backend solution for grocery management and ordering. Administrators can perform CRUD operations on grocery items, while users can browse products and place orders. The API features authentication, role-based access control, and structured logging.

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v14 or higher)
- Docker
- Docker Compose

## How to Run the Project

### Step 1: Clone the Repository
```bash
git clone https://github.com/sravan-aytha/qp-assessment.git
cd qp-assessment
```
### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run with Docker

For the first time setup:
```bash
docker-compose up --build -d
```

For subsequent runs:
```bash
docker-compose up -d
```

That's it! Your API should now be running.

## Project Structure

This project follows a modular architecture with clear separation of concerns. Here's the detailed folder structure:

### `/deployment`
Contains Docker configuration files:
- `docker-compose.yml` - Orchestrates multi-container Docker applications
- `dockerfile` - Defines container build instructions

### `/src`
Main application source code directory containing:

#### `/controllers`
Contains route handlers for each module:
- `authcontroller.ts` - Handles authentication and authorization
- `grocery-controller.ts` - Manages grocery item operations
- `order-controller.ts` - Processes orders
- `user-controller.ts` - Manages user profiles and data

#### `/database`
Database configuration and setup:
- `database.ts` - Database connection and initialization

#### `/middlewares`
Custom middleware functions:
- `admin-check.ts` - Role verification middleware
- `index.ts` - Middleware exports
- `log-request.ts` - Request logging middleware

#### `/models`
Data models and schemas:
- `general-model.ts` - Shared model definitions
- `grocery-model.ts` - Grocery item schema
- `order-model.ts` - Order data schema
- `user-model.ts` - User data schema

#### `/repositories`
Data access layer implementing repository pattern:
- `base-repository.ts` - Generic repository operations
- `grocery-repository.ts` - Grocery-specific database operations
- `order-repository.ts` - Order data access methods
- `user-repository.ts` - User data management

#### `/routes`
API route definitions:
- `grocery-router.ts` - Grocery API endpoints
- `order-router.ts` - Order API endpoints
- `user-router.ts` - User API endpoints

#### `/services`
Business logic implementation:
- `grocery-services.ts` - Grocery business operations
- `order-service.ts` - Order processing logic
- `user-service.ts` - User management logic

#### `/utilities`
Helper functions and utilities:
- Contains utility functions used across the application

### Configuration Files
- `.env` - Environment variables (create your own based on .env.example)
- `.gitignore` - Defines ignored files for Git
- `package.json` - Project dependencies and scripts
- `package-lock.json` - Dependency lock file
- `tsconfig.json` - TypeScript configuration

## Technologies Used

- TypeScript
- Node.js
- Express.js
- Docker & Docker Compose
- JWT for authentication
- Database (MySql)

