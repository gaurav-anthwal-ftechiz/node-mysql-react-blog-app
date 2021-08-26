const pool = require("../db");

// create a blog
const createBlogs = (req, res) => {
  try {
    const { title, body, userid } = req.body;

    const sql = "INSERT INTO blogs (title, body, userid) VALUES (?, ?, ?)";
    pool.query(sql, [title, body, userid], (err, result) => {
      if (err) throw err;
      console.log(result.insertId);
      pool.query(
        "SELECT * FROM blogs WHERE id = ?",
        result.insertId,
        (err, result) => {
          if (err) throw err;
          return res.status(201).json({success: true, msg: "blog created", blog: result[0] });
        }
      );
    });
  } catch (err) {
    console.error({ error: "error" + err.message });
    return res.status(400).json({ error: "error occured." });
  }
};

// get all blogs
const getAllBlogs = (req, res, next) => {
  try {
    const sql = "SELECT * FROM blogs ORDER BY id DESC";
    pool.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      return res.status(200).json({ blogs: result });
    });
  } catch (err) {
    console.error(err);
  }
};

// get users blogs
const getUsersBlogs = (req, res) => {
  try {
    const userid = req.params.id;
    const sql = "SELECT * FROM blogs WHERE userid = ? ORDER BY id DESC";
    pool.query(sql, userid, (err, result) => {
      if (err) throw err;
      return res.status(200).json({ blogs: result });
    });
  } catch (err) {
    console.error(err);
  }
};

// get single blog
const getBlogById = async (req, res) => {
  try {
    const blogid = req.params.id;
    const sql = "SELECT * FROM blogs WHERE id = ?";
    pool.query(sql, blogid, (err, result) => {
      if (err) throw err;
      return res.status(200).json({ blog: result[0] });
    });
  } catch (err) {
    console.error(err);
  }
};

// delete blog by id
const deleteBlogById = (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM blogs WHERE id = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    if (result.length < 1) {
      return res.status(400).json({ msg: "blog does not exist with that id" });
    } else {
      const sql = "DELETE FROM blogs WHERE id = ?";
      pool.query(sql, id, (err, result) => {
        if (err) throw err;
        const sql = 'DELETE FROM comments WHERE blogid = ?'
        pool.query(sql, id, (err, result)=>{
          if(err) throw err;
          return res.status(200).json({ success: true, msg: "blog deleted" });

        })
      });
    }
  });
};

// update blog by id
const updateBlogById = (req, res) => {
  const id = req.params.id;
  const { title, body } = req.body;

  const sql = "SELECT * FROM blogs WHERE id = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    if (result.length < 1) {
      return res.status(400).json({ msg: "blog does not exist with that id" });
    } else {
      const sql = "UPDATE blogs SET title = ?, body = ? WHERE id = ?";
      pool.query(sql, [title, body, id], (err, result) => {
        if (err) throw err;
        console.log(result);
        return res.json({success: true, msg: 'blog created successfully.'});
      });
    }
  });
};

module.exports = {
  createBlogs,
  getAllBlogs,
  getUsersBlogs,
  getBlogById,
  deleteBlogById,
  updateBlogById,
};
