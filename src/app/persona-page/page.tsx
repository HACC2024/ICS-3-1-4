'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { updateUserPersona } from '@/lib/dbActions';
import { useRouter } from 'next/navigation';
import { Button, Container, Form, Card, Row, Col, Alert } from 'react-bootstrap';
import swal from 'sweetalert';

const PersonaPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [persona, setPersona] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const personaOptions = [
    { key: 'educator', label: 'Educator' },
    { key: 'researcher', label: 'Researcher' },
    { key: 'communityMember', label: 'Community Member' },
    { key: 'publicInformer', label: 'Public Informer' },
    { key: 'businessDecisionMaker', label: 'Business Decision Maker' },
  ];

  useEffect(() => {
    // Fetch the initial persona from the database via API
    const fetchPersona = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch(`/api/getPersona?email=${session.user.email}`);
          const data = await res.json();
          setPersona(data.persona || null);
        } catch (error) {
          console.error('Error fetching persona:', error);
          setPersona(null); // Handle case where persona is not found or there's an error
        }
      }
    };
    fetchPersona();
  }, [session?.user?.email]);

  const handlePersonaChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPersona = e.target.value;
    setPersona(newPersona);

    // Update persona in the database
    try {
      setIsUpdating(true);
      await updateUserPersona(session?.user?.email as string, newPersona);
      swal('Persona updated successfully!');
    } catch (error) {
      console.error('Failed to update persona:', error);
      swal('Error updating persona.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRetakeQuiz = () => {
    // Redirect to the persona quiz page
    router.push('/persona-quiz');
  };

  return (
    <Container>
      <h1 className="text-contrast mt-3">User Persona</h1>
      <Card className="p-4">
        <Row>
          <Col>
            {persona ? (
              <Alert variant="info">
                <strong>Current Persona: </strong>
                {personaOptions.find((opt) => opt.key === persona)?.label || persona}
              </Alert>
            ) : (
              <Alert variant="warning">No persona assigned.</Alert>
            )}
            <Form.Group controlId="selectPersona">
              <Form.Label>Choose Persona</Form.Label>
              <Form.Select value={persona || ''} onChange={handlePersonaChange} disabled={isUpdating}>
                <option value="" disabled>
                  Select your persona
                </option>
                {personaOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleRetakeQuiz}
              className="mt-3"
              style={{ backgroundColor: 'var(--blue)', border: 'none' }}
            >
              Retake Quiz
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default PersonaPage;
