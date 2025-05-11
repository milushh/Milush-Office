const { Schema, model } = require("mongoose");

const Role = new Schema({
    value: { 
        type: String, 
        unique: true, 
        enum: ["Admin", "JobSeeker", "Employer"], // Разрешенные значения ролей
        default: "JobSeeker" // Роль по умолчанию (например, для новых пользователей)
    },
});

module.exports = model("Role", Role);