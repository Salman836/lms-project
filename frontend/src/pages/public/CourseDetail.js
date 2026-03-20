import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Button, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import courseService from '../../services/courseService';
import enrollmentService from '../../services/enrollmentService';
import Loading from '../../components/Loading';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await courseService.getCourseById(id);
      setCourse(res.data);
    } catch (err) {
      setMessage({ text: 'Course not found', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await enrollmentService.enroll(id);
      setMessage({ text: 'Successfully enrolled in this course!', type: 'success' });
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || 'Failed to enroll',
        type: 'danger',
      });
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <Loading />;
  if (!course) return <Container className="py-4"><Alert variant="danger">Course not found</Alert></Container>;

  return (
    <Container className="py-4">
      {message.text && (
        <Alert variant={message.type} dismissible onClose={() => setMessage({ text: '', type: '' })}>
          {message.text}
        </Alert>
      )}

      <Row>
        <Col md={8}>
          <h1>{course.title}</h1>
          <div className="mb-3">
            <Badge bg="secondary" className="me-2">{course.category}</Badge>
            <span className="text-muted">
              By {course.instructor?.name || 'Unknown'}
            </span>
          </div>

          <Card className="mb-4">
            <Card.Body>
              <h4>About This Course</h4>
              <p>{course.description}</p>
            </Card.Body>
          </Card>

          {course.lessons && course.lessons.length > 0 && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Course Content ({course.lessons.length} lessons)</h5>
              </Card.Header>
              <ListGroup variant="flush">
                {course.lessons.map((lesson, index) => (
                  <ListGroup.Item key={index}>
                    <div className="d-flex justify-content-between">
                      <span>
                        <strong>{index + 1}.</strong> {lesson.title}
                      </span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          )}
        </Col>

        <Col md={4}>
          <Card className="sticky-top" style={{ top: '80px' }}>
            <Card.Body className="text-center">
              <h2 className="text-primary mb-3">
                {course.price === 0 ? 'Free' : `$${course.price}`}
              </h2>

              {!user ? (
                <Link to="/login">
                  <Button variant="primary" size="lg" className="w-100">
                    Login to Enroll
                  </Button>
                </Link>
              ) : user.role === 'student' ? (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-100"
                  onClick={handleEnroll}
                  disabled={enrolling}
                >
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </Button>
              ) : (
                <p className="text-muted">Only students can enroll in courses</p>
              )}

              <hr />
              <div className="text-start">
                <p><strong>Instructor:</strong> {course.instructor?.name}</p>
                <p><strong>Category:</strong> {course.category}</p>
                <p><strong>Lessons:</strong> {course.lessons?.length || 0}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetail;
