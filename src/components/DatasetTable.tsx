// src/components/DatasetTable.tsx (Server Component)

import React from 'react';
import { Table } from 'react-bootstrap';
import DatasetRow from './DatasetRow';

interface Dataset {
  id: string;
  name: string;
  url: string;
  topic: string;
  description: string;
  org: string;
}

interface DatasetTableProps {
  userId: string;
  datasets: Dataset[];
  isFavoritesContext: boolean;
}

const DatasetTable: React.FC<DatasetTableProps> = ({ userId, datasets = [], isFavoritesContext }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Name</th>
        <th>URL</th>
        <th>Topic</th>
        <th>Description</th>
        <th>Organization</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {datasets.map((dataset) => (
        <DatasetRow isFavoritesContext={isFavoritesContext} key={dataset.id} userId={userId} dataset={dataset} />
      ))}
    </tbody>
  </Table>
);

export default DatasetTable;
