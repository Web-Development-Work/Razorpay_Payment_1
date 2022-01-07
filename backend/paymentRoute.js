const express = require("express");
const {
  createOrder,
  getLogo,
  paymentCallback,
  getPayment,
} = require("./paymentControler");


const router = express.Router();


router.get("/",(req,res)=>{
    res.send("Hello")
})

router.get("/createorder", createOrder);
router.get("/payment", paymentCallback);
router.get("/payments/:paymentId", getPayment);
router.get("/logo", getLogo);

module.exports = router;