import { Col, Row } from 'react-bootstrap';

const ContactUsText = () => (
  <Row className="text-contrast">
    <Col>
      <h1>Contact Us</h1>
      <p>
        If you have any questions or comments, please contact us at
        {' '}
        <a href="mailto:alohaarchives@gmail.com">alohaarchives@gmail.com</a>
        .
      </p>
    </Col>
  </Row>
);

export default ContactUsText;
