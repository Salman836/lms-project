import { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Alert, Modal, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import courseService from '../../services/courseService';
import Loading from '../../components/Loading';

const ManageCourses = () => {
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
      setCourses(res.data);
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
      <h2>Manage Courses</h2>
      <p className="text-muted">{courses.length} total courses</p>

      {message && <Alert variant="info" dismissible onClose={() => setMessage('')}>{message}</Alert>}

      <Card>
        <Card.Body>
          {courses.length === 0 ? (
            <p className="text-center py-4">No courses found.</p>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Instructor</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Lessons</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={course._id}>
                    <td>{index + 1}</td>
                    <td>{course.title}</td>
                    <td>{course.instructor?.name || 'N/A'}</td>
                    <td><Badge bg="secondary">{course.category}</Badge></td>
                    <td>${course.price}</td>
                    <td>{course.lessons?.length || 0}</td>
                    <td>
                      <Link to={`/courses/${course._id}`}>
                        <Button variant="outline-info" size="sm" className="me-2">View</Button>
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
        <Modal.Body>Are you sure you want to delete this course?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageCourses;
