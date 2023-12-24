const express = require('express');
const router = express.Router();
const {auth} = require("../../../middleware/auth");
const quizzesController = require('../../../controller/api/v1/quizzesController');

router.post('/createQuiz', auth, quizzesController.createQuiz);
router.get('/getActiveQuiz', auth, quizzesController.getActiveQuiz);
router.get('/:id/getQuizResult', auth, quizzesController.getQuizResult);
router.get('/getAllQuizzes', auth, quizzesController.getAllQuizzes);

module.exports = router;
