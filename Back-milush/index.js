const express = require("express");
const cors = require('cors')
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/authRoute");
const PORT = process.env.PORT || 5000;

const app = express({ limit: "100mb" });

app.use(cors())

app.use(express.json())
app.use('/auth' , authRouter)
app.use("/uploads" , express.static("uploads"))

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/milush"); // Добавлено имя базы
    console.log("MongoDB подключен");
    
    app.listen(PORT, () => {
      console.clear();
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (e) {
    console.error("Ошибка запуска:", e);
    process.exit(1);
  }
};


start()