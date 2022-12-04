const mongoose = require("mongoose");
const Joi = require("joi");

let ticketSchema = new mongoose.Schema({
  name:String,
  info:String,
  url_cat:String,
  phone:String,
  price:Number,
  user_id:String,
  date_created:{
    type:Date, default:Date.now()
  }
})

exports.TicketModel = mongoose.model("tickets",ticketSchema);

exports.validteTicket = (reqBody) => {
  let joiSchema = Joi.object({
    name:Joi.string().min(2).max(150).required(),
    info:Joi.string().min(2).max(500).required(),
    url_cat:Joi.string().min(2).max(150).required(),
    phone:Joi.string().min(2).max(15).required(),
    price:Joi.number().min(1).max(9999).required(),
   
  })
  return joiSchema.validate(reqBody);
}
