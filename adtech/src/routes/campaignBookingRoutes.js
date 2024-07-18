const express = require("express");
const router = express.Router();
const { responseSuccess, responseError } = require("../helpers");
const {
  getAllBookings,
  getByCustomer,
  insertByCustomer,
  runCampaign,
} = require("../controllers/campaignBookingController");

router.get("/", async (req, res) => {
  responseSuccess(res, await getAllBookings());
});

router.get("/customers/:customerId", async (req, res) => {
  responseSuccess(res, await getByCustomer(req.params.customerId));
});

router.post("/customers/:customerId", async (req, res) => {
  customerId = req.params.customerId;
  streamTypes = req.body.streamTypes;

  insertByCustomer({ customerId, streamTypes }, (error, result) => {
    if (error) {
      responseError(res, error.message, error.status);
    } else {
      responseSuccess(res, result);
    }
  });
});

router.post("/customers/:customerId/campaigns", async (req, res) => {
  runCampaign({ customerId: req.params.customerId }, (error, result) => {
    if (error) {
      responseError(res, error.message, error.status);
    } else {
      responseSuccess(res, result);
    }
  });
});

module.exports = router;
