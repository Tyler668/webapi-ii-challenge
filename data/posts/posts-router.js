const express = require('express');
const Posts = require('../db');
const router = express.Router();

// GET ======================================================================================= //
//GET POSTS

router.get('/', (req, res) => {
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
//GET POST BY ID

router.get('/:id', (req, res) => {
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
// GET COMMENT ON POST BY ID

router.get('/:id/comments', (req, res) => {
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

router.post('/', (req, res) => {

    const post = req.body;

    if (!post.title || !post.content) {
        res.status(400).json({ errorMessage: "Please provide title and content for the post." });
    }

    else {
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
    }

});

// --------------------------------------------------------------------------------------------- //
//POST COMMENT

router.post('/:id/comments', (req, res) => {
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
//DELETE POST

router.delete('/:id', (req, res) => {
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
//PUT POST

router.put('/:id', (req, res) => {
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

module.exports = router;