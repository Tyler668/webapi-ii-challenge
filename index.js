const express = require('express');

const Posts = require('./data/db.js');


const server = express();

server.use(express.json());

// GET ======================================================================================= //
//SERVER
server.get('/', (req, res) => {
  res.send(`
    <h2>API 2 TESTING</h>
    <p>Welcome</p>
  `);
});
// --------------------------------------------------------------------------------------------- //
//POSTS
server.get('/api/posts', (req, res) => {
  Posts.find(req.query)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  });
});

// --------------------------------------------------------------------------------------------- //
//POST BY ID
server.get('/api/posts/:id', (req, res) => {
  Posts.findById(req.params.id)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Hub not found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the post',
    });
  });
});
// --------------------------------------------------------------------------------------------- //
//COMMENT ON POST BY ID
server.get('/api/posts/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Hub not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    });
  });

// POST ======================================================================================= //
// POST POST
server.post('/api/posts', (req, res) => {
  Posts.insert(req.body)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the post',
    });
  });
});

// --------------------------------------------------------------------------------------------- //
//POST COMMENT
server.post('/api/posts/:id', (req, res) => {
    Posts.insertComment(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the comment',
      });
    });
  });

// DELETE ======================================================================================= //
server.delete('/api/posts/:id', (req, res) => {
  Posts.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The post has been nuked' });
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the post',
    });
  });
});

// PUT ======================================================================================= //
server.put('/api/posts/:id', (req, res) => {
  const changes = req.body;
  Posts.update(req.params.id, changes)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the post',
    });
  });
});

// add an endpoint that returns all the messages for a post
// add an endpoint for adding new message to a post

server.listen(7000, () => {
  console.log('\n*** Server Running on http://localhost:7000 ***\n');
});
