import { useState, useEffect } from "react";
import classes from "./users.module.css";
import { useSearchParams } from "react-router-dom";

const Users = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const indentifier = setTimeout(() => {
      const fetchUsers = async () => {
        const data = await fetch(
          `http://localhost:5000/api/users?${searchParams}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              photographer: name,
            }),
          }
        );
        const json = await data.json();
        setData(json);
      };
      fetchUsers();
    }, 500);

    return () => {
      clearTimeout(indentifier);
    };
  }, [name, searchParams]);

  return (
    <div>
      <div
        className="search"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setSearchParams({ page: 1 });
        }}
      >
        <input type="text" placeholder="Search Photographer..." />
      </div>

      <div className={classes.users}>
        {!data.data && <Loading />}
        {data?.data?.map((user) => (
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

      <div className="pagination">
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
          page {+data?.meta?.page} of {+data?.meta?.pageCount}
        </div>
        <button
          disabled={+searchParams.get("page") === data?.meta?.pageCount}
          onClick={() =>
            setSearchParams({ page: +searchParams.get("page") + 1 })
          }
        >
          next
        </button>
        <button
          onClick={() => setSearchParams({ page: +data?.meta?.pageCount })}
        >
          last page
        </button>
      </div>
    </div>
  );
};

export default Users;

const Loading = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      {items?.map(() => (
        <div key={Math.random()} className={`${classes.user}, pulse`}>
          <div
            className={classes.avatar}
            style={{
              width: "150px",
              height: "150px",
              backgroundColor: "#fff2",
            }}
          ></div>

          <div
            className={classes.username}
            style={{ width: "150px", height: "20px", backgroundColor: "#fff2" }}
          ></div>
          <div
            style={{
              width: "150px",
              height: "20px",
              backgroundColor: "#fff2",
              margin: "0 auto",
              borderRadius: "1rem",
            }}
          ></div>
        </div>
      ))}
    </>
  );
};
