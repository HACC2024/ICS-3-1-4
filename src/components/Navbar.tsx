/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Col, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonCircle, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import NavSearchBar from './NavSearchBar';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image
            src="/Seal_of_the_State_of_Hawaii.png"
            alt="Hawaii State Seal"
            width={100}
            height={100}
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start p-3">
            <Nav.Link id="home-nav" href="/" key="home" active={pathName === '/'}>
              Home
            </Nav.Link>
            <Nav.Link id="datasets-nav" href="/results" key="results" active={pathName === '/results'}>
              Datasets
            </Nav.Link>
            {currentUser
              ? [
                  <Nav.Link id="persona-stuff-nav" href="/persona-quiz" key="persona" active={pathName === '/persona-quiz'}>
                    Persona Quiz
                  </Nav.Link>,
                  <Nav.Link id="favorites" href="/favorites" key="favorites" active={pathName === '/favorites'}>
                    Favorites
                  </Nav.Link>,
                  <Nav.Link id="favorites" href="/recommended" key="recommended" active={pathName === '/recommended'}>
                    Recommended
                  </Nav.Link>,
                ]
              : ''}
            {currentUser && role === 'ADMIN' ? (
              <>
                {/* <Nav.Link id="admin-stuff-nav" href="/admin" key="admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link> */}
                <Nav.Link id="manage-datasets-nav" href="/manage-datasets" key="/manage-datasets" active={pathName === '/manage-datasets'}>
                  Manage Datasets
                </Nav.Link>
              </>
) : (
  ''
)}
          </Nav>
          {/* Right-aligned links */}
          <Nav className="ms-auto d-flex align-items-center">
            <Col>
              <NavSearchBar />
            </Col>
          </Nav>
          <Nav>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="profile-nav" href="/profile">
                  <PersonCircle />
                  {' '}
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock />
                  {' '}
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill />
                  {' '}
                  Sign In
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill />
                  {' '}
                  Sign Up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
