'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import { useSession } from 'next-auth/react';

type Recommendation = {
  id: number;
  persona: string;
  dataset: { id: number; name: string };
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
    return <p>Loading...</p>;
  }

  return (
    <Container id="landing-page" fluid className="py-3">
      <h1 className="text-contrast">Recommended Datasets:</h1>
      <ul>
        {recommendations.map((rec) => (
          <li key={rec.id}>
            <ul>
              <Link href={`/dataset/${rec.dataset.id}`}>
                {rec.dataset.name}
              </Link>
            </ul>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default RecommendationsDisplay;
