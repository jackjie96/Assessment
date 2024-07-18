const express = require("express");
const router = express.Router();
const { responseSuccess, responseError } = require("../helpers");
const {
  getAllStreamTypes,
  getStreamType,
  insertStreamType,
  editStreamType,
  deleteStreamType,
} = require("../controllers/streamTypeController");

router.get("/", async (req, res) => {
  responseSuccess(res, await getAllStreamTypes());
});

router.get("/:id", async (req, res) => {
  const streamType = await getStreamType(req.params.id);
  if (streamType) {
    responseSuccess(res, streamType);
  } else {
    responseError(res, "Stream type not found", 404);
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const streamType = await insertStreamType(name);
    responseSuccess(res, streamType, 201);
  } catch (e) {
    responseError(res, e?.errors);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  editStreamType({ id, name }, (error, streamType) => {
    if (error) {
      responseError(res, error.message, error.status);
    } else {
      responseSuccess(res, streamType);
    }
  });
});

router.delete("/:id", async (req, res) => {
  deleteStreamType(req.params.id, (error, result) => {
    if (error) {
      responseError(res, error.message, error.status);
    } else {
      responseSuccess(res, null);
    }
  });
});

module.exports = router;
