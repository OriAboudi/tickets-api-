const express = require("express");
const { validteUser, UserModel, validteLogin, createToken } = require("../models/userModel");
const router = express.Router();
const bcrypt = require('bcrypt');
const { auth } = require("../middlewares/auto");


router.get("/", async (req, res) => {
  res.json({ msg: "Users work" });
});

router.get('/myUsre', auth, async (req, res) => {
  let data = await UserModel.find({ _id: req.tokenData._id }, { password: 0 })
  res.json(data);
})

router.post('/', async (req, res) => {
  let validateBady = validteUser(req.body);
  if (validateBady.error) {
    return res.status(500).json(validateBady.error.details);
  }
  try {
    let user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    user.password = '********';
    res.status(201).json(user);

  } catch (error) {
    if (error.code == 11000) {
      res.status(400).json({ msg: "Email already in system" })
    }
    console.log(error);
    return res.status(500).json(error);
  }
})

router.post('/login', async (req, res) => {
  let validateBady = validteLogin(req.body);
  if (validateBady.error) {
    res.status(500).json(validateBady.error.details);
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: "User Not Found! " });
    }
    let validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid Password! " });
    }
    let token = createToken(user.id);
    res.json({ token: token })

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
})
module.exports = router;