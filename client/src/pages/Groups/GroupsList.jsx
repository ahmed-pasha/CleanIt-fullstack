import React, { useEffect, useState } from 'react';

const GroupsList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch('/api/groups');
      const data = await response.json();
      setGroups(data);
    };
    fetchGroups();
  }, []);

  return (
    <div>
      <h1>Groups</h1>
      <div>
        {groups.map((group) => (
          <div key={group._id}>
            <h2>{group.name}</h2>
            <p>{group.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupsList;

