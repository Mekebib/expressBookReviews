const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users((req, res, next) => {
    if (!req.session) {
        req.session = {}; // create a session object if it doesn't exist
    }
    next();
// ... (rest of your existing routes)

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if the username is already taken
  if (users.find(user => user.username === username)) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  // Store the new user in the database
  const newUser = { username, password };
  users.pusconst express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users((req, res, next) => {
    if (!req.session) {
        req.session = {}; // create a session object if it doesn't exist
    }
    next();
// ... (rest of your existing routes)

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if the username is already taken
  if (users.find(user => user.username === username)) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  // Store the new user in the database
  const newUser = { username, password };
  users.push(newUser);

  return res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    try {
      // Get the values (books) from the books object
      const bookList = Object.values(books);

      // Check if there are books available
      if (bookList.length > 0) {
        return res.status(200).json({ books: bookList });
      } else {
        return res.status(404).json({ message: "No books available in the shop" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });


// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    try {
      const isbn = req.params.isbn;

      // Check if the ISBN exists in the books database
      if (books[isbn]) {
        const book = books[isbn];
        return res.status(200).json({ book });
      } else {
        return res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    try {

h(newUser);

  return res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    try {
      // Get the values (books) from the books object
      const bookList = Object.values(books);
  
      // Check if there are books available
      if (bookList.length > 0) {
        return res.status(200).json({ books: bookList });
      } else {
        return res.status(404).json({ message: "No books available in the shop" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    try {
      const isbn = req.params.isbn;
  
      // Check if the ISBN exists in the books database
      if (books[isbn]) {
        const book = books[isbn];
        return res.status(200).json({ book });
      } else {
        return res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    try {
      const author = req.params.author;
  
      // Filter books by the specified author
      
      if (books[author]) {
        const author = books[author]
        return res.status(200).json({ books: books[author] });
      } else {
        return res.status(404).json({ message: `No books found by ${author}` });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    try {
      const title = req.params.title;
  
      // Filter books by the specified title
      const booksByTitle = Object.values(books).filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
  
      // Check if there are books with the specified title
      if (booksByTitle.length > 0) {
        return res.status(200).json({ books: booksByTitle });
      } else {
        return res.status(404).json({ message: `No books found with title containing "${title}"` });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    try {
      const isbn = req.params.isbn;
  
      // Check if the ISBN exists in the books database
      if (books[isbn]) {
        const reviews = books[isbn].reviews;
  
        if (Object.keys(reviews).length > 0) {
          return res.status(200).json({ reviews });
        } else {
          return res.status(404).json({ message: "reviews found for the book" });
        }
      } else {
        return res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

module.exports.general = public_users;

