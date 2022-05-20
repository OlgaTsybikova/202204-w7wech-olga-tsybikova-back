const { Schema, model, default: mongoose } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  friends: {
    type: [{ type: mongoose.Schema.Types.ObjectId, unique: true }],
    ref: "User",
    default: [],
  },
  enemies: {
    type: [{ type: mongoose.Schema.Types.ObjectId, unique: true }],
    ref: "User",
    default: [],
  },
});

const User = model("User", UserSchema, "social");

module.exports = User;
