'use client';

import React, { useEffect, useState } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import DatasetCard from './DatasetCard';

interface Dataset {
  id: string;
  name: string;
  description: string;
  topic: string;
  org: string;
  orgIcon: string;
  viewCount: number;
}

const TrendingDatasets: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch(`/api/datasets?timestamp=${Date.now()}`, {
          cache: 'no-store',
        });
        const data = await response.json();
        console.log('Fetched datasets:', data);
        setDatasets(data);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      }
    };

    fetchDatasets();
  }, []);

  const topDatasets = datasets
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 6);

  const groupedData = [];
  for (let i = 0; i < topDatasets.length; i += 3) {
    groupedData.push(topDatasets.slice(i, i + 3));
  }

  return (
    <div
      className="trending-section"
      style={{
        marginTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h3
        className="text-contrast"
        style={{ textAlign: 'center', marginBottom: '1rem', color: 'seashell' }}
      >
        Trending Datasets
      </h3>
      <Carousel controls indicators={false} interval={5000} pause="hover">
        {groupedData.map((group) => (
          <Carousel.Item key={group[0]?.id || `group-${Math.random()}`}>
            <Container style={{ minHeight: '250px' }}>
              <Row className="justify-content-center text-center">
                {group.map((dataset) => (
                  <Col key={dataset.id} md={group.length === 2 ? 6 : 4}>
                    <DatasetCard dataset={dataset} />
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
