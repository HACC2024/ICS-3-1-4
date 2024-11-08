import { Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';

const Footer = () => (
  <footer className="mt-auto py-3 text-white">
    <Container>
      <Row>
        <Col lg={6} md={12} className="text-center p-3">
          <Link href="/info/terms-of-use">Terms of Use</Link>
          <br />
          <Link href="/info/privacy-policy">Privacy Policy</Link>
        </Col>
        <Col lg={6} md={12} className="text-center p-3">
          <Link href="/info/about-us">About Us</Link>
          <br />
          <Link href="/info/contact-us">Contact Us</Link>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
