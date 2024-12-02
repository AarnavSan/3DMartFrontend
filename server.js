const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'dist' folder (or whichever folder contains your build)
app.use(express.static(path.join(__dirname, './dist')));

// Serve the HTML file at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
