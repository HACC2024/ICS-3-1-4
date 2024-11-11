// src/app/favorites/ListFavoriteDatasetsPage.tsx

'use client';

import React from 'react';
import { Container, Row } from 'react-bootstrap';
import DatasetCard from '@/components/DatasetCard';

interface Dataset {
  id: string
  name: string;
  url: string;
  topic: string;
  description: string;
  org: string;
  orgIcon: string;
}

interface ListFavoriteDatasetsPageProps {
  datasets: Dataset[];
}

const ListFavoriteDatasetsPage: React.FC<ListFavoriteDatasetsPageProps> = ({ datasets }) => (
  <main>
    <Container id="dataset-list" fluid className="py-3">
      <h1 className="text-contrast">Favorite Datasets</h1>
      <Row>
        {datasets.map((dataset) => (
          <DatasetCard key={dataset.id} dataset={dataset} />
        ))}
      </Row>
    </Container>
  </main>
);

export default ListFavoriteDatasetsPage;
