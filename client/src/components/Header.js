import React, { useState, useEffect } from "react";
import { FaUserCircle, FaTimes } from "react-icons/fa";
import { useHistory, Link } from "react-router-dom";

const Header = ({ auth, setAuth }) => {
  const history = useHistory();
  const userid = JSON.parse(localStorage.getItem("user"))?.user?.id;
  const handleLogout = () => {
    localStorage.clear();
    setAuth(false);
    history.push("/login");
  };
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    setOpen(false)
  },[])
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <nav>
      <div className="nav-content">
        <Link to="/" style={{ color: "#fff" }}>
          <h1>LOGO</h1>
        </Link>
        {auth ? (
          <>
            {!open ? (
              <div className="avatar">
                <FaUserCircle
                  style={{ fontSize: "1.6rem" }}
                  onClick={handleOpen}
                />
              </div>
            ) : (
              open && (
                <>
                  <div className="dropdown-parent">
                    <div className="dropdown-box">
                      <FaTimes
                        className="fa-times"
                        onClick={() => setOpen(!open)}
                      />
                      <div>
                        <p>
                          <span>
                            {
                              JSON.parse(localStorage.getItem("user"))?.user
                                ?.name
                            }
                          </span>
                        </p>
                        <p>
                          <span>
                            {
                              JSON.parse(localStorage.getItem("user"))?.user
                                ?.email
                            }
                          </span>
                        </p>
                        <hr />
                        <Link
                          to="/blogs"
                          className="header-link"
                          style={{ color: "#0933a5" }}
                          onClick={() => setOpen(!open)}
                        >
                          Read Blogs
                        </Link>
                        <hr />

                        <Link
                          to={`/user/${userid}`}
                          className="header-link"
                          style={{ color: "#0933a5" }}
                          onClick={() => setOpen(!open)}
                        >
                          My Blogs
                        </Link>
                        <hr />

                        <button onClick={handleLogout} className="logout-btn">
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="backdrop"
                    onClick={() => setOpen(!open)}
                  ></div>
                </>
              )
            )}
          </>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
