import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import courseService from '../../services/courseService';
import Loading from '../../components/Loading';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', category: '', price: 0 });
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const categories = ['Web Development', 'Mobile Development', 'Data Science', 'Machine Learning', 'DevOps', 'Design', 'Business', 'Other'];

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await courseService.getCourseById(id);
      const course = res.data;
      setFormData({ title: course.title, description: course.description, category: course.category, price: course.price });
      setLessons(course.lessons || []);
    } catch (err) {
      setError('Course not found');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await courseService.updateCourse(id, { ...formData, price: Number(formData.price), lessons });
      setMessage('Course updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update course');
    }
  };

  const addLesson = () => {
    if (!newLesson.title || !newLesson.content) return;
    setLessons([...lessons, { ...newLesson, order: lessons.length + 1 }]);
    setNewLesson({ title: '', content: '' });
  };

  const removeLesson = (index) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  if (loading) return <Loading />;

  return (
    <Container className="py-4">
      <h2>Edit Course</h2>
      {message && <Alert variant="success" dismissible onClose={() => setMessage('')}>{message}</Alert>}
      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

      <Row>
        <Col md={7}>
          <Card className="mb-4">
            <Card.Header><h5 className="mb-0">Course Details</h5></Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={4} name="description" value={formData.description} onChange={handleChange} required />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price ($)</Form.Label>
                      <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" />
                    </Form.Group>
                  </Col>
                </Row>
                <Button type="submit" variant="primary">Save Changes</Button>
                <Button variant="outline-secondary" className="ms-2" onClick={() => navigate(-1)}>Back</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="mb-4">
            <Card.Header><h5 className="mb-0">Lessons ({lessons.length})</h5></Card.Header>
            <Card.Body>
              <Form.Group className="mb-2">
                <Form.Control type="text" placeholder="Lesson Title" value={newLesson.title} onChange={e => setNewLesson({ ...newLesson, title: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control as="textarea" rows={2} placeholder="Lesson Content" value={newLesson.content} onChange={e => setNewLesson({ ...newLesson, content: e.target.value })} />
              </Form.Group>
              <Button variant="success" size="sm" onClick={addLesson} className="mb-3">Add Lesson</Button>

              <ListGroup>
                {lessons.map((lesson, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{index + 1}. {lesson.title}</strong>
                      <br /><small className="text-muted">{lesson.content.substring(0, 50)}...</small>
                    </div>
                    <Button variant="outline-danger" size="sm" onClick={() => removeLesson(index)}>Remove</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditCourse;
