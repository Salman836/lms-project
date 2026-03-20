import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import userService from '../../services/userService';
import courseService from '../../services/courseService';
import Loading from '../../components/Loading';

const Analytics = () => {
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
  const admins = users.filter(u => u.role === 'admin');

  const categoryCounts = courses.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {});

  const totalRevenue = courses.reduce((sum, c) => sum + (c.price || 0), 0);

  return (
    <Container className="py-4">
      <h2>Reports & Analytics</h2>
      <p className="text-muted">Platform Overview</p>

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
            <h3>{courses.reduce((sum, c) => sum + (c.lessons?.length || 0), 0)}</h3>
            <p className="mb-0">Total Lessons</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 bg-warning text-dark">
            <h3>${totalRevenue}</h3>
            <p className="mb-0">Total Course Value</p>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header><h5 className="mb-0">User Distribution</h5></Card.Header>
            <Card.Body>
              <Table hover>
                <thead><tr><th>Role</th><th>Count</th><th>Percentage</th></tr></thead>
                <tbody>
                  <tr><td>Students</td><td>{students.length}</td><td>{users.length ? ((students.length / users.length) * 100).toFixed(1) : 0}%</td></tr>
                  <tr><td>Instructors</td><td>{instructors.length}</td><td>{users.length ? ((instructors.length / users.length) * 100).toFixed(1) : 0}%</td></tr>
                  <tr><td>Admins</td><td>{admins.length}</td><td>{users.length ? ((admins.length / users.length) * 100).toFixed(1) : 0}%</td></tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header><h5 className="mb-0">Courses by Category</h5></Card.Header>
            <Card.Body>
              <Table hover>
                <thead><tr><th>Category</th><th>Courses</th></tr></thead>
                <tbody>
                  {Object.entries(categoryCounts).map(([cat, count]) => (
                    <tr key={cat}><td>{cat}</td><td>{count}</td></tr>
                  ))}
                  {Object.keys(categoryCounts).length === 0 && (
                    <tr><td colSpan={2} className="text-center">No courses yet</td></tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Analytics;
