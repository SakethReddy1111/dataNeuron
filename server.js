const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const connect = require("./services/db")
const {updateOpLogs} = require("./services/opLogs")
const logger = require("morgan")
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Enable CORS for all routes
app.use(cors());

app.use(logger(':method :status :url :user-agent - :response-time ms'));

//storing data of update/add/ delete
app.use((req, res, next) => {
  const originalJson = res.json;

  res.json = function (body) {
    updateOpLogs(body, req)
    originalJson.call(this, body);
  };

  next();
});

// Serve static files from the React app


const TodoRouter = require("./routes/todo")
const opLogsRouter = require("./routes/opLogs")

app.use("/todo", TodoRouter)
app.use("/logs", opLogsRouter)

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
