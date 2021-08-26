const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())


// routes
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/blogs', require('./routes/blogsRoute'))
app.use('/api/comments', require('./routes/commentsRoute'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log('server is running at port ', PORT);
})