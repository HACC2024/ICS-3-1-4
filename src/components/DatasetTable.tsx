'use client';

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
  // eslint-disable-next-line react/require-default-props
  onDatasetDeleted?: (datasetId: string) => void; // Add this line
}

const DatasetTable: React.FC<DatasetTableProps> = ({
  userId,
  datasets = [],
  isFavoritesContext,
  onDatasetDeleted = () => {},
}) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Name</th>
        <th>URL</th>
        <th>Topic</th>
        <th>Description</th>
        <th>Organization</th>
        <th>Actions</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {datasets.map((dataset) => (
        <DatasetRow
          key={dataset.id}
          userId={userId}
          dataset={dataset}
          isFavoritesContext={isFavoritesContext}
          onDatasetDeleted={onDatasetDeleted} // Pass the onDatasetDeleted function
        />
      ))}
    </tbody>
  </Table>
);

export default DatasetTable;
