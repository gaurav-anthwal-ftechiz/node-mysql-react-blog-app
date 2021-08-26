const pool = require("../db");

// post comments
const postComments = (req, res) => {
  try {
    const blogid = req.params.blogid;
    const userid = req.params.userid;
    const comment = req.body.comment;

    const sql =
      "INSERT INTO comments (comment, userid, blogid) VALUES (?, ?, ?)";
    pool.query(sql, [comment, userid, blogid], (err, result) => {
      if (err) throw err;
      const sql = `SELECT * FROM comments WHERE id = ?`;
      pool.query(sql, result.insertId, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          return res.status(201).json({
            success: true,
            msg: "comment posted",
            comment: result[0],
          });
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
};

// get all comments
const getComments = (req, res) => {
  try {
    const blogid = req.params.blogid;
    const sql = "SELECT * FROM comments WHERE blogid = ? ORDER BY id DESC";
    pool.query(sql, blogid, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { postComments, getComments };
