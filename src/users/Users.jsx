import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const usersList = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      setUsers(usersList.data);
    };

    loadUsers();
  }, []);

  return (
    <div>
      {users &&
        users.map((user) => (
          <div key={user.id} data-testid="user-item">
            {user.name}
          </div>
        ))}
    </div>
  );
};

export default Users;
