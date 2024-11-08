// src/components/DeleteFavoriteButton.tsx (Client Component)

'use client';

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaTrash } from 'react-icons/fa';

interface DeleteFavoriteButtonProps {
  userId: string;
  datasetId: string;
}

const DeleteFavoriteButton: React.FC<DeleteFavoriteButtonProps> = ({ userId, datasetId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/user/${userId}/favorites/${datasetId}`, { method: 'DELETE' });
      if (response.ok) {
        setShowModal(false);
        // Optionally trigger a page refresh or re-fetch
      } else {
        console.error('Failed to delete favorite dataset');
      }
    } catch (error) {
      console.error('Error deleting favorite dataset:', error);
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
        <Modal.Body>Are you sure you want to delete this dataset from your favorites?</Modal.Body>
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

export default DeleteFavoriteButton;
