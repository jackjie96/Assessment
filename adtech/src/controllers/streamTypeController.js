const StreamType = require("../models/StreamType");

const getAllStreamTypes = async () => {
  return await StreamType.findAll();
};

const getStreamType = async (id) => {
  return await StreamType.findByPk(id);
};

const insertStreamType = async (name) => {
  return await StreamType.create({ name });
};

const editStreamType = async ({ id, name }, callback) => {
  const streamType = await StreamType.findByPk(id);

  if (!streamType) {
    return callback({
      message: "Stream type not found",
      status: 404,
    });
  }

  try {
    streamType.name = name;
    return callback(null, await streamType.save());
  } catch (e) {
    return callback({
      message: e.errors,
      status: 500,
    });
  }
};

const deleteStreamType = async (id, callback) => {
  const streamType = await StreamType.findByPk(id);

  if (!streamType) {
    return callback({
      message: "Stream not found",
      status: 404,
    });
  }

  try {
    await streamType.destroy();
    return callback();
  } catch (e) {
    return callback({
      message: e.errors,
      status: 500,
    });
  }
};

module.exports = {
  getAllStreamTypes,
  getStreamType,
  insertStreamType,
  editStreamType,
  deleteStreamType,
};
