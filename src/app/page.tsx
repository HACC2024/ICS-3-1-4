// src/app/page.tsx

import dynamic from 'next/dynamic';
import './globals.css';
import { Container } from 'react-bootstrap';

const Explore = dynamic(() => import('@/components/Explore'), { ssr: false });
const TrendingDatasets = dynamic(() => import('@/components/TrendingDatasets'), { ssr: false });

const Home = () => (
  <main>
    <Container fluid className="py-3 home-page-container">
      <Explore />
      <TrendingDatasets />
    </Container>
  </main>
);

export default Home;
