import Explore from '@/components/Explore';
import TrendingDatasets from '@/components/TrendingDatasets';
import './globals.css';
import { Container } from 'react-bootstrap';
// import NavBar from '@/components/Navbar';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Explore />
      <TrendingDatasets />
    </Container>
  </main>
);

export default Home;
