const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

const connect = require("./services/db")

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Handle requests to any other non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, async () => {
  try{
    await connect()
    console.log(`Server is running on http://localhost:${PORT}`);
  }catch(er){
    console.log(er)
  }
});
