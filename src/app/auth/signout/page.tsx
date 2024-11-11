'use client';

import { signOut } from 'next-auth/react';
import { Button, Col, Row } from 'react-bootstrap';

/** After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => (
  <Col id="signout-page" className="text-center py-3">
    <h2 className="text-contrast">Do you want to sign out?</h2>
    <Row>
      <Col xs={4} />
      <Col>
        <Button variant="danger" style={{ border: 'none' }} onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
          Sign Out
        </Button>
      </Col>
      <Col>
        <Button variant="secondary" href="/" style={{ color: 'white !important', border: 'none' }}>
          Cancel
        </Button>
      </Col>
      <Col xs={4} />
    </Row>
  </Col>
);

export default SignOut;
