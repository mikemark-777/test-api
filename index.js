const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample data
const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "David McCarrie" }
];

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const user = users.find(u => u.name.toLowerCase() === name);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// POST /users - Adds a new user
app.post('/users', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const newUser = {
    id: users.length + 1,  // Assigning the next available ID
    name
  };

  users.push(newUser);  // Adding the new user to the array

  res.status(201).json(newUser);  // Returning the newly created user with a 201 status
});

// Start server
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
