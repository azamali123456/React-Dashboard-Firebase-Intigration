// React component

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserList = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://your-project-id.cloudfunctions.net/getUsers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserList();
  }, []);

  return { users, loading };
};

export default useFetchUsers;
