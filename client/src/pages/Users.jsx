import { useState, useEffect } from "react";
import classes from "./users.module.css";
import { useSearchParams } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch(
        `http://localhost:5000/api/Users/?${searchParams}`
      );
      const json = await data.json();
      setUsers(json);
    };
    fetchUsers();
  }, [searchParams, setSearchParams]);

  return (
    <div>
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
      <div className={classes.pagination}>
        <button onClick={() => setSearchParams({ page: 1 })}>first page</button>
        <button
          disabled={+searchParams.get("page") === 1}
          onClick={() =>
            setSearchParams({ page: +searchParams.get("page") - 1 })
          }
        >
          prev
        </button>
        <div>
          page {+users?.meta?.page} of {+users?.meta?.pageCount}
        </div>
        <button
          disabled={+searchParams.get("page") === users?.meta?.pageCount}
          onClick={() =>
            setSearchParams({ page: +searchParams.get("page") + 1 })
          }
        >
          next
        </button>
        <button
          onClick={() => setSearchParams({ page: +users?.meta?.pageCount })}
        >
          last page
        </button>
      </div>
    </div>
  );
};

export default Users;
