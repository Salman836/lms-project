import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="py-5">
      <h1 className="mb-4">About LMS Portal</h1>
      <Row>
        <Col md={8}>
          <p className="lead">
            LMS Portal is a comprehensive learning management system designed to connect
            students with expert instructors worldwide.
          </p>
          <p>
            Our platform provides a seamless learning experience with course management,
            progress tracking, and interactive lessons. Whether you're a student looking to
            learn new skills or an instructor wanting to share your knowledge, LMS Portal
            has everything you need.
          </p>

          <h3 className="mt-4 mb-3">Our Mission</h3>
          <p>
            To make quality education accessible to everyone, everywhere. We believe that
            learning should be flexible, affordable, and engaging.
          </p>

          <h3 className="mt-4 mb-3">What We Offer</h3>
          <Row>
            <Col md={6}>
              <Card className="mb-3 p-3">
                <h5>For Students</h5>
                <ul className="mb-0">
                  <li>Browse and enroll in courses</li>
                  <li>Track your learning progress</li>
                  <li>Access course materials anytime</li>
                </ul>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-3 p-3">
                <h5>For Instructors</h5>
                <ul className="mb-0">
                  <li>Create and manage courses</li>
                  <li>Upload lesson content</li>
                  <li>Reach students worldwide</li>
                </ul>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <Card className="bg-light p-4">
            <h4>Platform Stats</h4>
            <hr />
            <p><strong>Courses:</strong> Growing daily</p>
            <p><strong>Students:</strong> Worldwide community</p>
            <p><strong>Instructors:</strong> Industry experts</p>
            <p className="mb-0"><strong>Satisfaction:</strong> 100% commitment</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
