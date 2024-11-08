import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

interface DatasetRowProps {
  dataset: {
    id: string;
    name: string;
    url: string;
    topic: string;
    description: string;
    org: string;
  };
  onDelete: (id: string) => void;
}

const DatasetRow: React.FC<DatasetRowProps> = ({ dataset, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    onDelete(dataset.id);
    setShowModal(false);
  };

  return (
    <>
      <tr>
        <td>{dataset.name}</td>
        <td>
          <a href={dataset.url} target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </td>
        <td>{dataset.topic}</td>
        <td>{dataset.description}</td>
        <td>{dataset.org}</td>
        <td>
          <Button variant="danger" onClick={() => setShowModal(true)}>
            <FaTrash />
          </Button>
        </td>
      </tr>

      {/* Modal for confirming delete action */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the dataset
          {' '}
          <strong>{dataset.name}</strong>
          {' '}
          from your favorites?
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

export default DatasetRow;
