'use client';

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DatasetTable from './DatasetTable';

interface Dataset {
  id: string;
  name: string;
  url: string;
  topic: string;
  description: string;
  org: string;
}

interface ListFavoriteDatasetsPageProps {
  datasets: Dataset[];
  userId: string;
}

const ListFavoriteDatasetsPage: React.FC<ListFavoriteDatasetsPageProps> = ({ userId, datasets: initialDatasets }) => {
  // Define state for datasets so you can modify it when a dataset is deleted
  const [datasets, setDatasets] = useState<Dataset[]>(initialDatasets);

  // Callback to handle dataset deletion
  const onDatasetDeleted = (deletedDatasetId: string) => {
    setDatasets(datasets.filter(dataset => dataset.id !== deletedDatasetId));
  };

  return (
    <main>
      <Container id="dataset-list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-contrast">Favorite Datasets</h1>
            <DatasetTable
              onDatasetDeleted={onDatasetDeleted} // Pass the callback to DatasetTable
              isFavoritesContext
              userId={userId}
              datasets={datasets}
            />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListFavoriteDatasetsPage;
