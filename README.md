# Task Management Web App

A full-stack task management application with JWT authentication.

## Tech Stack

- **Frontend**: React.js (Vite)
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Features

- User registration and login
- JWT-based authentication
- Create, read, update, delete tasks
- Task status management (pending, in-progress, completed)
- User-specific tasks
- Responsive design

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB Atlas account or local MongoDB

### Backend Setup

1. Navigate to server folder:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
- Add your MongoDB connection string
- Generate a secure JWT secret

5. Start the server:
```bash
node server.js
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to client folder:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks
- `GET /api/tasks` - Get all user tasks (protected)
- `POST /api/tasks` - Create new task (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## Environment Variables

### Server
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)
- `JWT_SECRET` - Secret key for JWT

### Client (Optional)
- `VITE_API_URL` - Backend API URL

## Project Structure

```
task-manager/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── client/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
    └── index.html
```

## License

MIT
