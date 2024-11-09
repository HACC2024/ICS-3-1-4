'use client';

import { useSession } from 'next-auth/react';
import RecommendationsDisplay from '@/components/RecommendationsDisplay';
import Container from 'react-bootstrap/Container';

const RecommendedPage = () => {
  const { data: session } = useSession();
  console.log('Session data:', session);
  const persona = session?.user?.persona || 'defaultPersona';

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <Container id="landing-page" fluid className="py-3">
      <RecommendationsDisplay persona={persona} />
    </Container>
  );
};

export default RecommendedPage;
