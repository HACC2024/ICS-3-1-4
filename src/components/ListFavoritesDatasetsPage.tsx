'use client';

import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DatasetTable from '@/components/DatasetTable';

interface Dataset {
  id: string;
  name: string;
  url: string;
  topic: string;
  description: string;
  org: string;
}

interface ListFavoriteDatasetsPageProps {
  userId: number;
}

const ListFavoriteDatasetsPage: React.FC<ListFavoriteDatasetsPageProps> = ({ userId }) => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);

  // Fetch favorite datasets for the specific user
  const fetchFavoriteDatasets = async () => {
    try {
      const response = await fetch(`/api/user/${userId}/favorites`);
      const data = await response.json();
      setDatasets(data);
    } catch (error) {
      console.error('Error fetching favorite datasets:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchFavoriteDatasets();
    }
  }, [userId]);

  // Delete dataset by ID
  const deleteDataset = async (id: string) => {
    try {
      await fetch(`/api/datasets/${id}`, { method: 'DELETE' });
      setDatasets(datasets.filter(dataset => dataset.id !== id));
    } catch (error) {
      console.error('Error deleting dataset:', error);
    }
  };

  return (
    <main>
      <Container id="dataset-list" fluid className="py-3">
        <Row>
          <Col>
            <h2>Favorite Datasets</h2>
            <DatasetTable datasets={datasets} onDelete={deleteDataset} />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListFavoriteDatasetsPage;
