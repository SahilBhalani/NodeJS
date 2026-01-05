const express = require('express');
const connectDB = require('./db');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
connectDB();

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', postRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
