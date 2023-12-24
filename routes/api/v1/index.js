const express = require("express");
const router = express.Router();

// Handling v1 routes
router.use("/user",require("./user"));
router.use("/quizzes",require("./quizzes"));
module.exports = router;