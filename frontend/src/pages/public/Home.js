import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h1 className="display-4 fw-bold">Welcome to LMS Portal</h1>
              <p className="lead mt-3">
                Learn from the best instructors worldwide. Browse courses, enroll, and advance your career
                with our comprehensive learning management system.
              </p>
              <div className="mt-4">
                <Link to="/courses">
                  <Button variant="light" size="lg" className="me-3">Browse Courses</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline-light" size="lg">Get Started</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <h2 className="text-center mb-4">Why Choose LMS Portal?</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center p-4">
              <Card.Body>
                <div className="display-4 mb-3 text-primary">&#127891;</div>
                <Card.Title>Expert Instructors</Card.Title>
                <Card.Text>
                  Learn from industry professionals with years of experience in their fields.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center p-4">
              <Card.Body>
                <div className="display-4 mb-3 text-success">&#128337;</div>
                <Card.Title>Flexible Learning</Card.Title>
                <Card.Text>
                  Study at your own pace with lifetime access to course materials.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center p-4">
              <Card.Body>
                <div className="display-4 mb-3 text-warning">&#127942;</div>
                <Card.Title>Certified Courses</Card.Title>
                <Card.Text>
                  Earn certificates upon completion to showcase your skills and knowledge.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
