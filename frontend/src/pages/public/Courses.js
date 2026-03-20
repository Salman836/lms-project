import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import courseService from '../../services/courseService';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Container className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Browse Courses</h2>

      <Form.Control
        type="text"
        placeholder="Search courses by title or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
        size="lg"
      />

      {filteredCourses.length === 0 ? (
        <div className="text-center py-5">
          <h4>No courses found</h4>
          <p className="text-muted">Try adjusting your search terms</p>
        </div>
      ) : (
        <Row>
          {filteredCourses.map(course => (
            <Col md={4} key={course._id} className="mb-4">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column">
                  <div className="mb-2">
                    <Badge bg="secondary">{course.category}</Badge>
                  </div>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text className="text-muted flex-grow-1">
                    {course.description.substring(0, 120)}
                    {course.description.length > 120 ? '...' : ''}
                  </Card.Text>
                  <div className="mb-2">
                    <small className="text-muted">
                      By {course.instructor?.name || 'Unknown'}
                    </small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="h5 text-primary mb-0">
                      {course.price === 0 ? 'Free' : `$${course.price}`}
                    </span>
                    <Link to={`/courses/${course._id}`}>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Courses;
