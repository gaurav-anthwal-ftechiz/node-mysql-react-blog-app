const router = require("express").Router();
const {
  createBlogs,
  getAllBlogs,
  getUsersBlogs,
  getBlogById,
  deleteBlogById,
  updateBlogById
} = require("../controllers/blogsController");

// post a todo
router.post("/", createBlogs);

// get all blogs
router.get("/", getAllBlogs);

// get users blogs
router.get("/:id", getUsersBlogs);

// get single blog
router.get('/blog/:id',  getBlogById)

// delete blog by id
router.delete('/delete-blog/:id', deleteBlogById)

// update blog by id
router.put('/update-blog/:id', updateBlogById)

module.exports = router;
