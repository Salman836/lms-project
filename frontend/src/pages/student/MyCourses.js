import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import enrollmentService from '../../services/enrollmentService';
import Loading from '../../components/Loading';

const MyCourses = () => {
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

  const handleUpdateProgress = async (enrollmentId, currentProgress) => {
    const newProgress = Math.min(currentProgress + 10, 100);
    try {
      await enrollmentService.updateProgress(enrollmentId, newProgress);
      fetchEnrollments();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loading />;

  return (
    <Container className="py-4">
      <h2>My Courses</h2>
      <p className="text-muted">{enrollments.length} course(s) enrolled</p>

      {enrollments.length === 0 ? (
        <Card className="text-center p-5">
          <h4>No courses yet</h4>
          <p>Start learning by browsing our course catalog.</p>
          <Link to="/courses"><Button variant="primary">Browse Courses</Button></Link>
        </Card>
      ) : (
        <Row>
          {enrollments.map(enrollment => (
            <Col md={6} lg={4} key={enrollment._id} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{enrollment.course?.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {enrollment.course?.description?.substring(0, 100)}...
                  </Card.Text>
                  <div className="mb-2">
                    <div className="d-flex justify-content-between mb-1">
                      <small>Progress</small>
                      <small>{enrollment.progress}%</small>
                    </div>
                    <ProgressBar
                      now={enrollment.progress}
                      variant={enrollment.progress === 100 ? 'success' : 'primary'}
                    />
                  </div>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Link to={`/courses/${enrollment.course?._id}`}>
                    <Button variant="outline-primary" size="sm">View Course</Button>
                  </Link>
                  {enrollment.progress < 100 && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleUpdateProgress(enrollment._id, enrollment.progress)}
                    >
                      Mark Progress
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyCourses;
