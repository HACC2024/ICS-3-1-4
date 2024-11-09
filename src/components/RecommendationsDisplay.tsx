'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

type Recommendation = {
  id: number;
  persona: string;
  dataset: { id: number; name: string }; // Each recommendation has a single dataset
};

const RecommendationsDisplay = ({ persona }: { persona: string }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    async function fetchRecommendations() {
      const res = await fetch(`/api/getRecommendations?persona=${persona}`);
      const data = await res.json();
      console.log('API Response:', data); // Debug log to inspect the data structure
      setRecommendations(data);
    }
    fetchRecommendations();
  }, [persona]);

  return (
    <Container id="landing-page" fluid className="py-3">
      <h1 className="text-contrast">Recommended Datasets:</h1>
      <ul>
        {recommendations.map((rec) => (
          <li key={rec.id}>
            <ul>
              <li key={rec.dataset.id}>
                <Link href={`/dataset/${rec.dataset.id}`}>
                  {rec.dataset.name}
                </Link>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default RecommendationsDisplay;
