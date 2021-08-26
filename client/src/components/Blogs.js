import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const url = "http://localhost:5000/api/blogs";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  // getAllTodo API Integration
  useEffect(async () => {
    const { data } = await axios.get(`${url}`);
    setBlogs(data.blogs);
  }, []);

  return (
    <div>
      <h1 className="center">latest blogs</h1>
      <div className="todo">
        <div className="todo-data">
          {blogs.map((blog, index) => {
            return (
              <>
                <div className="blog my-1">
                  <h2>
                    <Link to={`/blog/${blog.id}`} style={{ color: "#0a9275" }}>
                      {" "}
                      {blog.title}
                    </Link>
                  </h2>
                  <p>{blog.body}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
