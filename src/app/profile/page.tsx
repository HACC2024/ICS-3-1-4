import { Container } from 'react-bootstrap';
import ProfilePage from '@/components/ProfilePage';
// import NavBar from '@/components/Navbar';

/** The Home page. */
const Profile = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <ProfilePage />
    </Container>
  </main>
);

export default Profile;
