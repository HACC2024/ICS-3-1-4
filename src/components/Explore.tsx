'use client';

import { Container, Row, Col, ToggleButton } from 'react-bootstrap';
import React, { useState } from 'react';
import SearchBar from './SearchBar';

const Explore = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterChange = (value: string) => {
    setSelectedFilters((prev) => (prev.includes(value) ? prev.filter((filter) => filter !== value) : [...prev, value]));
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
          {['Filter 1', 'Filter 2', 'Filter 3', 'Filter 4', 'Filter 5'].map((filter, index) => (
            <ToggleButton
              key={filter}
              type="checkbox"
              variant={selectedFilters.includes(filter) ? 'primary' : 'outline-secondary'}
              className={`filter-button ${selectedFilters.includes(filter) ? 'active' : ''}`}
              checked={selectedFilters.includes(filter)}
              onChange={() => handleFilterChange(filter)}
              id={`filter-${index}`}
              value={filter}
              style={{ margin: '0 5px' }}
            >
              {filter}
            </ToggleButton>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Explore;
