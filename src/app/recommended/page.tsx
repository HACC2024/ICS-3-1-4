'use client';

import { useEffect, useState } from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { useSession } from 'next-auth/react';

type Recommendation = {
  id: number;
  persona: string;
  dataset: { id: number; name: string, description: string, topic: string, org: string, orgIcon: string };
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
          <button
            type="button"
            key={rec.dataset.id}
            style={{
              padding: 0,
              border: 'none',
              background: 'none',
              width: '18rem',
              marginLeft: '2rem',
              marginBottom: '2rem',
            }}
            onClick={() => (window.location.href = `/dataset/${rec.dataset.id}`)}
          >
            <Card>
              <Card.Header>
                <Container className="d-flex justify-content-center">
                  <Card.Img
                    variant="top"
                    src={rec.dataset.orgIcon}
                    alt={`${rec.dataset.org} logo`}
                    style={{ maxWidth: '100px', height: 'auto' }}
                  />
                </Container>
                <Card.Title className="pt-3">{rec.dataset.name}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>{rec.dataset.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Card.Text>
                  {rec.dataset.topic}
                </Card.Text>
              </Card.Footer>
            </Card>
          </button>
        ))}
      </Row>
    </Container>
  );
};

export default RecommendationsDisplay;
