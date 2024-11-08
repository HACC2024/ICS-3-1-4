'use client';

import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

interface DeleteButtonProps {
  datasetId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ datasetId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await fetch(`/api/datasets/${datasetId}`, { method: 'DELETE' });
      setShowModal(false);
      // Optionally add a callback or state to refresh the list on deletion
    } catch (error) {
      console.error('Failed to delete dataset:', error);
    }
  };

  return (
    <>
      <Button variant="danger" onClick={() => setShowModal(true)}>
        <FaTrash />
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this dataset?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteButton;
