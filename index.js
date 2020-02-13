const express = require('express');
require('dotenv').config();
const cors = require('cors');
const postsRouter = require('./data/posts/posts-router.js');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/posts', postsRouter);

//SERVER
server.get('/', (req, res) => {
    res.send(`
    <h2>API 2 TESTING</h>
    <p>Welcome</p>
  `);
});

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
