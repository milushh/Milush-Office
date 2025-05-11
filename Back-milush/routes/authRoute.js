const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController");
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");


router.post("/registration",  upload.none(),[
  check("username", "Имя пользователя не может быть пустым").trim().notEmpty(),
    check("password", "Пароль должен быть от 6 до 10 символов")
  .isLength({ min: 6, max: 10 })
    .trim()
    .notEmpty(),
  controller.reqistration,
]);
router.post("/login", controller.login);
router.get("/users", authMiddleware, controller.getUsers);
router.get("/profile", authMiddleware, controller.getProfile);

module.exports = router;
