import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Anm.css"; // Import the external CSS file

const Anm = () => {
  const [content, setContent] = useState({
    title: "",
    genre: "",
    rating: "",
    description: "",
    language: "",
    imgVertical: "",
    imgHorizontal: "",
    type: "movie", // Default to "movie"
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [nextId, setNextId] = useState(1); // To track the next ID to use

  useEffect(() => {
    const endpoint = `${import.meta.env.VITE_API_URL}/${content.type}`;
    axios
      .get(endpoint)
      .then((res) => {
        const items = res.data;
        const maxId = items.reduce((max, item) => Math.max(max, parseInt(item.id, 10)), 0);
        setNextId(maxId + 1);
      })
      .catch((err) => {
        // console.error(`Error fetching ${content.type}:`, err);
        // setError(`Failed to fetch existing ${content.type}.`);
      });
  }, [content.type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const endpoint = `${import.meta.env.VITE_API_URL}/${content.type}`;
    const { type, ...contentData } = { ...content, id: nextId.toString(), rating: parseFloat(content.rating) };

    axios
      .post(endpoint, contentData)
      .then(() => {
        setSuccess(true);
        setError(null);
        setContent({
          title: "",
          genre: "",
          rating: "",
          description: "",
          language: "",
          imgVertical: "",
          imgHorizontal: "",
          type: "movie",
        });
        setNextId((prevId) => prevId + 1);
      })
      .catch((err) => {
        console.error(`Error adding to ${content.type}:`, err);
        setError(`Failed to add ${content.type}. Please try again.`);
      });
  };

  return (
    <div className="full">
      <div className="con">
        <h2>Add New Movie or Web Series</h2>
        <form onSubmit={handleSubmit}>
          <div className="fg">
            <label>Type</label>
            <select name="type" value={content.type} onChange={handleChange} required>
              <option value="movie">Movie</option>
              <option value="webseries">Web Series</option>
            </select>
          </div>
          <div className="fg">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={content.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="fg">
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              value={content.genre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="fg">
            <label>Rating</label>
            <input
              type="number"
              name="rating"
              value={content.rating}
              onChange={handleChange}
              step="0.1"
              required
            />
          </div>
          <div className="fg">
            <label>Description</label>
            <textarea
              name="description"
              value={content.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="fg">
            <label>Language</label>
            <input
              type="text"
              name="language"
              value={content.language}
              onChange={handleChange}
              required
            />
          </div>
          <div className="fg">
            <label>Vertical Image URL</label>
            <input
              type="text"
              name="imgVertical"
              value={content.imgVertical}
              onChange={handleChange}
              required
            />
          </div>
          <div className="fg">
            <label>Horizontal Image URL</label>
            <input
              type="text"
              name="imgHorizontal"
              value={content.imgHorizontal}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btna" type="submit">Add Content</button>
        </form>
        {success && <p className="message success">Content added successfully!</p>}
        {error && <p className="message error">{error}</p>}
      </div>
    </div>
  );
};

export default Anm;

