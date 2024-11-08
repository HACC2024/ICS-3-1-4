// src/components/DatasetRow.tsx

import React from 'react';
import DeleteFavoriteButton from '@/components/DeleteFavoriteButton';
import DeleteDatasetButton from '@/components/DeleteDatasetButton';

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
}

const DatasetRow: React.FC<DatasetRowProps> = ({ userId, dataset, isFavoritesContext = false }) => (
  <tr>
    <td>{dataset.name}</td>
    <td>
      <a href={dataset.url} target="_blank" rel="noopener noreferrer">Link</a>
    </td>
    <td>{dataset.topic}</td>
    <td>{dataset.description}</td>
    <td>{dataset.org}</td>
    <td>
      {isFavoritesContext ? (
        <DeleteFavoriteButton userId={userId} datasetId={dataset.id} />
      ) : (
        <DeleteDatasetButton datasetId={dataset.id} />
      )}
    </td>
  </tr>
);

export default DatasetRow;
