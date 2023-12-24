module.exports = (res, error, status = 500) => {
    console.error(error);
    res.status(status).json({ message: 'Internal Server Error' });
  };
  