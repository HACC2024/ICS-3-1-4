'use client';

import { useState } from 'react';

export default function UploadDatasetForm() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name || !url || !topic || !description || !organization) {
      setMessage('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('url', url);
    formData.append('topic', topic);
    formData.append('description', description);
    formData.append('organization', organization);

    try {
      const response = await fetch('/api/upload-dataset', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Dataset uploaded successfully');
        setFile(null);
        setName('');
        setUrl('');
        setTopic('');
        setDescription('');
        setOrganization('');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Failed to upload dataset');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input
        type="text"
        placeholder="Dataset Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Organization"
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
        required
      />
      <input type="file" accept=".csv" onChange={handleFileChange} required />
      <button type="submit">Upload Dataset</button>
      {message && <p>{message}</p>}
    </form>
  );
}
