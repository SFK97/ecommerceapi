const User = require("../models/User");
const { verifyToken, verifyTokenAndAuth } = require("./verifyToken");

const router = require("express").Router();

//Update
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //take everything in req.body and set
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
