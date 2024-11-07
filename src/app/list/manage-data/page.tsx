import { getServerSession } from 'next-auth';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import DatasetItem from '@/components/DatasetItem';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

/** Render a list of stuff for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  // const owner = (session && session.user && session.user.email) || '';
  const dataset = await prisma.dataset.findMany();
  // console.log(stuff);
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row className="mb-3">
          <Col>
            <Button href="/upload" className="text-white">Upload Datasets</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>URL</th>
                  <th>Topic</th>
                  <th>Description</th>
                  <th>Organization</th>
                  <th>Icon</th>
                </tr>
              </thead>
              <tbody>
                {dataset.map((item) => (
                  <DatasetItem key={item.id} {...item} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
