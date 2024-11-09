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
    // Temporary count object to track each persona's tally
    const tempCounts = {
      educator: 0,
      researcher: 0,
      communityMember: 0,
      publicInformer: 0,
      businessDecisionMaker: 0,
    };

    // Update counts based on selected options
    if (data.goal === 'To educate others') tempCounts.educator += 1;
    if (data.goal === 'To gather information for research') tempCounts.researcher += 1;
    if (data.goal === 'To support community initiatives') tempCounts.communityMember += 1;
    if (data.goal === 'To inform the public') tempCounts.publicInformer += 1;
    if (data.goal === 'To support strategic decisions') tempCounts.businessDecisionMaker += 1;

    if (data.usage === 'To create lesson plans') tempCounts.educator += 1;
    if (data.usage === 'To create reports') tempCounts.publicInformer += 1;
    if (data.usage === 'To support policy decisions') tempCounts.businessDecisionMaker += 1;
    if (data.usage === 'For community projects') tempCounts.communityMember += 1;
    if (data.usage === 'For school projects and study') tempCounts.researcher += 1;

    if (data.dataType === 'Population or demographics') tempCounts.publicInformer += 1;
    if (data.dataType === 'Economic or financial') tempCounts.businessDecisionMaker += 1;
    if (data.dataType === 'Eductional or academic') tempCounts.educator += 1;
    if (data.dataType === 'Environmental data') tempCounts.communityMember += 1;
    if (data.dataType === 'Health or Social services') tempCounts.researcher += 1;

    if (data.interaction === 'Detailed datasets') tempCounts.researcher += 1;
    if (data.interaction === 'Data visualizations') tempCounts.publicInformer += 1;
    if (data.interaction === 'Interactive dashboards') tempCounts.communityMember += 1;
    if (data.interaction === 'Reports with key insights') tempCounts.businessDecisionMaker += 1;
    if (data.interaction === 'Raw data with filtering') tempCounts.educator += 1;

    const topPersona = Object.entries(tempCounts).reduce((prev, current) => (current[1] > prev[1] ? current : prev))[0];

    setPersona(topPersona);

    try {
      const response = { ...data, email: 'user@example.com', assignedPersona: topPersona };
      await addPersonaQuizResponse(response); // Save response to database
      swal('Success!', `You are a ${topPersona}!`, 'success');
      reset(); // Reset form
    } catch (error) {
      console.error(error);
      swal('Error!', 'Failed to save response. Please try again.', 'error');
    }
  };

  return (
    <Container>
      <h1 className="text-contrast">Persona Quiz</h1>
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
                    <option value="To support strategic decisions">To support strategic decisions in a business or organization</option>
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
                    <option value="For school projects and study">For a school project or personal study.</option>
                    <option value="To create reports">To create reports, articles, or media content.</option>
                    <option value="To create lesson plans">For creating lesson plans or curriculum materials</option>
                    <option value="To support policy decisions">To support policy decisions or government projects</option>
                    <option value="For community projects">To improve local community programs or initiatives.</option>
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
                    <option value="Prefer pre-analyzed information">I’m mostly interested in accessing pre-analyzed information.</option>
                    <option value="Willing to learn">I’d like to learn but am still new to it.</option>
                    <option value="Rely on others to analyze">I rely on others to analyze the data for me.</option>
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
                    <option value="Population or demographics">Population, demographics, or community data</option>
                    <option value="Economic or financial">Economic, business, or financial data.</option>
                    <option value="Eductional or academic">Educational or academic performance data.</option>
                    <option value="Environmental data">Environmental or sustainability data.</option>
                    <option value="Health or Social services">Health or social services data.</option>
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
                    <option value="Detailed datasets">Through detailed datasets I can download and analyze.</option>
                    <option value="Data visualizations">Through data visualizations and summaries.</option>
                    <option value="Interactive dashboards">Through interactive dashboards for easy exploration.</option>
                    <option value="Reports with key insights">Through reports with key insights and recommendations.</option>
                    <option value="Raw data with filtering">Through raw data with filtering options.</option>
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
