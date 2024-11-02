import { Container, Row, Col } from 'react-bootstrap';

const ContactUs = () => (
  <main>
    <Container id="list" fluid className="py-3">
      <Row>
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
    </Container>
  </main>
);

export default ContactUs;
