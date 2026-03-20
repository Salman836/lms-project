import { Spinner, Container } from 'react-bootstrap';

const Loading = () => (
  <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
    <Spinner animation="border" variant="primary" />
  </Container>
);

export default Loading;
