const express = require('express');
const router = express.Router();
const OpLogsController = require("../controllers/opLogs")

router.get("/getTodoLogs", OpLogsController.getTodoLogs)

module.exports = router;