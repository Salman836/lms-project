import { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const data = await register(formData.name, formData.email, formData.password, formData.role);
      switch (data.user.role) {
        case 'instructor': navigate('/instructor/dashboard'); break;
        default: navigate('/student/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body className="p-4">
              <h3 className="text-center mb-4">Create Account</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Min 6 characters" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Confirm your password" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Register As</Form.Label>
                  <Form.Select name="role" value={formData.role} onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                  </Form.Select>
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Register'}
                </Button>
              </Form>
              <p className="text-center mt-3 mb-0">
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
