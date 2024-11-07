'use client';

import React from 'react';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

interface DatasetRowProps {
  dataset: {
    id: string;
    name: string;
    url: string;
    topic: string;
    description: string;
    org: string;
  };
  onDelete: (id: string) => void;
}

const DatasetRow: React.FC<DatasetRowProps> = ({ dataset, onDelete }) => (
  <tr>
    <td>{dataset.name}</td>
    <td>
      <a href={dataset.url} target="_blank" rel="noopener noreferrer">
        Link
      </a>
    </td>
    <td>{dataset.topic}</td>
    <td>{dataset.description}</td>
    <td>{dataset.org}</td>
    <td>
      <Button variant="danger" onClick={() => onDelete(dataset.id)}>
        <FaTrash />
      </Button>
    </td>
  </tr>
);

export default DatasetRow;
