import dynamic from 'next/dynamic';
import './globals.css';
import { Container } from 'react-bootstrap';

const Explore = dynamic(() => import('@/components/Explore'), { ssr: false });
const TrendingDatasets = dynamic(() => import('@/components/TrendingDatasets'), { ssr: false });

const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Explore />
      <TrendingDatasets />
    </Container>
  </main>
);

export default Home;
