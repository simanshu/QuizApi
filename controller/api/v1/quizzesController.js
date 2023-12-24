const Quiz = require('../../../models/quiz');
const errorHandler = require('../../../utils/errorHandler');

const createQuiz = async (req, res) => {
  try {
    const { question, options, rightAnswer, startDate, endDate } = req.body;

    // Validate input
    if (!question || !options || !rightAnswer || !startDate || !endDate) {
      return errorHandler(res, { message: 'Missing required fields' }, 400);
    }

    // Create quiz
    const quiz = new Quiz({
      question,
      options,
      rightAnswer,
      startDate,
      endDate,
    });

    // Save quiz to the database
    await quiz.save();

    res.status(201).json({ message: 'Quiz created successfully' });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getActiveQuiz = async (req, res) => {
  try {
    const currentDate = new Date();

    // Find the active quiz
    const activeQuiz = await Quiz.findOne({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    });

    if (!activeQuiz) {
      return res.status(404).json({ message: 'No active quiz at the moment' });
    }

    res.status(200).json({ quiz: activeQuiz });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getQuizResult = async (req, res) => {
  try {
    const quizId = req.params.id;

    // Retrieve quiz by ID
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Implement logic to calculate and return quiz results
    // You may need to fetch user responses and compare them with the correct answers

    res.status(200).json({ correctAnswer: quiz.rightAnswer, additionalInfo: 'Add your logic here' });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    // Retrieve all quizzes
    const quizzes = await Quiz.find();

    res.status(200).json({ quizzes });
  } catch (error) {
    errorHandler(res, error);
  }
};

// module.exports.Addquiz=async(req,res)=>{
//     try{
//         let quiz = await Quiz.create(req.body);
//         //Return Response
//         res.status(201).json({
//             sucess:true,
//             body:quiz,
//             msg:'Quiz Got Create Sucessfully'
//         });

//     }catch(e){
//         console.log(e);
//         //Error handling
//         res.status(400).json({
//             sucess:false,
//             msg:'Error Occoured'
//         });
//     }
// };

module.exports = { createQuiz, getActiveQuiz, getQuizResult, getAllQuizzes };
