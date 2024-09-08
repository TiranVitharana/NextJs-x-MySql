"use client"
import { useState } from 'react';

const AddStudent = () => {
  const [std_id, setStdId] = useState('');
  const [std_name, setStdName] = useState('');
  const [std_ydob, setStdDob] = useState('');
  const [std_address, setStdAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the data object
    const studentData = { std_id, std_name, std_ydob, std_address };
    console.log('studentData:', studentData);

    try {
      // Send the data to the API
      const res = await fetch('/api/mysql/student/AddStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('Student added successfully');
        // Clear the form
        setStdId('');
        setStdName('');
        setStdDob('');
        setStdAddress('');
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${message}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Student ID:</label>
          <input className='border border-gray-500 p-1'
            type="text"
            value={std_id}
            onChange={(e) => setStdId(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input className='border border-gray-500 p-1'
            type="text"
            value={std_name}
            onChange={(e) => setStdName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Date of Birth:</label>
          <input className='border border-gray-500 p-1'
            type="date"
            value={std_ydob}
            onChange={(e) => setStdDob(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Address:</label>
          <input className='border border-gray-500 p-1'
            type="text"
            value={std_address}
            onChange={(e) => setStdAddress(e.target.value)}
            required
          />
        </div>
        <button className='border border-gray-500 p-1' type="submit">Add Student</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddStudent;