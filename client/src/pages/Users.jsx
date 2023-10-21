import { useState, useEffect } from "react";
import classes from "./users.module.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch("http://localhost:5000/api/Users");
      const json = await data.json();
      setUsers(json);
    };
    fetchUsers();
  }, []);

  return (
    <div className={classes.users}>
      {users?.data?.map((user) => (
        <div key={user._id} className={classes.user}>
          <div className={classes.avatar}>
            <img src={user.avatar} alt="avatar" />
          </div>

          <div className={classes.username}>@{user.username}</div>

          <div className={classes.info}>
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
          </div>

          <div className={classes.email}>{user.email}</div>
        </div>
      ))}
    </div>
  );
};

export default Users;
