import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const [state, setState] = useState({
    title: "",
    body: "",
    usersBlog: [],
    isUpdate: false,
    blogId: "",
  });
  const { title, body } = state;

  useEffect(() => {
    getUsersBlogs();
  }, []);

  const getUsersBlogs = async () => {
    try {
      const userid = JSON.parse(localStorage.getItem("user")).user.id;
      const url = `http://localhost:5000/api/blogs/${userid}`;

      const { data } = await axios.get(url);
      setState({ ...state, usersBlog: data.blogs });
    } catch (err) {
      console.error(err);
    }
  };

  const createPost = async (e) => {
    try {
      e.preventDefault();
      const userid = JSON.parse(localStorage.getItem("user")).user.id;
      const url = "http://localhost:5000/api/blogs";
      const blogInfo = {
        title,
        body,
        userid,
      };
      const { data } = await axios.post(url, blogInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.success) {
        setState({...state, usersBlog: [data.blog, ...state.usersBlog], title: '', body: ''})
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const url = "http://localhost:5000/api/blogs/delete-blog";
    const { data } = await axios.delete(`${url}/${id}`);
    if (data.success) {
      setState({
        ...state,
        usersBlog: state.usersBlog.filter((blog) => blog.id !== id),
      });
    }
  };

  const handleSetUpdatefield = (id, title, body) => {
    setState({ ...state, isUpdate: true, blogId: id, title, body });

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  const handleUpdate = async (id) => {
    const url = "http://localhost:5000/api/blogs/update-blog";

    const blogInfo = {
      title: state.title,
      body: state.body,
    };
    const { data } = await axios.put(`${url}/${id}`, blogInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.success) {
      setState({
        ...state,
        title: "",
        body: "",
        blogId: "",
        isUpdate: false,
      });
    }
  };
  return (
    <div className="profile-page">
      <form className="blog-post">
        {state.isUpdate && <p className="center">Blog id {state.blogId}</p>}
        <label className="mx-3">blog Title</label>
        <div className="form-control">
          <input
            type="text"
            value={state.title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            placeholder="Enter title"
          />
        </div>
        <br />
        <br />
        <label className="mx-3">Blog body</label>
        <div className="form-control">
          <textarea
            onChange={(e) => setState({ ...state, body: e.target.value })}
            value={state.body}
            placeholder="Enter Blog..."
          />
        </div>
        <br />
        <br />
        {state.isUpdate ? (
          <button type="button" onClick={() => handleUpdate(state.blogId)}>
            Update post
          </button>
        ) : (
          <button type="button" onClick={createPost}>
            Create New Post
          </button>
        )}
      </form>

      <hr />
      <h3>Your Blogs</h3>

      {state.usersBlog.map((blog) => {
        return (
          <>
            <div className="blog my-1" key={blog.id}>
              <h2>
                <Link
                  to={`/blog/${blog.id}`}
                  style={{ color: "teal", textDecoration: "none" }}
                >
                  {" "}
                  {blog.title}
                </Link>
              </h2>
              <p>{blog.body}</p>
              <div className="blog-actions">
                <button
                  onClick={() => handleDelete(blog.id)}
                  type="button"
                  className="btn btn-red"
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    handleSetUpdatefield(blog.id, blog.title, blog.body)
                  }
                  type="button"
                  className="btn btn-yellow"
                >
                  Update
                </button>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Profile;
