const jwt = require("jsonwebtoken");
const userSchema = require("../models/user");
const auth = async (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    if (!token) {
      return res
        .status(400)
        .send({ errors: [{ msg: "you are not authorized" }] });
    }
    const decoded = jwt.verify(token, process.env.key);
    const user = await userSchema.findById(decoded._id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = auth;
