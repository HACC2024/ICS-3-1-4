'use client';

import React, { useEffect, useState } from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [currentTopic, setCurrentTopic] = useState('');

  // Use useEffect to only access the window object after the component mounts
  useEffect(() => {
    // Read the search query from the URL when the component is first rendered
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('search') || ''; // Default to empty string if no search query in URL
    const initialTopic = urlParams.get('topic') || ''; // Get current topic from URL

    setQuery(initialQuery);
    setCurrentTopic(initialTopic);
  }, []); // This will run only once when the component mounts

  const handleSearch = () => {
    // Construct the new URL with both search and topic params
    const newUrl = `/results?search=${encodeURIComponent(query)}${currentTopic ? `&topic=${encodeURIComponent(currentTopic)}` : ''}`;

    // Navigate to the new URL
    window.location.href = newUrl;
  };

  const handleEnterPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <Container>
      <InputGroup>
        <Form.Control
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleEnterPress}
          placeholder="Search..."
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
