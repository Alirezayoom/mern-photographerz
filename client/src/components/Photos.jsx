import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import classes from "./photos.module.css";

const Photos = () => {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchPhotos = async () => {
      const data = await fetch(
        `http://localhost:5000/api/photos?${searchParams}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            photo: name,
          }),
        }
      );
      const json = await data.json();
      setData(json);
    };

    fetchPhotos();
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
      <div className={classes.photos}>
        {data?.data?.map((photo) => (
          <div key={photo._id} className={classes.card}>
            <div className={classes.photo}>
              <img src={photo.photo} alt="nice shot" />
            </div>

            <div>
              <div className={classes.name}>{photo.name}</div>
              <div className={classes.ownerInfo}>
                <div className={classes.avatar}>
                  <img src={photo.avatar} alt="avatar" />
                </div>
                <div>
                  <div className={classes.owner}>{photo.owner}</div>
                  <div className={classes.publishedAt}>
                    {new Date(photo.publishedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
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

export default Photos;
