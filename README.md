# Learning Management System (LMS)

A full-stack Learning Management System built with React and Node.js. Supports three user roles — **Students**, **Instructors**, and **Admins** — each with dedicated dashboards and features for managing courses, enrollments, and progress tracking.

## Tech Stack

**Frontend:** React 19, React Router 7, React Bootstrap 5, Axios
**Backend:** Express 5, MongoDB, Mongoose 9, JWT Authentication, bcrypt

## Features

### Student
- Browse and search course catalog
- Enroll in courses and track progress
- Personal dashboard with stats (enrolled, completed, average progress)
- Profile management

### Instructor
- Create courses with lessons, categories, and pricing
- Edit/delete owned courses and manage lessons
- Dashboard with course stats and revenue overview

### Admin
- Manage all users and courses
- Analytics dashboard (user distribution, categories, revenue, lesson counts)
- Delete users and courses platform-wide

### General
- JWT-based authentication with role-based access control
- Responsive Bootstrap UI
- Password hashing with bcrypt
- Protected routes on both frontend and backend

## Project Structure

```
lms-project/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route handlers (auth, course, enrollment, user)
│   ├── middleware/       # Auth & role-based authorization
│   ├── models/          # Mongoose schemas (User, Course, Enrollment)
│   ├── routes/          # API route definitions
│   ├── seed.js          # Database seeder (creates default admin)
│   └── server.js        # Express app entry point
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/  # Navbar, Footer, PrivateRoute, Loading
│       ├── context/     # AuthContext (global auth state)
│       ├── pages/       # Organized by role (public, student, instructor, admin)
│       └── services/    # API service modules (axios)
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or remote)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Salman836/lms-project.git
   cd lms-project
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in the `backend/` directory:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/lms
   JWT_SECRET=your_jwt_secret_here
   ```

5. **Seed the database** (creates a default admin account)

   ```bash
   cd ../backend
   node seed.js
   ```

   Default admin credentials:
   - Email: `admin@lms.com`
   - Password: `admin123`

### Running the Application

Start the backend and frontend in separate terminals:

```bash
# Terminal 1 - Backend (runs on port 5000)
cd backend
npm start

# Terminal 2 - Frontend (runs on port 3000)
cd frontend
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication
| Method | Endpoint             | Description          | Access  |
|--------|----------------------|----------------------|---------|
| POST   | `/api/auth/register` | Register new user    | Public  |
| POST   | `/api/auth/login`    | Login user           | Public  |
| GET    | `/api/auth/profile`  | Get current profile  | Private |

### Courses
| Method | Endpoint           | Description        | Access           |
|--------|--------------------|--------------------|------------------|
| GET    | `/api/courses`     | Get all courses    | Public           |
| GET    | `/api/courses/:id` | Get course details | Public           |
| POST   | `/api/courses`     | Create course      | Instructor/Admin |
| PUT    | `/api/courses/:id` | Update course      | Owner/Admin      |
| DELETE | `/api/courses/:id` | Delete course      | Owner/Admin      |

### Enrollments
| Method | Endpoint                       | Description      | Access  |
|--------|--------------------------------|------------------|---------|
| POST   | `/api/enrollments/enroll`      | Enroll in course | Student |
| GET    | `/api/enrollments/my-courses`  | Get my courses   | Student |
| PUT    | `/api/enrollments/:id/progress`| Update progress  | Student |

### Users
| Method | Endpoint           | Description      | Access  |
|--------|--------------------|-----------------  |---------|
| GET    | `/api/users`       | Get all users    | Admin   |
| PUT    | `/api/users/profile` | Update profile | Private |
| DELETE | `/api/users/:id`   | Delete user      | Admin   |

## License

ISC
