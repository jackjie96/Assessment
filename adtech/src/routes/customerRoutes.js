const express = require("express");
const router = express.Router();
const { responseSuccess, responseError } = require("../helpers");
const {
  getAllCustomers,
  getCustomer,
  insertCustomer,
  editCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

router.get("/", async (req, res) => {
  responseSuccess(res, await getAllCustomers());
});

router.get("/:id", async (req, res) => {
  const customer = await getCustomer(req.params.id);
  if (customer) {
    responseSuccess(res, customer);
  } else {
    responseError(res, "Customer not found", 404);
  }
});

router.post("/", async (req, res) => {
  const { name, email } = req.body;

  try {
    const customer = await insertCustomer(name, email);
    responseSuccess(res, customer, 201);
  } catch (e) {
    responseError(res, e?.errors);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  editCustomer({ id, name }, (error, customer) => {
    if (error) {
      responseError(res, error.message, error.status);
    } else {
      responseSuccess(res, customer);
    }
  });
});

router.delete("/:id", async (req, res) => {
  deleteCustomer(req.params.id, (error, result) => {
    if (error) {
      responseError(res, error.message, error.status);
    } else {
      responseSuccess(res, null);
    }
  });
});

module.exports = router;
