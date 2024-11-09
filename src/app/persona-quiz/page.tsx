import PersonaForm from '@/components/PersonaForm';
import { Container } from 'react-bootstrap';

const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <PersonaForm />
    </Container>
  </main>
);

export default Home;
