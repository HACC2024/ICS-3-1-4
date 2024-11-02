'use client';

import React from 'react';
import { Carousel, Card, Row, Col, Container } from 'react-bootstrap';
import trendingData from '@/data/placeholderData';
import Link from 'next/link';

const TrendingDatasets: React.FC = () => {
  const sortedData = [...trendingData].sort((a, b) => b.viewCount - a.viewCount);

  const groupedData = [];
  for (let i = 0; i < sortedData.length; i += 3) {
    groupedData.push(sortedData.slice(i, i + 3));
  }

  return (
    <div className="trending-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Trending Datasets</h3>
      <Carousel controls indicators={false} interval={5000} pause="hover">
        {groupedData.map((group, groupIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <Carousel.Item key={`group-${groupIndex}`}>
            <Container style={{ minHeight: '250px' }}>
              <Row className="justify-content-center">
                {group.map((item) => (
                  <Col key={item.id} md={group.length === 2 ? 6 : 4}>
                    <Link href={`/dataset/${item.id}`} passHref>
                      <Card style={{ width: '18rem', margin: '0 auto', cursor: 'pointer' }}>
                        <Card.Body>
                          <Card.Title>{item.name}</Card.Title>
                          <Card.Text>{`Placeholder text for ${item.name}`}</Card.Text>
                          <Card.Text>{`Views: ${item.viewCount}`}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
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
