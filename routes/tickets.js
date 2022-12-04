const express = require("express");
const { auth } = require("../middlewares/auto");
const { validteTicket, TicketModel } = require("../models/ticketModel");
const router = express.Router();

router.get("/", async (req, res) => {
    let page = Number(req.query.page) || 1;
    let perPage = Number(req.query.perPage) || 2;
    let sort = req.query.perPage || "_id";
    let reverse = req.query.reverse == "yea" ? 1 : -1;
    try {
        let data = await TicketModel.find({})
            .limit(perPage)
            .skip((page - 1) * perPage)
            .sort({ [sort]: reverse });
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.get("/category/:url_code", async (req, res) => {
    let page = Number(req.query.page) || 1;
    let perPage = Number(req.query.perPage) || 2;
    let sort = req.query.perPage || "_id";
    let reverse = req.query.reverse == "yes" ? 1 : -1;
    let url_code = req.params.url_code;
    try {
        let data = await TicketModel.find({ url_cat: url_code })
            .limit(perPage)
            .skip((page - 1) * perPage)
            .sort({ [sort]: reverse })
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.get("/search", async (req, res) => {

    let queryS= req.query.s;
    let regQuery = new RegExp(queryS, "i");
    try {
        let data = await TicketModel.find({$or:[{name:regQuery},{info:regQuery}]})
            .limit(20)
            .skip(0) 
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.post("/", auth, async (req, res) => {

    let validateBady = validteTicket(req.body);
    if (validateBady.error) {
        return res.status(500).json(validateBady.error.details);
    }
    try {

        let data = new TicketModel(req.body);
        data.user_id = req.tokenData._id;
        await data.save();
        return res.status(201).json(data);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }

})

router.put('/:idUpdate', auth, async (req, res) => {

    let validateBady = validteTicket(req.body);
    if (validateBady.error) {
        return res.status(500).json(validateBady.error.details);
    }
    try {
        let idUpdate = req.params.idUpdate;
        let data = await TicketModel.updateOne({ _id: idUpdate, user_id: req.tokenData._id }, req.body);
        res.status(201).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
})

router.delete('/:idDel', auth, async (req, res) => {
    try {
        let idDelete = req.params.idDel;
        let data = await TicketModel.deleteOne({ _id: idDelete, user_id: req.tokenData._id })
        res.status(201).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;
