import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const Home = () => {
  return <div>
    <h1> Home page</h1>
    <Row className="mx-0">
      <Button as={Col} variant="primary">Button #1</Button>
    </Row>

  </div>;
};
