'use client';

import React from 'react';
import { Carousel, Card, Row, Col, Container } from 'react-bootstrap';
import trendingData from '@/data/placeholderData';

const TrendingDatasets: React.FC = () => {
  // Sort the data by viewCount in descending order
  const sortedData = [...trendingData].sort((a, b) => b.viewCount - a.viewCount);

  // Group the sorted data into arrays of 3 for each carousel item
  const groupedData = [];
  for (let i = 0; i < sortedData.length; i += 3) {
    groupedData.push(sortedData.slice(i, i + 3));
  }

  return (
    <div className="trending-section" style={{ display: 'flex', justifyContent: 'center' }}>
      <h3 style={{ textAlign: 'center' }}>Trending Datasets</h3>
      <Carousel controls indicators={false} interval={3000} pause="hover">
        {groupedData.map((group, index) => (
          <Carousel.Item key={index}>
            <Container>
              <Row className="justify-content-center">
                {group.map((item) => (
                  <Col key={item.id} md={4}>
                    <Card style={{ width: '18rem', margin: '0 auto' }}>
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{`Placeholder text for ${item.name}`}</Card.Text>
                        <Card.Text>{`Views: ${item.viewCount}`}</Card.Text>
                      </Card.Body>
                    </Card>
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
