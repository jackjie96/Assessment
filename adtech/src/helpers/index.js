const responseSuccess = (res, data, status = 200) => {
  res.status(status).json({
    code: "0",
    success: true,
    data,
  });
};

const responseError = (res, message, status = 400) => {
  res.status(status).json({
    code: "9999",
    success: false,
    message,
  });
};

const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = { responseSuccess, responseError, random };
