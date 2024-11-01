/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

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
          <Nav className="me-auto justify-content-start">
            {currentUser
              ? [
                  // <Nav.Link id="add-stuff-nav" href="/add" key="add" active={pathName === '/add'}>
                  //   Add Stuff
                  // </Nav.Link>,
                  // <Nav.Link id="list-stuff-nav" href="/list" key="list" active={pathName === '/list'}>
                  //   List Stuff
                  // </Nav.Link>,
                  <Nav.Link id="list-stuff-nav" href="/list" key="list" active={pathName === '/list'}>
                  Take a Persona Quiz!
                  </Nav.Link>,
                ]
              : ''}
            {currentUser && role === 'ADMIN' ? (
  <>
  {/* <Nav.Link id="admin-stuff-nav" href="/admin" key="admin" active={pathName === '/admin'}>
                Admin
  </Nav.Link> */}
    <Nav.Link id="admin-stuff-nav" href="/admin" key="admin" active={pathName === '/admin'}>
      Upload
    </Nav.Link>
    <Nav.Link id="manage-users-nav" href="/manage-users" key="manage-users" active={pathName === '/manage-users'}>
      Delete Database
    </Nav.Link>
    <Nav.Link id="settings-nav" href="/settings" key="settings" active={pathName === '/settings'}>
      Edit Database
    </Nav.Link>
  </>
) : (
  ''
)}
          </Nav>
          <Nav>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill />
                  Sign up
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
