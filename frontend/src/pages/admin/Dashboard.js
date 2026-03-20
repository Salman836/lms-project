import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import userService from '../../services/userService';
import courseService from '../../services/courseService';
import Loading from '../../components/Loading';

const Dashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, coursesRes] = await Promise.all([
        userService.getAllUsers(),
        courseService.getAllCourses()
      ]);
      setUsers(usersRes.data);
      setCourses(coursesRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  const students = users.filter(u => u.role === 'student');
  const instructors = users.filter(u => u.role === 'instructor');

  return (
    <Container className="py-4">
      <h2>Welcome, {user?.name}!</h2>
      <p className="text-muted">Admin Dashboard</p>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center p-3 bg-primary text-white">
            <h3>{users.length}</h3>
            <p className="mb-0">Total Users</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 bg-success text-white">
            <h3>{courses.length}</h3>
            <p className="mb-0">Total Courses</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 bg-info text-white">
            <h3>{students.length}</h3>
            <p className="mb-0">Students</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 bg-warning text-dark">
            <h3>{instructors.length}</h3>
            <p className="mb-0">Instructors</p>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <h5 className="mb-0">Recent Users</h5>
              <Link to="/admin/users" className="text-decoration-none">View All</Link>
            </Card.Header>
            <Card.Body>
              <Table responsive hover size="sm">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Role</th></tr>
                </thead>
                <tbody>
                  {users.slice(0, 5).map(u => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td className="text-capitalize">{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <h5 className="mb-0">Recent Courses</h5>
              <Link to="/admin/courses" className="text-decoration-none">View All</Link>
            </Card.Header>
            <Card.Body>
              <Table responsive hover size="sm">
                <thead>
                  <tr><th>Title</th><th>Category</th><th>Price</th></tr>
                </thead>
                <tbody>
                  {courses.slice(0, 5).map(c => (
                    <tr key={c._id}>
                      <td>{c.title}</td>
                      <td>{c.category}</td>
                      <td>${c.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
