# Algorithm Visualizer System

A comprehensive web-based platform designed to make learning and understanding computer science algorithms more intuitive through interactive, step-by-step visualizations.

The system bridges the gap between theoretical concepts and practical execution by allowing users to visualize how algorithms operate internally, explore their implementations in multiple programming languages, and track their learning progress.

## Overview

Understanding an algorithm from source code alone can be challenging. The Algorithm Visualizer System provides an interactive environment where users can observe the execution of algorithms step by step and understand how data changes during each operation.

The platform brings together algorithm visualizations, source code, learning progress, and bookmarking into a single system. It covers fundamental algorithms from searching, sorting, trees, graphs, dynamic programming, backtracking, and string matching.

## Features

- **Interactive Algorithm Visualization**: Visualize algorithm execution step by step and observe changes in data structures and intermediate states.
- **Multi-Language Code Panels**: View algorithm implementations in C++, Java, and Python alongside their visual execution.
- **Algorithm Library**: Explore a collection of commonly used searching, sorting, graph, tree, dynamic programming, backtracking, and string algorithms.
- **Progress Tracking**: Automatically track algorithms explored and learning progress.
- **Bookmarking**: Bookmark frequently studied algorithms for quick access from the user's dashboard.
- **User Authentication**: Secure authentication using JWT-based authorization and bcrypt password hashing.
- **Admin Panel**: Provide administrative functionality for managing users and algorithm-related content.
- **Responsive Interface**: Access the platform through a clean and interactive web interface.

## Algorithms Covered

### Searching and Arrays
- Binary Search
- Kadane's Algorithm
- Dutch National Flag

### Sorting
- Bubble Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Selection Sort

### Trees and Data Structures
- Binary Search Tree Operations
- Tree Traversals
- Trie

### Graph Algorithms
- Breadth-First Search (BFS)
- Depth-First Search (DFS)
- Kahn's Algorithm
- Dijkstra's Algorithm
- Bellman-Ford Algorithm
- Floyd-Warshall Algorithm
- A* Search
- Prim's Algorithm
- Kruskal's Algorithm
- Tarjan's Algorithm

### Dynamic Programming
- 0/1 Knapsack
- Longest Common Subsequence

### Backtracking
- N-Queens

### String Algorithms
- KMP String Matching

## System Architecture

The application follows a client-server architecture consisting of a React-based frontend, a Node.js and Express backend, and a PostgreSQL database.

```text
                    +----------------------+
                    |        User          |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |   React Frontend     |
                    | Vite + Tailwind CSS  |
                    +----------+-----------+
                               |
                            REST API
                               |
                               v
                    +----------------------+
                    |  Node.js + Express   |
                    |       Backend        |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |      PostgreSQL      |
                    |       Database       |
                    +----------------------+
```

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Authentication and Security
- JSON Web Token (JWT)
- bcrypt

### Development Tools
- Git
- GitHub
- npm

## Project Structure

```text
algorithm-visualizer-system/
│
├── client/              # React frontend
│   ├── src/
│   └── ...
│
├── server/              # Node.js and Express backend
│   ├── ...
│   └── ...
│
├── schema.sql           # PostgreSQL database schema
├── ALGORITHMS.md        # List of supported algorithms
├── algo.md              # Algorithm documentation
├── package.json         # Root project configuration
├── package-lock.json
├── .gitignore
└── README.md
```

## Prerequisites

Make sure the following software is installed:

- Node.js (v18 or higher)
- npm
- PostgreSQL (v14 or higher)
- Git

Verify the installations:

```bash
node --version
npm --version
psql --version
git --version
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/LegendaryProjects/algorithm-visualizer-system.git
cd algorithm-visualizer-system
```

### 2. Database Setup

Create a PostgreSQL database named `algorithm_visualizer_db`.

```sql
CREATE DATABASE algorithm_visualizer_db;
```

Run the provided database schema:

```bash
psql -U your_username -d algorithm_visualizer_db -f schema.sql
```

Replace `your_username` with your PostgreSQL username.

### 3. Environment Variables

Navigate to the server directory and create the environment file:

```bash
cd server
cp .env.example .env
```

Configure the required PostgreSQL credentials and authentication variables in `.env`.

For the frontend:

```bash
cd ../client
cp .env.example .env
```

Configure the required frontend environment variables.

Do not commit `.env` files or any credentials and secret keys to the repository.

### 4. Install Dependencies

Return to the root directory:

```bash
cd ..
```

Install dependencies for the project:

```bash
npm run install-all
```

### 5. Run the Application

Start the frontend and backend concurrently:

```bash
npm start
```

The application will be available at:

```text
Frontend: http://localhost:5173
Backend API: http://localhost:5000
```

## How It Works

The typical user workflow is:

```text
Login / Register
       |
       v
Algorithm Dashboard
       |
       v
Select an Algorithm
       |
       v
View Algorithm Details
       |
       v
View Source Code
       |
       v
Start Visualization
       |
       v
Observe Step-by-Step Execution
       |
       +-------------------+
       |                   |
       v                   v
   Bookmark           Track Progress
```

Users can select an algorithm, study its implementation, and observe its execution through an interactive visualization. The system records relevant learning activity and allows users to bookmark algorithms for future reference.

## Security

The system incorporates authentication and security mechanisms to protect user data and application functionality.

- Passwords are securely hashed using bcrypt.
- JWT is used for authentication and authorization.
- Protected routes restrict access to authenticated functionality.
- Administrative functionality is separated from regular user access.
- Sensitive configuration is maintained through environment variables.

## Learning Objectives

The project is intended to help users:

- Develop a stronger understanding of Data Structures and Algorithms.
- Connect theoretical concepts with practical execution.
- Understand algorithm behavior through visualization.
- Analyze intermediate states during execution.
- Compare implementations across programming languages.
- Build familiarity with commonly used algorithms.
- Track and organize their learning progress.

## Future Enhancements

Potential improvements include:

- Additional algorithm and data structure visualizations.
- Support for more programming languages.
- Interactive code execution.
- Time and space complexity visualization.
- Algorithm comparison and benchmarking.
- Personalized learning recommendations.
- Detailed user analytics.
- Interactive graph and tree manipulation.
- More advanced visualization controls.
- Improved mobile responsiveness.
- Personalized learning paths.

## Creators

- **Rahul Javalagi** — 241IT059
- **Sagar Hiremath** — 241IT067
- **Santosh Gouda** — 241IT070

## Faculty Guide

**Prof. Jaidhar C D**  
Department of Information Technology  
National Institute of Technology Karnataka, Surathkal

## Academic Project

This project was developed as part of an academic project under the **Department of Information Technology, National Institute of Technology Karnataka, Surathkal**.

## Repository

[Algorithm Visualizer System](https://github.com/LegendaryProjects/algorithm-visualizer-system)
