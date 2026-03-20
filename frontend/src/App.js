import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Courses from './pages/public/Courses';
import CourseDetail from './pages/public/CourseDetail';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import MyCourses from './pages/student/MyCourses';
import Profile from './pages/student/Profile';

// Instructor Pages
import InstructorDashboard from './pages/instructor/Dashboard';
import CreateCourse from './pages/instructor/CreateCourse';
import ManageCoursesInstructor from './pages/instructor/ManageCourses';
import EditCourse from './pages/instructor/EditCourse';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageCoursesAdmin from './pages/admin/ManageCourses';
import Analytics from './pages/admin/Analytics';

import './App.css';

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={
            <PrivateRoute roles={['student']}><StudentDashboard /></PrivateRoute>
          } />
          <Route path="/student/my-courses" element={
            <PrivateRoute roles={['student']}><MyCourses /></PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute roles={['student', 'instructor', 'admin']}><Profile /></PrivateRoute>
          } />

          {/* Instructor Routes */}
          <Route path="/instructor/dashboard" element={
            <PrivateRoute roles={['instructor']}><InstructorDashboard /></PrivateRoute>
          } />
          <Route path="/instructor/create-course" element={
            <PrivateRoute roles={['instructor']}><CreateCourse /></PrivateRoute>
          } />
          <Route path="/instructor/manage-courses" element={
            <PrivateRoute roles={['instructor']}><ManageCoursesInstructor /></PrivateRoute>
          } />
          <Route path="/instructor/edit-course/:id" element={
            <PrivateRoute roles={['instructor']}><EditCourse /></PrivateRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>
          } />
          <Route path="/admin/users" element={
            <PrivateRoute roles={['admin']}><ManageUsers /></PrivateRoute>
          } />
          <Route path="/admin/courses" element={
            <PrivateRoute roles={['admin']}><ManageCoursesAdmin /></PrivateRoute>
          } />
          <Route path="/admin/analytics" element={
            <PrivateRoute roles={['admin']}><Analytics /></PrivateRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
