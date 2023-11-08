// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

// Create express app
const app = express();

// Enable CORS
app.use(cors());

// Parse body of incoming requests
app.use(bodyParser.json());

// Create comments object
const commentsByPostId = {};

// Create route to return comments for a given post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create route to add a new comment to a post
app.post('/posts/:id/comments', (req, res) => {
  // Create a random ID for the comment
  const commentId = randomBytes(4).toString('hex');

  // Get the comment content from the request body
  const { content } = req.body;

  // Get the comments for the post
  const comments = commentsByPostId[req.params.id] || [];

  // Add the new comment to the comments array
  comments.push({ id: commentId, content });

  // Update the comments object
  commentsByPostId[req.params.id] = comments;

  // Send back the new comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});