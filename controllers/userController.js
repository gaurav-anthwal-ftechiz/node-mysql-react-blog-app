const pool = require("../db");

// login users
const loginUser = (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    pool.query(sql, email, (err, result) => {
      if (err) throw err;
      if (result.length < 1) {
        res.status(400).json({ msg: "user is not registered yet." });
      } else {
        if (result[0].password === password) {
          console.log(result[0].name);
          return res.status(200).json({
            success: true,
            msg: "logged in successfully.",
            user: {
              id: result[0].id,
              name: result[0].name,
              email: result[0].email,
            },
          });
        } else {
          return res
            .status(403)
            .json({ msg: "Invalid Credential.", success: true });
        }
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

// register user
const registerUser = (req, res) => {
  try {
    const { name, email, password } = req.body;

    const sql = "SELECT * FROM users  WHERE email = ?";
    pool.query(sql, email, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        return res.status(400).json({ msg: "user already exists." });
      } else {
        const sql =
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        pool.query(sql, [name, email, password], (err, result) => {
          if (err) throw err;

          pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, result) => {
              return res.status(200).json({
                success: true,
                msg: "user created",
                user: {
                  id: result[0].id,
                  name: result[0].name,
                  email: result[0].email,
                },
              });
            }
          );
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { loginUser, registerUser };
