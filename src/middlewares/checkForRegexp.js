export const checkForRegexp = (regexp, param) => (req, res, next) => {
  if (!regexp.test(req.query[param])) {
    return res.status(400).json({
      error: `The value of the ${param} parameter is incorrect.`,
    });
  }

  next();
};
