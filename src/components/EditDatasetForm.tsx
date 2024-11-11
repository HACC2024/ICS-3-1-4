'use client';

// edit/EditDatasetForm.tsx
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
// import { Dataset } from '@prisma/client';
import { EditDatasetSchema } from '@/lib/validationSchemas';
import { editDataset } from '@/lib/dbActions';
import { useState } from 'react';

type EditableDatasetFields = {
  id: number;
  name: string;
  url: string;
  topic: string;
  description: string;
  org: string;
  fileName?: string;
};

const EditDatasetForm = ({ dataset }: { dataset: EditableDatasetFields }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditableDatasetFields>({
    resolver: yupResolver(EditDatasetSchema),
    defaultValues: dataset, // Populate form fields with dataset values
  });

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: EditableDatasetFields) => {
    const formattedData = { ...data, organization: data.org, id: data.id };
    // Prepare FormData for the file, if present
    const formData = new FormData();
    formData.append('data', JSON.stringify(formattedData));
    if (file) {
      formData.append('file', file); // Add the file only if it exists
    }
    // Pass FormData directly to editDataset
    await editDataset(formData);
    swal('Success', 'Your item has been updated', 'success', {
      timer: 2000,
    });
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              defaultValue={dataset.name}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </Form.Group>

          <Form.Group>
            <Form.Label>URL</Form.Label>
            <input
              type="url"
              {...register('url', { required: 'URL is required' })}
              defaultValue={dataset.url}
              className={`form-control ${errors.url ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.url?.message}</div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Topic</Form.Label>
            <input
              type="text"
              {...register('topic', { required: 'Topic is required' })}
              defaultValue={dataset.topic}
              className={`form-control ${errors.topic ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.topic?.message}</div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <input
              type="text"
              {...register('description', { required: 'Description is required' })}
              defaultValue={dataset.description}
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.description?.message}</div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Organization</Form.Label>
            <input
              type="text"
              {...register('org', { required: 'Organization is required' })}
              defaultValue={dataset.org}
              className={`form-control ${errors.org ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.org?.message}</div>
          </Form.Group>

          <Form.Group>
            <Form.Label>File (optional)</Form.Label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="form-control"
            />
            {!file && dataset.fileName && (
              <small className="text-muted">
                Current file:
                {' '}
                {dataset.fileName}
              </small>
            )}
            {!file && !dataset.fileName && (
              <small className="text-muted">(No file selected)</small>
            )}
          </Form.Group>

          <Row className="pt-3">
            <Col>
              <Button type="submit" variant="primary" className="custom-btn">
                Submit
              </Button>
            </Col>
            <Col>
              <Button type="button" variant="warning" onClick={() => reset()} className="float-right" style={{ border: 'none' }}>
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditDatasetForm;
