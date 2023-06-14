const createPost = (req, res) => {
    // Extract data from the request body
    const { title, content } = req.body;
  
    // Perform desired operations with the data
    // For example, save the data to a database
  
    // Return a response to the client
    res.status(201).json({ message: 'Post created successfully' });
  };
  
  module.exports = {
    createPost,
  };