import React from 'react';
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

const ListFavoriteDatasetsPage: React.FC<ListFavoriteDatasetsPageProps> = ({ userId, datasets }) => (
  <main>
    <Container id="dataset-list" fluid className="py-3">
      <Row>
        <Col>
          <h2>Favorite Datasets</h2>
          <DatasetTable isFavoritesContext userId={userId} datasets={datasets} />
        </Col>
      </Row>
    </Container>
  </main>
);

export default ListFavoriteDatasetsPage;
