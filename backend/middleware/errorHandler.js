let errorHandler = (error, req, res, next) => {
  let statusCode = error.status || 500;
  let errMsg = error.message || "Internal Server error";

  res.status(statusCode).send({ error: errMsg });
};

export default errorHandler;

// check the error in mongodb database details.
// The problem was that the password was stored in plain text format which is not suitable .
// To encrypt the password we use bcryptjs
// npm i bcryptjs
// we can use bcryptjs in two places
// user.controller.js
// Or user.model.js ma gayera garne

// bcryptjs chai user.model.js ma use garda ramro hunxa
