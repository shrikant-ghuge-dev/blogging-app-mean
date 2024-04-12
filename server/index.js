require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const userRoute = require('./routes/user')
const commentRoute = require('./routes/comment')
const categoryRoute = require('./routes/category')
const adminRoute = require('./routes/admin')
// To read the body from the requests
const bodyParser = require('body-parser');
const connectToMongoDB = require('./helper/db');
const { allowGetWithoutAuth, verifyAuthorization } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorMiddleware');

// database
connectToMongoDB();

app.use(cors())

app.use(bodyParser.json())

app.use(express.static('upload'))

app.get('/', (req, res) => {
    res.json({ message: "test" })
})

app.use('/api/v1/', allowGetWithoutAuth, commentRoute)

app.use('/api/v1/auth', authRoute)

app.use('/api/v1/post', allowGetWithoutAuth, postRoute)

app.use('/api/v1/user', allowGetWithoutAuth, userRoute)

app.use('/api/v1/category', allowGetWithoutAuth, categoryRoute)

app.use('/api/v1/admin', allowGetWithoutAuth, verifyAuthorization("Admin"), adminRoute)

app.use(errorHandler);

app.listen(process.env.PORT);
