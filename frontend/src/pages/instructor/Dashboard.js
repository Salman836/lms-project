import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import courseService from '../../services/courseService';
import Loading from '../../components/Loading';

const Dashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <Loading />;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Welcome, {user?.name}!</h2>
          <p className="text-muted">Instructor Dashboard</p>
        </div>
        <Link to="/instructor/create-course">
          <Button variant="primary">Create New Course</Button>
        </Link>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center p-3 bg-primary text-white">
            <h3>{courses.length}</h3>
            <p className="mb-0">Total Courses</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3 bg-success text-white">
            <h3>{courses.reduce((sum, c) => sum + (c.lessons?.length || 0), 0)}</h3>
            <p className="mb-0">Total Lessons</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3 bg-info text-white">
            <h3>${courses.reduce((sum, c) => sum + (c.price || 0), 0)}</h3>
            <p className="mb-0">Total Course Value</p>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">My Courses</h5>
          <Link to="/instructor/manage-courses">
            <Button variant="outline-primary" size="sm">Manage All</Button>
          </Link>
        </Card.Header>
        <Card.Body>
          {courses.length === 0 ? (
            <div className="text-center py-4">
              <p>You haven't created any courses yet.</p>
              <Link to="/instructor/create-course">
                <Button variant="primary">Create Your First Course</Button>
              </Link>
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Lessons</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.slice(0, 5).map(course => (
                  <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>{course.category}</td>
                    <td>${course.price}</td>
                    <td>{course.lessons?.length || 0}</td>
                    <td>
                      <Link to={`/instructor/edit-course/${course._id}`}>
                        <Button variant="outline-primary" size="sm">Edit</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
