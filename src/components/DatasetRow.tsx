// src/components/DatasetRow.tsx

import React from 'react';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';
import Link from 'next/link';

interface Dataset {
  id: string;
  name: string;
  url: string;
  topic: string;
  description: string;
  org: string;
}

interface DatasetRowProps {
  userId: string;
  dataset: Dataset;
  isFavoritesContext: boolean;
  onDatasetDeleted: (datasetId: string) => void;
}

const DatasetRow: React.FC<DatasetRowProps> = ({ userId, dataset, isFavoritesContext, onDatasetDeleted }) => (
  <tr>
    <td>
      <Link href={`/dataset/${dataset.id}`}>
        {dataset.name}
      </Link>
    </td>
    <td>
      <a href={dataset.url} target="_blank" rel="noopener noreferrer">Link</a>
    </td>
    <td>{dataset.topic}</td>
    <td>{dataset.description}</td>
    <td>{dataset.org}</td>
    <td>
      <Link href={`/edit/${dataset.id}`}>Edit</Link>
    </td>
    <td>
      <DeleteButton
        userId={userId}
        isFavoritesContext={isFavoritesContext}
        datasetId={dataset.id}
        onDeleteSuccess={() => onDatasetDeleted(dataset.id)}
      />
    </td>
  </tr>
);

export default DatasetRow;
