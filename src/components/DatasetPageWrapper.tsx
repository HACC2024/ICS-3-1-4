/* eslint-disable max-len */

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Histogram from '@/components/Histogram';
import Scatterplot from '@/components/Scatterplot';
import { addFavoriteDataset, removeFavoriteDataset } from '@/lib/dbActions';

interface Dataset {
  id: number;
  name: string;
  url: string;
  viewCount: number;
  topic: string;
  csvData: Array<{ [key: string]: string | number }>; // Flexible type for csvData
  description: string;
  org: string;
  orgIcon: string;
}

interface DatasetPageWrapperProps {
  dataset: Dataset;
  userId: number; // Assume userId is passed as a prop for now
}

export default function DatasetPageWrapper({ dataset, userId }: DatasetPageWrapperProps) {
  console.log('Received userId:', userId);
  const variables = Array.isArray(dataset.csvData) && dataset.csvData.length > 0 ? Object.keys(dataset.csvData[0]) : [];
  const [chartType, setChartType] = useState<'histogram' | 'scatterplot'>('histogram');
  const [selectedVariable, setSelectedVariable] = useState<string>(variables[0] ?? '');
  const [xVariable, setXVariable] = useState<string>(variables[0] ?? '');
  const [yVariable, setYVariable] = useState<string>(variables[1] ?? '');
  const [chartData, setChartData] = useState<number[]>([]);
  const [scatterData, setScatterData] = useState<Array<[number, number]>>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to handle favorite toggle
  async function handleFavoriteToggle() {
    console.log('Toggling favorite status for userId:', userId, 'datasetId:', dataset.id);
    try {
      if (isFavorite) {
        await removeFavoriteDataset(userId, dataset.id);
      } else {
        await addFavoriteDataset(userId, dataset.id);
      }
      setIsFavorite(!isFavorite); // Toggle the favorite state
    } catch (error) {
      console.error('Failed to update favorite status:', error);
    }
  }

  // Update data based on chart type and selected variables
  useEffect(() => {
    if (chartType === 'histogram') {
      const variableData = dataset.csvData
        .map((item) => parseInt((item[selectedVariable] ?? '') as string, 10))
        .filter((value) => !Number.isNaN(value));
      setChartData(variableData);
    } else if (chartType === 'scatterplot') {
      const scatterPoints: [number, number][] = dataset.csvData
        .map<[number, number]>((item) => [parseFloat((item[xVariable] ?? '') as string), parseFloat((item[yVariable] ?? '') as string)])
        .filter(([x, y]) => !Number.isNaN(x) && !Number.isNaN(y));
      setScatterData(scatterPoints);
    }
  }, [dataset.csvData, chartType, selectedVariable, xVariable, yVariable]);

  return (
    <main className="container dataset-table-container">
      <h2 className="text-center">{dataset.name || 'Untitled Dataset'}</h2>

      {/* Organization Image */}
      <div className="d-flex justify-content-center mb-3">
        <Image
          src={dataset.orgIcon || '/placeholder.png'}
          alt={`${dataset.org || 'Organization'} logo`}
          className="org-icon"
          width={150}
          height={150}
        />
      </div>

      {/* Dataset Information Table */}
      <table className="table table-bordered table-striped">
        <tbody>
          <tr>
            <th scope="row">Organization</th>
            <td>{dataset.org || 'Unknown Organization'}</td>
          </tr>
          <tr>
            <th scope="row">Topic</th>
            <td>{dataset.topic || 'Unknown Topic'}</td>
          </tr>
          <tr>
            <th scope="row">Description</th>
            <td>{dataset.description || 'No description available.'}</td>
          </tr>
          <tr>
            <th scope="row">Views</th>
            <td>{dataset.viewCount || 0}</td>
          </tr>
          <tr>
            <th scope="row">Link</th>
            <td>
              <a href={dataset.url || '#'} target="_blank" rel="noopener noreferrer">
                View External Dataset
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Chart type selector */}
      <div className="chart-type-selector mt-4">
        <label htmlFor="histogram-radio">
          <input
            type="radio"
            id="histogram-radio"
            value="histogram"
            checked={chartType === 'histogram'}
            onChange={() => setChartType('histogram')}
          />
          Histogram
        </label>
        <label htmlFor="scatterplot-radio">
          <input
            type="radio"
            id="scatterplot-radio"
            value="scatterplot"
            checked={chartType === 'scatterplot'}
            onChange={() => setChartType('scatterplot')}
          />
          Scatterplot
        </label>
      </div>

      {/* Variable selection based on chart type */}
      {chartType === 'histogram' && (
        <div className="variable-selector mt-4">
          <label htmlFor="variable-select">
            Select Variable:
            <select id="variable-select" value={selectedVariable} onChange={(e) => setSelectedVariable(e.target.value)}>
              {variables.map((variable) => (
                <option key={variable} value={variable}>
                  {variable}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {chartType === 'scatterplot' && (
        <div className="variable-selectors mt-4">
          <label htmlFor="x-variable-select">
            Select X Variable:
            <select id="x-variable-select" value={xVariable} onChange={(e) => setXVariable(e.target.value)}>
              {variables.map((variable) => (
                <option key={variable} value={variable}>
                  {variable}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="y-variable-select">
            Select Y Variable:
            <select id="y-variable-select" value={yVariable} onChange={(e) => setYVariable(e.target.value)}>
              {variables.map((variable) => (
                <option key={variable} value={variable}>
                  {variable}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {/* Render Histogram or Scatterplot based on chart type */}
      {chartType === 'histogram' && chartData.length > 0 && (
        <div className="histogram-container mt-4 d-flex justify-content-center">
          <Histogram data={chartData} variable={selectedVariable} />
        </div>
      )}
      {chartType === 'scatterplot' && scatterData.length > 0 && (
        <div className="scatterplot-container mt-4 d-flex justify-content-center">
          <Scatterplot data={scatterData} xVariable={xVariable} yVariable={yVariable} />
        </div>
      )}

      {/* Favorite Button */}
      <div className="favorite-section d-flex justify-content-center align-items-center mt-4">
        <span className="me-2">Add to favorites</span>
        <button
          type="button"
          className="favorite-button"
          onClick={handleFavoriteToggle}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isFavorite ? 'red' : 'none'}
            stroke={isFavorite ? 'red' : 'currentColor'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z" />
          </svg>
        </button>
      </div>
    </main>
  );
}
