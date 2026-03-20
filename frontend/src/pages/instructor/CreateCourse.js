import { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import courseService from '../../services/courseService';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: 0,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['Web Development', 'Mobile Development', 'Data Science', 'Machine Learning', 'DevOps', 'Design', 'Business', 'Other'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await courseService.createCourse({ ...formData, price: Number(formData.price) });
      navigate(`/instructor/edit-course/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header><h4 className="mb-0">Create New Course</h4></Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Course Title</Form.Label>
                  <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="Enter course title" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={4} name="description" value={formData.description} onChange={handleChange} required placeholder="Enter course description" />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
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
                <div className="d-flex gap-2">
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Course'}
                  </Button>
                  <Button variant="outline-secondary" onClick={() => navigate(-1)}>Cancel</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCourse;
