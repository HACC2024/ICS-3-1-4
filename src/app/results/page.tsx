/* eslint-disable max-len */

'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, Col, Container, Row } from 'react-bootstrap';

const SearchBar = dynamic(() => import('@/components/SearchBar'), { ssr: false });

const ResultsPage = () => {
  const [isOpen1, setIsOpen1] = useState(true);
  // const [isOpen2, setIsOpen2] = useState(true);
  // const [isOpen3, setIsOpen3] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [, setDatasets] = useState<{ name: string; topic: string; id: number; url: string; viewCount: number }[]>([]);

  const toggleMenu1 = () => setIsOpen1(!isOpen1);
  // const toggleMenu2 = () => setIsOpen2(!isOpen2);
  // const toggleMenu3 = () => setIsOpen3(!isOpen3);

  const filterResults = (query: string, datasets: any[], topic: string) => {
    const lowercasedQuery = query.toLowerCase();
    const results = datasets.filter(
      (item) => (item.name.toLowerCase().includes(lowercasedQuery) || item.topic.toLowerCase().includes(lowercasedQuery))
      && (topic ? item.topic === topic : true),
    );
    setFilteredResults(results);
  };

  const fetchDatasets = async (query: string, topic: string) => {
    try {
      const response = await fetch('/api/datasets');
      const data = await response.json();
      setDatasets(data);
      filterResults(query, data, topic);
    } catch (error) {
      console.error('Failed to fetch datasets:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('search') || '';
        const topicFromURL = urlParams.get('topic') || '';
        setSelectedTopic(topicFromURL);
        await fetchDatasets(query, topicFromURL);
      }
    };
    fetchData();
  }, []);

  const handleTopicFilter = (topic: string) => {
    const newTopic = selectedTopic === topic ? '' : topic;
    setSelectedTopic(newTopic);

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (newTopic) {
        urlParams.set('topic', newTopic);
      } else {
        urlParams.delete('topic');
      }
      window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    }

    const query = new URLSearchParams(window.location.search).get('search') || '';
    fetchDatasets(query, newTopic);
  };

  return (
    <main>
      <Container>
        <Row className="mt-5 mb-5">
          {/* Filters Sidebar */}
          <Col md={3} className="mx-auto bg-light">
            <Container className="mt-1">
              <Row>
                <h2 className="text-center">Filters</h2>
              </Row>

              {/* Topic Filter */}
              <Row className="mb-3">
                <button type="button" onClick={toggleMenu1} className="btn btn-primary" id="filterMenu">
                  {isOpen1 ? 'Hide Topics' : 'Show Topics'}
                </button>
                {isOpen1 && (
                  <ul className="list-group mt-2">
                    <button type="button" id="resultsFilterButton" className={`list-group-item ${selectedTopic === 'Health' ? 'active' : ''}`} onClick={() => handleTopicFilter('Health')}>
                      Health
                    </button>
                    <button type="button" id="resultsFilterButton" className={`list-group-item ${selectedTopic === 'Transportation' ? 'active' : ''}`} onClick={() => handleTopicFilter('Transportation')}>
                      Transportation
                    </button>
                    <button type="button" id="resultsFilterButton" className={`list-group-item ${selectedTopic === 'Demographics' ? 'active' : ''}`} onClick={() => handleTopicFilter('Demographics')}>
                      Demographics
                    </button>
                  </ul>
                )}
              </Row>

              {/* Other Filters */}
              {/* Remaining code unchanged... */}
            </Container>
          </Col>

          {/* Results Area */}
          <Col md={9} className="mx-auto">
            <Row>
              <SearchBar />
            </Row>
            <Row>
              <h1 className="ms-3">Results</h1>
            </Row>
            <Row>
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    style={{ padding: 0, border: 'none', background: 'none', width: '18rem', marginLeft: '2rem', marginBottom: '2rem' }}
                    onClick={() => (window.location.href = `/dataset/${item.id}`)}
                  >
                    <Card>
                      <Card.Header>
                        <Container className="d-flex justify-content-center">
                          <Card.Img variant="top" src={item.orgIcon} alt={`${item.org} logo`} style={{ maxWidth: '100px', height: 'auto' }} />
                        </Container>
                        <Card.Title className="pt-3">{item.name}</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>{item.description}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <Card.Text>{item.topic}</Card.Text>
                      </Card.Footer>
                    </Card>
                  </button>
                ))
              ) : (
                <p>No results found.</p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ResultsPage;
