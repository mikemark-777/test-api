const express = require('express');
const app = express();
const port = 3000;

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

// Start server
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});