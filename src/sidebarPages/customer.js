import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import useFetchUsers from '../api/users';

const Customers = () => {
  const { users, loading } = useFetchUsers();
 console.log(users,"users")
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#0d6efd",
  };

  return (
    <div>
      {loading ? (
        <ClipLoader
          loading={true}
          cssOverride={override}
          size={50}
          MoonLoader={30}
          RotateLoader={15}
        />
      ) : (
        <div>
          <h1>User List</h1>
          <ul>
            {users.map(user => (
              <li key={user.uid}>{user.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Customers;
