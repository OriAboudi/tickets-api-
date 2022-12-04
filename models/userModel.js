const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const { config } = require("../config/secret");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date_created: {
        type: Date, default: Date.now()
    },
    role: {
        type: String, default: "user"
    }
})

exports.UserModel = mongoose.model("users", userSchema);

exports.validteUser = (reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(150).required(),
        email: Joi.string().min(2).max(150).email().required(),
        password: Joi.string().min(3).max(150).required()
    })
    return joiSchema.validate(reqBody);
}
exports.createToken = (user_id) => {
    let token = jwt.sign({ _id: user_id }, config.tokenSecret,{expiresIn:'60mins'})
    return token;
}
exports.validteLogin = (reqBody) => {
    let joiSchema = Joi.object({
      email:Joi.string().min(2).max(150).email().required(),
      password:Joi.string().min(3).max(150).required()
    })
    return joiSchema.validate(reqBody);
  }
  