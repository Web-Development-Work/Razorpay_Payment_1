require("dotenv").config({path:"config/.env"});

require("dotenv").config();
const uniquId = require("uniqid");
const path = require("path");
const Formidable = require("formidable");
const crypto = require("crypto");
const request = require("request");
const orderSchema = require("./orderSchema");
const Razorpay = require("razorpay");
let orderId;

var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.SECRET_KEY,
});

exports.createOrder = (req, res) => {
  var options = {
    amount: 50000, // amount in the smallest currency unit
    currency: "INR",
    receipt: uniquId(),
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    orderId = order.id;
    res.json(order);
  });
};

exports.paymentCallback = (req, res) => {
  const form = Formidable();
  form.parse(req, (err, fields, files) => {
  res.send(req);
  console.log(req);
  })
};


exports.getLogo = (req, res) => {
  res.sendFile(path.join(__dirname, "mask.svg"));
};

exports.getPayment = (req, res) => {
  orderSchema.findById(req.params.paymentId).exec((err, data) => {
    if (err || data == null) {
      return res.json({
        error: "No order Found",
      });
    }
    request(
      `https://${process.env.KEY_ID}:${process.env.SECRET_KEY}@api.razorpay.com/v1/payments/${req.params.paymentId}`,
      function (error, response, body) {
        if (body) {
          const result = JSON.parse(body);
          res.status(200).json(result);
        }
      }
    );
  });
};