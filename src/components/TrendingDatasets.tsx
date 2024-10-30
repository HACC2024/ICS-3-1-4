'use client';

import React from 'react';
import { Carousel, Card } from 'react-bootstrap';
import trendingData from '@/data/placeholderData';

const TrendingDatasets: React.FC = () => {
  // Sort the data by viewCount in descending order
  const sortedData = [...trendingData].sort((a, b) => b.viewCount - a.viewCount);

  return (
    <div className="trending-section">
      <h3>Trending Datasets</h3>
      <Carousel controls={false} indicators={false} interval={3000} pause="hover">
        {sortedData.map((item) => (
          <Carousel.Item key={item.id}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{`Placeholder text for ${item.name}`}</Card.Text>
                <Card.Text>{`Views: ${item.viewCount}`}</Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default TrendingDatasets;
