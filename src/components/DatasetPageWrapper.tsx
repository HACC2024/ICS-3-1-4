'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Histogram from '@/components/Histogram';

interface Dataset {
  id: number;
  name: string;
  url: string;
  viewCount: number;
  topic: string;
  jsonPath: string;
  description: string;
  org: string;
  orgIcon: string;
}

interface DatasetPageWrapperProps {
  dataset: Dataset;
}

export default function DatasetPageWrapper({ dataset }: DatasetPageWrapperProps) {
  const [ageData, setAgeData] = useState<number[]>([]);

  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        console.log('Fetching JSON from path:', dataset.jsonPath);
        const response = await fetch(dataset.jsonPath);
        if (!response.ok) {
          console.error(`Failed to fetch JSON from ${dataset.jsonPath}`);
          return;
        }

        const jsonData = await response.json();
        console.log('Fetched JSON Data:', jsonData);
        // For mock visualization
        const ages = jsonData
          .map((item: { AGEP: string }) => {
            const age = parseInt(item.AGEP, 10);
            return age;
          })
          .filter((age: number) => !Number.isNaN(age));

        console.log('Extracted Ages Array:', ages); // Log final ages array
        setAgeData(ages);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    fetchJsonData();
  }, [dataset.jsonPath]);

  return (
    <main className="container dataset-table-container">
      <h2 className="text-center">{dataset.name}</h2>
      <div className="d-flex justify-content-center mb-3">
        <Image src={dataset.orgIcon} alt={`${dataset.org} logo`} className="org-icon" width={150} height={150} />
      </div>
      <table className="table table-bordered table-striped">
        <tbody>
          <tr>
            <th scope="row">Organization</th>
            <td>{dataset.org}</td>
          </tr>
          <tr>
            <th scope="row">Topic</th>
            <td>{dataset.topic}</td>
          </tr>
          <tr>
            <th scope="row">Description</th>
            <td>{dataset.description}</td>
          </tr>
          <tr>
            <th scope="row">Views</th>
            <td>{dataset.viewCount}</td>
          </tr>
          <tr>
            <th scope="row">Link</th>
            <td>
              <a href={dataset.url} target="_blank" rel="noopener noreferrer">
                View External Dataset
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      {ageData.length > 0 && (
        <div className="histogram-container mt-4 d-flex justify-content-center">
          <Histogram data={ageData} />
        </div>
      )}
    </main>
  );
}
