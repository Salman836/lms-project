import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import enrollmentService from '../../services/enrollmentService';
import Loading from '../../components/Loading';

const Dashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await enrollmentService.getMyCourses();
      setEnrollments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  const avgProgress = enrollments.length
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
    : 0;

  return (
    <Container className="py-4">
      <h2>Welcome, {user?.name}!</h2>
      <p className="text-muted">Student Dashboard</p>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center p-3 bg-primary text-white">
            <h3>{enrollments.length}</h3>
            <p className="mb-0">Enrolled Courses</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3 bg-success text-white">
            <h3>{avgProgress}%</h3>
            <p className="mb-0">Average Progress</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3 bg-info text-white">
            <h3>{enrollments.filter(e => e.progress === 100).length}</h3>
            <p className="mb-0">Completed</p>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card>
            <Card.Header><h5 className="mb-0">My Courses</h5></Card.Header>
            <Card.Body>
              {enrollments.length === 0 ? (
                <p>No courses enrolled yet. <Link to="/courses">Browse courses</Link></p>
              ) : (
                enrollments.slice(0, 5).map(enrollment => (
                  <div key={enrollment._id} className="mb-3">
                    <div className="d-flex justify-content-between">
                      <strong>{enrollment.course?.title}</strong>
                      <span>{enrollment.progress}%</span>
                    </div>
                    <ProgressBar now={enrollment.progress} variant={enrollment.progress === 100 ? 'success' : 'primary'} />
                  </div>
                ))
              )}
              <Link to="/student/my-courses">
                <Button variant="outline-primary" className="mt-2">View All Courses</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header><h5 className="mb-0">Quick Actions</h5></Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Link to="/courses"><Button variant="primary">Browse Courses</Button></Link>
                <Link to="/profile"><Button variant="outline-secondary">Edit Profile</Button></Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
