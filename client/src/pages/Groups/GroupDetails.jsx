import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GroupDetails = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      const response = await fetch(`/api/groups/${id}`);
      const data = await response.json();
      setGroup(data);
    };
    fetchGroupDetails();
  }, [id]);

  if (!group) return <p>Loading...</p>;

  return (
    <div>
      <h1>{group.name}</h1>
      <p>{group.description}</p>
      <p>Members: {group.members.length}</p>
    </div>
  );
};

export default GroupDetails;
 
