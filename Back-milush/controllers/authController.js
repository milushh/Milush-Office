const User = require("../models/User");
const Role = require("../models/UserRole");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const mailer = require("../nodemailer");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async reqistration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { username, email, password, role  } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с тиаким именем уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 8);
       let userRole = await Role.findOne({ value: role });
    if (!userRole) {
      userRole = await Role.create({ value: role }); // Создаем роль, если её нет
    }

      const user = new User({
        username,
        email,
        password: hashPassword,
        roles: [userRole.value]
      });
      if (req.file) {
        user.avatar = req.file.path;
      } else {
        user.avatar = "uploads/user_no-image.jpg"
      }

      await user.save();
      console.log("Email из запроса:", req.body.email);
      const message = {

        to: req.body.userEmail,
        subject: "Подтверждение электронной почты",
        text: `Поздравляем вы успешно зарегистрировались на нашем сайте
        данные вашей учетной записи
        login:${req.body.username} , 
        password: ${req.body.password}`,
      };
      
      mailer(message)
      return res.status(200).json("Регистрация прошла успешно");
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Ошибка регистрации" });
      console.log("Email из запроса:", req.body.email);
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Неправильный логин или пароль, повторите вход!" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ message: "Введен неверный логин или пароль" });
      }
      const token = generateAccessToken(user._id, user.roles);

      return res.status(200).json({ token: token });
    } catch (e) {}
  }

  async getUsers(req, res) {
    try {
      // const userRole = new Role();
      // const adminRole = new Role({value: "ADMIN"})
      // await userRole.save()
      // await adminRole.save()

      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
      
    }
  }

  async getProfile(req, res) {
  try {
      const user = await User.findById(req.user.id)
      
      res.status(200).json({ user })
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Ошибка" })
    }
  }
}

module.exports = new authController();
