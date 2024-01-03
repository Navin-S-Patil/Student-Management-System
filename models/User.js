const mongoose = require("mongoose");
const bycrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Simple email format validation using regular expression
        return /\S+@\S+\.\S+/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  department: { type: String, required: false },
  password: { type: String, required: true },

  isAdmin: { type: Boolean, required: true, default: false },
  tasks: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  //   portfolio: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Portfolio",
  //   },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
