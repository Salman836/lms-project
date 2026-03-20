import { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Alert, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import courseService from '../../services/courseService';
import Loading from '../../components/Loading';

const ManageCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await courseService.getAllCourses();
      const myCourses = res.data.filter(c => c.instructor?._id === user?._id || c.instructor === user?._id);
      setCourses(myCourses);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await courseService.deleteCourse(deleteId);
      setMessage('Course deleted successfully');
      setShowDelete(false);
      fetchCourses();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete course');
    }
  };

  if (loading) return <Loading />;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Courses</h2>
        <Link to="/instructor/create-course">
          <Button variant="primary">Create New Course</Button>
        </Link>
      </div>

      {message && <Alert variant="info" dismissible onClose={() => setMessage('')}>{message}</Alert>}

      <Card>
        <Card.Body>
          {courses.length === 0 ? (
            <p className="text-center py-4">No courses found.</p>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Lessons</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>{course.category}</td>
                    <td>${course.price}</td>
                    <td>{course.lessons?.length || 0}</td>
                    <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/instructor/edit-course/${course._id}`}>
                        <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                      </Link>
                      <Button variant="outline-danger" size="sm" onClick={() => { setDeleteId(course._id); setShowDelete(true); }}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton><Modal.Title>Confirm Delete</Modal.Title></Modal.Header>
        <Modal.Body>Are you sure you want to delete this course? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageCourses;
