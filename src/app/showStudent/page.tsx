'use client';

import React, { useEffect, useState } from 'react';

function StudentProfile() {
  const [profiles, setProfiles] = useState<{ std_name: string; std_dob: string; }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchProfiles = async () => {
      try {
        const response = await fetch('/api/mysql/student/GetStudent');
        const data = await response.json();

        if (response.ok) {
          setProfiles(data);
        } else {
          setError(data.error || 'Error fetching data');
        }
      } catch (err) {
        setError('Network error: ' + (err as Error).message);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div>
      <h1>Student Profiles</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {profiles.map((profile, index) => (
            <li key={index}>
              {profile.std_name} | {profile.std_dob}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentProfile;
