'use client';

import React from 'react';
import { Carousel, Card, Row, Col, Container } from 'react-bootstrap';

interface Dataset {
  description: string;
  org: any;
  id: string;
  name: string;
  url: string;
  viewCount: number;
  topic: string;
  orgIcon: string; // Added orgIcon property
}

const TrendingDatasets: React.FC = () => {
  const [datasets, setDatasets] = React.useState<Dataset[]>([]);

  React.useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch('/api/datasets');
        const data = await response.json();
        setDatasets(data);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      }
    };

    fetchDatasets();
  }, []);

  const groupedData = [];
  for (let i = 0; i < datasets.length; i += 3) {
    groupedData.push(datasets.slice(i, i + 3));
  }

  return (
    <div className="trending-section" style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Trending Datasets</h3>
      <Carousel controls indicators={false} interval={5000} pause="hover">
        {groupedData.map((group, groupIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <Carousel.Item key={`group-${groupIndex}`}>
            <Container style={{ minHeight: '250px' }}>
              <Row className="justify-content-center text-center">
                {group.map((item) => (
                  <Col key={item.id} md={group.length === 2 ? 6 : 4}>
                    <button
                      type="button"
                      key={item.id}
                      style={{
                        padding: 0,
                        border: 'none',
                        background: 'none',
                        width: '18rem',
                        marginLeft: '',
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
                          <Card.Text>
                            {item.topic}
                            <br />
                            {item.viewCount}
                            {' '}
                            views
                          </Card.Text>
                        </Card.Footer>
                      </Card>
                    </button>
                  </Col>
                ))}
              </Row>
            </Container>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default TrendingDatasets;
