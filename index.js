const express = require('express');

const Posts = require('./data/db.js');
const postsRouter = require('./data/posts/posts-router.js');

const server = express();

server.use(express.json());
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
