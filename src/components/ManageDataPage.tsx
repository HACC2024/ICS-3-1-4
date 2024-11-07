'use client';

import React, { useEffect, useState } from 'react';
import { Image, Col, Container, Row, Table } from 'react-bootstrap';
import FileUpload from '@/components/FileUpload';

interface Dataset {
  id: string;
  name: string;
  url: string;
  topic: string;
  description: string;
  org: string;
  orgIcon: string;
}

export default function ManageDataPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);

  // Fetch datasets from the server
  const fetchDatasets = async () => {
    try {
      const response = await fetch('/api/datasets');
      const data = await response.json();
      setDatasets(data);
    } catch (error) {
      console.error('Error fetching datasets:', error);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row className="mb-3">
          <Col>
            <FileUpload onUploadSuccess={fetchDatasets} />
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
                {datasets.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.url}</td>
                    <td>{item.topic}</td>
                    <td>{item.description}</td>
                    <td>{item.org}</td>
                    <td>
                      <Image src={item.orgIcon} alt={`${item.org} logo`} width={50} height={50} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
