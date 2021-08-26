import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const url = "http://localhost:5000/api/blogs/blog";
const BlogSingle = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [formData, setFormData] = useState("");
  const [blogsData, setBlogsData] = useState({});
  const [commentsData, setCommentsData] = useState([]);

  useEffect(async () => {
    try {
      const { data } = await axios.get(`${url}/${id}`);
      if (data.blog) {
        setBlogsData(data.blog);
        console.log(data);

        const res = await axios.get(
          `http://localhost:5000/api/comments/${data.blog.id}`
        );
        setCommentsData(res.data);
        console.log(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleGoBack = (e) => {
    history.push("/blogs");
  };

  const postComment = async (e) => {
    e.preventDefault();

    const url = `http://localhost:5000/api/comments`;
    const blogid = blogsData.id;
    const userid = JSON.parse(localStorage.getItem("user")).user.id;

    const { data } = await axios.post(
      `${url}/${blogid}/${userid}`,
      { comment: formData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data.success) {
      setCommentsData([data.comment, ...commentsData]);
      setFormData("");
    }
    console.log(data);
  };
  return (
    <div className="single-blog-page">
      <button onClick={handleGoBack} className="go-back-btn">
        Go Back
      </button>
      <div className="reding-blogs">
        <h1>{blogsData.title}</h1>
        <p>{blogsData.body}</p>
      </div>
      <hr />
      <div className="comment-section">
        <h4>
          {commentsData.length > 0 ? commentsData.length : "No"} Comments in
          this post
        </h4>
        <form onSubmit={postComment}>
          <input
            className="full-input"
            type="text"
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
            placeholder="write your comment..."
          />
        </form>
        <div className="old-comments">
          {commentsData.map((comment, index) => {
            return (
              <p key={index}>
                <span>{index + 1}. </span>
                {comment.comment}
                {/* <span>
                    <i>username</i>
                  </span> */}
              </p>
            );
          })}
        </div>
      </div>
      <div className="footer">
        <p>&copy; copyright 2021</p>
      </div>
    </div>
  );
};

export default BlogSingle;
