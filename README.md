# Algorithm Visualizer System

A comprehensive web-based platform to visualize and learn computer science algorithms.

## Features
- **Algorithm Visualization**: Step-by-step visual execution of complex algorithms.
- **Code Panels**: Live side-by-side execution view in C++, Java, and Python.
- **Progress Tracking**: Automatic tracking of your learning progress and steps viewed.
- **Bookmarking**: Pin your favorite algorithms to your dashboard.
- **Admin Panel**: Manage users and algorithms securely.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express, PostgreSQL
- **Authentication**: JWT, bcrypt

## Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)

## Setup Instructions

### 1. Database Setup
1. Create a PostgreSQL database named `algorithm_visualizer_db`.
2. Run the provided `schema.sql` to create the required tables:
   ```bash
   psql -U your_username -d algorithm_visualizer_db -f schema.sql
   ```

### 2. Environment Variables
1. Navigate to the `server/` directory and copy the `.env.example` file to `.env`. Update the variables with your actual database credentials.
2. Navigate to the `client/` directory and copy the `.env.example` file to `.env`.

### 3. Installation
From the root directory, install all dependencies concurrently:
```bash
npm run install-all
```

### 4. Running the Application
Start both the client and server concurrently from the root directory:
```bash
npm start
```
- Frontend will run on: `http://localhost:5173`
- Backend API will run on: `http://localhost:5000`

## Creators
- Rahul Javalagi (241IT059)
- Sagar Hiremath (241IT067)
- Santosh Gouda (241IT070)

Under the guidance of Professor Jaidhar C D, Department of Information Technology, National Institute of Technology Karnataka, Surathkal.
