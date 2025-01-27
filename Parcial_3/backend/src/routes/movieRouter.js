const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

router.get("/", movieController.getAll);
router.get("/:id", movieController.getOne);
router.post("/", movieController.create);
router.put("/:id", movieController.update);
router.delete("/:id", movieController.delete);
router.get("/search", movieController.search);

module.exports = router;
