'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, Col, Container, Row } from 'react-bootstrap';

const SearchBar = dynamic(() => import('@/components/SearchBar'), { ssr: false });

const ResultsPage = () => {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [orgs, setOrgs] = useState<string[]>([]);

  const toggleMenu1 = () => setIsOpen1(!isOpen1);
  const toggleMenu2 = () => setIsOpen2(!isOpen2);

  const fetchTopics = async () => {
    try {
      const response = await fetch('/api/topics');
      const data = await response.json();
      setTopics(data);
    } catch (error) {
      console.error('Failed to fetch topics:', error);
    }
  };

  const fetchOrgs = async () => {
    try {
      const response = await fetch('/api/orgs');
      const data = await response.json();
      console.log('Fetched organizations:', data); // Added logging to inspect org data
      setOrgs(data);
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
    }
  };

  const filterResults = (query: string, datasets: any[], topic: string, org: string) => {
    const lowercasedQuery = query.toLowerCase();
    const results = datasets.filter(
      (item) => (item.name.toLowerCase().includes(lowercasedQuery)
          || item.topic.toLowerCase().includes(lowercasedQuery))
        && (topic ? item.topic === topic : true)
        && (org ? item.org === org : true),
    );
    setFilteredResults(results);
  };

  const fetchDatasets = async (query: string, topic: string, org: string) => {
    try {
      const response = await fetch('/api/datasets');
      const data = await response.json();
      filterResults(query, data, topic, org);
    } catch (error) {
      console.error('Failed to fetch datasets:', error);
    }
  };

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
    fetchDatasets(query, newTopic, selectedOrg);
  };

  const handleOrgFilter = (org: string) => {
    const newOrg = selectedOrg === org ? '' : org;
    setSelectedOrg(newOrg);

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (newOrg) {
        urlParams.set('org', newOrg);
      } else {
        urlParams.delete('org');
      }
      window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    }

    const query = new URLSearchParams(window.location.search).get('search') || '';
    const topicFromURL = new URLSearchParams(window.location.search).get('topic') || '';
    fetchDatasets(query, topicFromURL, newOrg);
  };

  useEffect(() => {
    fetchTopics();
    fetchOrgs();

    const fetchData = async () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('search') || '';
        const topicFromURL = urlParams.get('topic') || '';
        const orgFromURL = urlParams.get('org') || '';
        setSelectedTopic(topicFromURL);
        setSelectedOrg(orgFromURL);
        await fetchDatasets(query, topicFromURL, orgFromURL);
      }
    };

    fetchData();
  }, []); // Only runs once, on mount

  return (
    <main>
      <Container>
        <Row className="mt-5 mb-5">
          {/* Filters Sidebar */}
          <Col md={3} className="mx-auto bg-light filter-height">
            <Container className="mt-2">
              <Row>
                <h2 className="text-center">Filters</h2>
              </Row>

              {/* Topic Filter */}
              <Row className="mb-3">
                <button type="button" onClick={toggleMenu1} className="btn btn-primary" id="filterMenu">
                  {isOpen1 ? 'Hide Topics' : 'Show Topics'}
                </button>
                {isOpen1 && (
                  <ul className="list-group mt-2 pe-0">
                    {topics.map((topic) => (
                      <button
                        type="button"
                        id="resultsFilterButton"
                        key={topic}
                        className={`list-group-item ${selectedTopic === topic ? 'active' : ''}`}
                        onClick={() => handleTopicFilter(topic)}
                      >
                        {topic}
                      </button>
                    ))}
                  </ul>
                )}
              </Row>

              {/* Organization Filter */}
              <Row className="mb-3">
                <button type="button" onClick={toggleMenu2} className="btn btn-primary" id="filterMenu">
                  {isOpen2 ? 'Hide Organizations' : 'Show Organizations'}
                </button>
                {isOpen2 && (
                  <ul className="list-group mt-2 pe-0">
                    {orgs.length > 0 ? (
                      orgs.map((org) => (
                        <button
                          type="button"
                          id="resultsFilterButton"
                          key={org}
                          className={`list-group-item ${selectedOrg === org ? 'active' : ''}`}
                          onClick={() => handleOrgFilter(org)}
                        >
                          {org}
                        </button>
                      ))
                    ) : (
                      <li className="list-group-item">No organizations available</li>
                    )}
                  </ul>
                )}
              </Row>
            </Container>
          </Col>

          {/* Results Area */}
          <Col md={9} className="mx-auto">
            <Row>
              <SearchBar />
            </Row>
            <Row>
              <h1 className="ms-3 text-contrast">Results</h1>
            </Row>
            <Row>
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    style={{
                      padding: 0,
                      border: 'none',
                      background: 'none',
                      width: '18rem',
                      marginLeft: '2rem',
                      marginBottom: '2rem',
                    }}
                    onClick={() => (window.location.href = `/dataset/${item.id}`)}
                  >
                    <Card>
                      <Card.Header>
                        <Container className="d-flex justify-content-center">
                          <Card.Img
                            variant="top"
                            src={item.orgIcon}
                            alt={`${item.org} logo`}
                            style={{ maxWidth: '100px', height: 'auto' }}
                          />
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
                <p className="ps-5 text-contrast">No results found.</p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ResultsPage;
