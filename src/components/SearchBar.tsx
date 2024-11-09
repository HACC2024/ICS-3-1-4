'use client';

import React from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchBar = () => {
  // Read the search query from the URL when the component is first rendered
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('search') || ''; // Default to empty string if no search query in URL

  const [query, setQuery] = React.useState(initialQuery);
  const currentTopic = urlParams.get('topic') || ''; // Get current topic from URL
  const currentOrg = urlParams.get('org') || ''; // Get current org from URL

  const handleSearch = () => {
    // Construct the new URL with both search and topic params
    const newUrl = `/results?search=${encodeURIComponent(query)}${
      currentTopic ? `&topic=${encodeURIComponent(currentTopic)}` : ''
    }${
      currentOrg ? `&org=${encodeURIComponent(currentOrg)}` : ''
    }`;

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
      <InputGroup className="mb-3">
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
