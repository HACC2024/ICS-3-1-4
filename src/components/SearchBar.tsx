'use client';

import React from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchBar = () => {
  const [query, setQuery] = React.useState('');

  // Read the topic filter from the URL if it exists
  const urlParams = new URLSearchParams(window.location.search);
  const currentTopic = urlParams.get('topic') || ''; // Get current topic from URL

  const handleSearch = () => {
    // Construct the new URL with both search and topic params
    const newUrl = `/results?search=${encodeURIComponent(query)}${currentTopic ? `&topic=${encodeURIComponent(currentTopic)}` : ''}`;

    // Navigate to the new URL
    window.location.href = newUrl;
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
