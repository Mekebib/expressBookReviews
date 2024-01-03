const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    return username && typeof username === 'string';//returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    return !!user; // Returns boolean
};

//only registered users can login
regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (isValid(username)) {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        // Generate JWT token
        const accessToken = jwt.sign({ username: user.username }, "access", { expiresIn: "1h" });
  
        // Store token in session
        req.session.authorization = { accessToken };
  
        return res.status(200).json({ message: "Login successful", accessToken });
      } else {
        return res.status(403).json({ message: "Invalid credentials" });
      }
    }
    return res.status(404).json({ message: "Invalid username" });
  });
  
  // Function to check if a username already exists
  const doesExist = (username) => {
    return users.some(u => u.username === username);
  };

// Add a book review
// ...

// PUT route for adding or modifying a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    try {
      const isbn = req.params.isbn;
      const username = req.user.username;
  
      if (!isValid(username)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      // Assuming you are sending review data in the request body
      const { rating, comment } = req.body;
  
      // Validate the review data
      if (!rating || !comment) {
        return res.status(400).json({ message: "Invalid review data" });
      }
  
      // Create or update the review for the given ISBN and username
      books[isbn].reviews[username] = { rating, comment};
  
      return res.status(200).json({ message: "Review added/modified successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
// Assuming 'books' is your data structure storing book information, and it has a 'reviews' property for each book.

regd_users.delete("/auth/review/:isbn", (req, res) => {
    try {
      const isbn = req.params.isbn;
      const username = req.user.username;
  
      if (!isValid(username)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      // Check if the user has a review for the given ISBN
      if (!books[isbn].reviews || !books[isbn].reviews[username]) {
        return res.status(404).json({ message: "Review not found for the user" });
      }
  
      // Delete the review for the given ISBN and username
      delete books[isbn].reviews[username];
  
      return res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  
  // ...
  
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
