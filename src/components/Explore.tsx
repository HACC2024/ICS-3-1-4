'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SearchBar from './SearchBar';

const Explore = () => {
  const router = useRouter();

  const handleTopicFilterClick = (topic: string) => {
    const urlParams = new URLSearchParams();
    urlParams.set('topic', topic);
    router.push(`/results?${urlParams.toString()}`);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} className="mx-auto text-center">
          <Image
            src="/Logo.png"
            alt="Aloha Archives Logo"
            width={500}
            height={450}
            layout="fixed" // or "intrinsic" or "responsive"
          />
        </Col>
      </Row>
      <Row>
        <Col md={8} className="mx-auto">
          <SearchBar />
        </Col>
      </Row>
      <Row>
        <Col md={8} className="mx-auto d-flex justify-content-center">
          <Button type="button" onClick={() => handleTopicFilterClick('Health')} className="filter-button mx-2">
            Health
          </Button>
          <Button type="button" onClick={() => handleTopicFilterClick('Transportation')} className="filter-button mx-2">
            Transportation
          </Button>
          <Button type="button" onClick={() => handleTopicFilterClick('Demographics')} className="filter-button mx-2">
            Demographics
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Explore;
