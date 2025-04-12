"use strict";

const flagController = require("../controllers/flagController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.get("/", flagController.getAll.bind(flagController));
router.get("/:id", flagController.getById.bind(flagController));
router.post("/", authMiddleware, flagController.post.bind(flagController));
router.put("/:id", authMiddleware, flagController.put.bind(flagController));
router.delete("/:id", authMiddleware, flagController.delete.bind(flagController));

module.exports = router;
