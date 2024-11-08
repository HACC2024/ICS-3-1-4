import React from 'react';
import { Table } from 'react-bootstrap';
import DatasetRow from './DatasetRow';

interface DatasetTableProps {
  datasets: {
    id: string;
    name: string;
    url: string;
    topic: string;
    description: string;
    org: string;
  }[];
  onDelete: (id: string) => void;
}

const DatasetTable: React.FC<DatasetTableProps> = ({ datasets, onDelete }) => (
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
        <DatasetRow key={dataset.id} dataset={dataset} onDelete={onDelete} />
      ))}
    </tbody>
  </Table>
);

export default DatasetTable;
