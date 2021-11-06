const jwt = require("jsonwebtoken");

const { response } = require("../helpers");

module.exports = (req, res, next) => {
  try {
    jwt.verify(req.headers["x-access-token"], process.env.SECRET);
  } catch (error) {
   
    return response(res, { status: false, message: "Unauthorized Access" }, 401);
  }
  next();
};
