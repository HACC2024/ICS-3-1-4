// src/components/DeleteDatasetButton.tsx (Client Component)

'use client';

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaTrash } from 'react-icons/fa';

interface DeleteDatasetButtonProps {
  datasetId: string;
  userId: string;
  onDeleteSuccess: () => void;
  isFavoritesContext: boolean; // Determines which delete action to perform
}

const DeleteDatasetButton: React.FC<DeleteDatasetButtonProps> = ({ userId, datasetId, onDeleteSuccess, isFavoritesContext = false }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      const endpoint = isFavoritesContext
        ? `/api/user/${userId}/favorites/${datasetId}`
        : `/api/datasets/${datasetId}`;

      const response = await fetch(endpoint, { method: 'DELETE' });

      if (response.ok) {
        setShowModal(false);
        onDeleteSuccess();
      } else {
        console.error('Failed to delete dataset');
      }
    } catch (error) {
      console.error('Error deleting dataset:', error);
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
          {isFavoritesContext
            ? 'Are you sure you want to delete this dataset from your favorites?'
            : 'Are you sure you want to delete this dataset?'}
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

export default DeleteDatasetButton;
