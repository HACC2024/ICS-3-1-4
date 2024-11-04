'use client';

import React from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchBar = () => {
  const [query, setQuery] = React.useState('');

  const handleSearch = () => {
    if (query) {
      window.location.href = `/results?search=${encodeURIComponent(query)}`; // Navigate with search query
    }
  };

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <Container>
      <InputGroup id="search" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <InputGroup.Text>
          <Button id="searchIcon" onClick={handleSearch}>
            <Search />
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </Container>
  );
};

export default SearchBar;
