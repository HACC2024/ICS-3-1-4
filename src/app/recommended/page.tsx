// src/app/recommendations/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import DatasetCard from '@/components/DatasetCard';

type Recommendation = {
  id: number;
  persona: string;
  dataset: { id: string; name: string; description: string; topic: string; org: string; orgIcon: string };
};

const RecommendationsDisplay = () => {
  const { data: session } = useSession();
  const [persona, setPersona] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPersonaAndRecommendations() {
      if (!session?.user?.email) {
        console.error('User email not found in session');
        setLoading(false);
        return;
      }

      if (persona) {
        console.log(`Current persona: ${persona}`);
      }

      try {
        // Step 1: Fetch the current user's persona
        const personaResponse = await fetch(`/api/getPersona?email=${session.user.email}`);
        const personaData = await personaResponse.json();

        if (!personaData.persona) {
          console.error('Persona not found');
          setLoading(false);
          return;
        }

        const currentPersona = personaData.persona;
        setPersona(currentPersona);

        // Step 2: Fetch recommendations based on the persona
        const recommendationsResponse = await fetch(`/api/getRecommendations?persona=${currentPersona}`);
        const recommendationsData = await recommendationsResponse.json();

        console.log('API Response for persona:', currentPersona, recommendationsData); // Debug log
        setRecommendations(recommendationsData);
      } catch (error) {
        console.error('Error fetching persona or recommendations:', error);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchPersonaAndRecommendations();
    }
  }, [session, persona]);

  if (loading) {
    return <p className="text-contrast">Loading...</p>;
  }

  return (
    <Container id="landing-page" fluid className="py-3">
      <h1 className="text-contrast">Recommended Datasets:</h1>
      <Row>
        {recommendations.map((rec) => (
          <DatasetCard key={rec.dataset.id} dataset={rec.dataset} />
        ))}
      </Row>
    </Container>
  );
};

export default RecommendationsDisplay;
