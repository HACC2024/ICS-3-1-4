'use client';

import { useState } from 'react';
import { Form, Alert, Button, Col, Container, Card, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { PersonaQuizSchema } from '@/lib/validationSchemas';
import { addPersonaQuizResponse } from '@/lib/dbActions';

const PersonaForm = () => {
  const [persona, setPersona] = useState<string | null>(null);
  const formPadding = 'py-1';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PersonaQuizSchema),
  });

  const onSubmit = async (data: {
    goal: string;
    usage: string;
    comfortLevel: string;
    dataType: string;
    interaction: string;
  }) => {
    // Simple logic to determine persona based on responses
    let assignedPersona = '';
    if (data.goal === 'To educate others') {
      assignedPersona = 'Educator';
    } else if (data.goal === 'To gather information for research') {
      assignedPersona = 'Researcher/Analyst';
    } else if (data.goal === 'To support community initiatives') {
      assignedPersona = 'Community Member';
    }
    // Set the assigned persona in state
    setPersona(assignedPersona);

    try {
      const response = { ...data, email: 'user@example.com', assignedPersona }; // Add missing properties
      await addPersonaQuizResponse(response); // Save the response to the database
      swal('Success!', `You are a ${assignedPersona}!`, 'success');
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error(error);
      swal('Error!', 'Failed to save response. Please try again.', 'error');
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Goal Question */}
            <Row className={formPadding}>
              <Col>
                <Form.Group controlId="formGoal">
                  <Form.Label>What is your primary goal in accessing this data portal?</Form.Label>
                  <Form.Select
                    {...register('goal')}
                    className={`form-control ${errors.goal ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select an option</option>
                    <option value="To educate others">To educate others with reliable data</option>
                    <option value="To gather information for research">To gather information for research</option>
                    <option value="To inform the public">To inform the public or create content</option>
                    <option value="To support community initiatives">To support community initiatives</option>
                  </Form.Select>
                  <div className="invalid-feedback">{errors.goal?.message}</div>
                </Form.Group>
              </Col>
            </Row>

            {/* Data Usage Question */}
            <Row className={formPadding}>
              <Col>
                <Form.Group controlId="formUsage">
                  <Form.Label>How do you intend to use the data?</Form.Label>
                  <Form.Select
                    {...register('usage')}
                    className={`form-control ${errors.usage ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select an option</option>
                    <option value="For research or analysis">For research or analysis</option>
                    <option value="To create lesson plans">To create lesson plans</option>
                    <option value="To support policy decisions">To support policy decisions</option>
                    <option value="For community projects">For community projects</option>
                  </Form.Select>
                  <div className="invalid-feedback">{errors.usage?.message}</div>
                </Form.Group>
              </Col>
            </Row>

            {/* Data Comfort Level Question */}
            <Row className={formPadding}>
              <Col>
                <Form.Group controlId="formComfortLevel">
                  <Form.Label>How comfortable are you with data analysis tools?</Form.Label>
                  <Form.Select
                    {...register('comfortLevel')}
                    className={`form-control ${errors.comfortLevel ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select an option</option>
                    <option value="Very comfortable">Very comfortable – I work with data regularly</option>
                    <option value="Somewhat comfortable">Somewhat comfortable – I have basic data skills</option>
                    <option value="Prefer pre-analyzed information">I prefer pre-analyzed information</option>
                  </Form.Select>
                  <div className="invalid-feedback">{errors.comfortLevel?.message}</div>
                </Form.Group>
              </Col>
            </Row>

            {/* Data Type Question */}
            <Row className={formPadding}>
              <Col>
                <Form.Group controlId="formDataType">
                  <Form.Label>What type of data are you most interested in?</Form.Label>
                  <Form.Select
                    {...register('dataType')}
                    className={`form-control ${errors.dataType ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select an option</option>
                    <option value="Population or demographics">Population or demographics</option>
                    <option value="Economic or financial">Economic or financial data</option>
                    <option value="Environmental data">Environmental data</option>
                  </Form.Select>
                  <div className="invalid-feedback">{errors.dataType?.message}</div>
                </Form.Group>
              </Col>
            </Row>

            {/* Data Interaction Preference */}
            <Row className={formPadding}>
              <Col>
                <Form.Group controlId="formInteraction">
                  <Form.Label>How would you prefer to interact with the data?</Form.Label>
                  <Form.Select
                    {...register('interaction')}
                    className={`form-control ${errors.interaction ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select an option</option>
                    <option value="Detailed datasets">Detailed datasets for download and analysis</option>
                    <option value="Data visualizations">Data visualizations and summaries</option>
                    <option value="Interactive dashboards">Interactive dashboards for exploration</option>
                  </Form.Select>
                  <div className="invalid-feedback">{errors.interaction?.message}</div>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
        {persona ? (
          <Alert variant="success">
            You have been assigned the persona:
            {' '}
            <strong>{persona}</strong>
            !
          </Alert>
        ) : (
          ''
        )}
      </Card>
    </Container>
  );
};

export default PersonaForm;
