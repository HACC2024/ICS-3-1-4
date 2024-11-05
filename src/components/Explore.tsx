'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import React from 'react';
import { useRouter } from 'next/navigation'; // For routing
import SearchBar from './SearchBar';

const Explore = () => {
  const router = useRouter();

  // Function to handle button click and route to Results page with topic filter
  const handleTopicFilterClick = (topic: string) => {
    // Create a new URLSearchParams object and set the topic query parameter
    const urlParams = new URLSearchParams();
    urlParams.set('topic', topic); // Add the topic filter

    // Use Next.js's router to push the new URL with the query parameters
    router.push(`/results?${urlParams.toString()}`);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} className="mx-auto">
          <h1 className="text-center mb-5">Aloha Archives</h1>
        </Col>
      </Row>
      <Row>
        <Col md={8} className="mx-auto">
          <SearchBar />
        </Col>
      </Row>
      <Row>
        <Col md={8} className="mx-auto d-flex justify-content-center">
          <Button
            type="button"
            onClick={() => handleTopicFilterClick('Health')} // Route to ResultsPage with Health filter
            className="filter-button mx-2"
          >
            Health
          </Button>
          <Button
            type="button"
            onClick={() => handleTopicFilterClick('Transportation')} // Route to ResultsPage with Health filter
            className="filter-button mx-2"
          >
            Transportation
          </Button>
          <Button
            type="button"
            onClick={() => handleTopicFilterClick('Demographics')} // Route to ResultsPage with Health filter
            className="filter-button mx-2"
          >
            Demographics
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Explore;
