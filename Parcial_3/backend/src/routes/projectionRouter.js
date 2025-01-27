const express = require("express");
const router = express.Router();
const projectionController = require("../controllers/projectionController");

router.post("/", projectionController.create);
router.get("/search", projectionController.search);

module.exports = router;
