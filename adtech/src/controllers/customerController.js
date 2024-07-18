const Customer = require("../models/Customer");

const getAllCustomers = async () => {
  return await Customer.findAll();
};

const getCustomer = async (id) => {
  return await Customer.findByPk(id);
};

const insertCustomer = async (name, email) => {
  return await Customer.create({ name, email });
};

const editCustomer = async ({ id, name }, callback) => {
  const customer = await Customer.findByPk(id);

  if (!customer) {
    return callback({
      message: "Customer not found",
      status: 404,
    });
  }

  try {
    customer.name = name;
    return callback(null, await customer.save());
  } catch (e) {
    return callback({
      message: e.errors,
      status: 500,
    });
  }
};

const deleteCustomer = async (id, callback) => {
  const customer = await Customer.findByPk(id);

  if (!customer) {
    return callback({
      message: "Customer not found",
      status: 404,
    });
  }

  try {
    await customer.destroy();
    return callback();
  } catch (e) {
    return callback({
      message: e.errors,
      status: 500,
    });
  }
};

module.exports = {
  getAllCustomers,
  getCustomer,
  insertCustomer,
  editCustomer,
  deleteCustomer,
};
