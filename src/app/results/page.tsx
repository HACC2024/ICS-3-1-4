'use client';

import SearchBar from '@/components/SearchBar';
import { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const ResultsPage = () => {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isOpen3, setIsOpen3] = useState(true);

  const toggleMenu1 = () => {
    setIsOpen1(!isOpen1);
  };

  const toggleMenu2 = () => {
    setIsOpen2(!isOpen2);
  };

  const toggleMenu3 = () => {
    setIsOpen3(!isOpen3);
  };

  return (
    <main>
      <Container>
        <Row className="mt-5 mb-5">
          <Col md={3} className="mx-auto bg-light">
            <Container className="mt-1">
              <Row>
                <h2 className="text-center" id="hind">
                  Filters
                </h2>
              </Row>
              <Row className="mb-3">
                <button type="button" onClick={toggleMenu1} className="btn btn-primary" id="filterMenu">
                  {isOpen1 ? 'Hide Topics' : 'Show Topics'}
                </button>
                {isOpen1 && (
                  <ul className="list-group mt-2">
                    <button type="button" className="list-group-item">
                      Item 1
                    </button>
                    <button type="button" className="list-group-item">
                      Item 2
                    </button>
                    <button type="button" className="list-group-item">
                      Item 3
                    </button>
                  </ul>
                )}
              </Row>
              <Row className="mb-3" id="hind">
                <button type="button" onClick={toggleMenu2} className="btn btn-primary" id="filterMenu">
                  {isOpen2 ? 'Hide Locations' : 'Show Locations'}
                </button>
                {isOpen2 && (
                  <ul className="list-group mt-2">
                    <button type="button" className="list-group-item">
                      Item 1
                    </button>
                    <button type="button" className="list-group-item">
                      Item 2
                    </button>
                    <button type="button" className="list-group-item">
                      Item 3
                    </button>
                  </ul>
                )}
              </Row>
              <Row className="mb-3">
                <button type="button" onClick={toggleMenu3} className="btn btn-primary" id="filterMenu">
                  {isOpen3 ? 'Hide Dates' : 'Show Dates'}
                </button>
                {isOpen3 && (
                  <ul className="list-group mt-2">
                    <button type="button" className="list-group-item">
                      Item 1
                    </button>
                    <button type="button" className="list-group-item">
                      Item 2
                    </button>
                    <button type="button" className="list-group-item">
                      Item 3
                    </button>
                  </ul>
                )}
              </Row>
            </Container>
          </Col>
          <Col md={9} className="mx-auto">
            <Row>
              <SearchBar />
            </Row>
            <Row>
              <h1 className="ms-3" id="hind">
                Results
              </h1>
            </Row>
            <Row>
              <button
                type="button"
                style={{
                  padding: 0,
                  border: 'none',
                  background: 'none',
                  width: '18rem',
                  marginLeft: '2rem',
                  marginBottom: '2rem',
                }}
                onClick={() => console.log('Card clicked!')} // Replace with your desired action
              >
                <Card>
                  <Container className="d-flex justify-content-center mt-3">
                    <Card.Img
                      variant="top"
                      src="/Seal_of_the_State_of_Hawaii.png"
                      alt="Dataset Image"
                      style={{ maxWidth: '100px', height: 'auto' }}
                    />
                  </Container>
                  <Card.Body>
                    <Card.Title>Dataset Title</Card.Title>
                    <Card.Text>Dataset Description</Card.Text>
                  </Card.Body>
                </Card>
              </button>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ResultsPage;
