'use client';

import Link from 'next/link';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { BarChartFill, GearFill, PersonFill } from 'react-bootstrap-icons';

const ProfilePage = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Row className="mt-4">
        <Col md={4} className="d-flex justify-content-center">
          <Link className="no-underline" href="/persona" passHref>
            <Card style={{ width: '200px', height: '200px' }} className="text-center">
              <Card.Body>
                <Card.Title style={{ fontSize: '1.5rem' }}>Settings</Card.Title>
                <GearFill size={100} className="mt-3" />
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4} className="d-flex justify-content-center">
          <Link className="no-underline" href="/persona" passHref>
            <Card style={{ width: '200px', height: '200px' }} className="text-center">
              <Card.Body>
                <Card.Title style={{ fontSize: '1.5rem' }}>My Datasets</Card.Title>
                <BarChartFill size={100} className="mt-3" />
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4} className="d-flex justify-content-center">
          <Link className="no-underline" href="/persona" passHref>
            <Card style={{ width: '200px', height: '200px' }} className="text-center">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <Card.Title className="no-underline" style={{ fontSize: '1.5rem' }}>
                  My Persona
                </Card.Title>
                <PersonFill size={100} className="mt-3" />
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  </main>
);

export default ProfilePage;
