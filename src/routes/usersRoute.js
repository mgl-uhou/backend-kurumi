"use strict";

const userController = require("../controllers/userController");
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", userController.post.bind(userController));
router.post("/login", userController.login.bind(userController));
router.get("/profile", authMiddleware, userController.getProfile.bind(userController));
router.put("/", authMiddleware, userController.put.bind(userController));
router.delete("/", authMiddleware, userController.delete.bind(userController));

module.exports = router;
