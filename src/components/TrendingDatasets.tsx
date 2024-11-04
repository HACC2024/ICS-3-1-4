'use client';

import React from 'react';
import { Carousel, Card, Row, Col, Container } from 'react-bootstrap';
import Link from 'next/link';

interface Dataset {
  id: string;
  name: string;
  url: string;
  viewCount: number;
  topic: string;
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
                    <Link href={`/dataset/${item.id}`} passHref>
                      <Card style={{ width: '18rem', margin: '0 auto', cursor: 'pointer' }}>
                        <Card.Body>
                          <Card.Title>{item.name.length > 20 ? `${item.name.substring(0, 20)}...` : item.name}</Card.Title>
                          <Card.Text>{`Topic: ${item.topic}`}</Card.Text>
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
