const mongoose = require("mongoose");
const Joi = require("joi");


let categorySchema = new mongoose.Schema({
    name: String,
    info: String,
    cat_img: String,
    cat_code: String,
    date_created: {
        type: Date, default: Date.now()
    }
})

exports.CategoryModel = mongoose.model("categories", categorySchema);

exports.validteCategory = (reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(150).required(),
        info: Joi.string().min(2).max(500).required(),
        cat_code: Joi.string().min(2).max(150).required(),
        cat_img: Joi.string().min(2).max(500).allow(null, ""),
    })
    return joiSchema.validate(reqBody);
}
