const express = require('express');

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

server.listen(7000, () => {
    console.log('\n*** Server Running on http://localhost:7000 ***\n');
});
