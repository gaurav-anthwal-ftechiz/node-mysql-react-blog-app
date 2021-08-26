const router = require('express').Router()
const {postComments, getComments} = require('../controllers/commentsController')

// post comment
router.post('/:blogid/:userid', postComments)


// get comments
router.get('/:blogid', getComments)


module.exports = router;
