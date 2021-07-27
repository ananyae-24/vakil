module.exports = (err, req, res, next) => {
    // if (req.originalUrl.startsWith('/api')) {
      return res.status(err.statusCode || 500).json({
        status: err.status,
        error: err,
        message: err.message,
      });
    // }
    // return res.status(err.statusCode || 500).render('error', {
    //   title: 'Something went wrong!',
    //   msg: err.message,
    // });
  };
  