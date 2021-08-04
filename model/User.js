const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const schema = new mongoose.Schema(
  {
    /////////////////////////////////////
    name: {
      type: String,
      trim: true,
      required: ["true", "Please enter the Name"],
    },
    role: {
      type: String,
      default: "user",
      require: [true, "Please enter valid role"],
      enum: {
        values: ["admin", "user"],
        message: "Invalid input",
      },
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    number: { type: Number, unique: true, sparse: true },
    password: {
      type: String,
      select: false,
    },
    active: { type: Boolean, default: false },
    active_no: { type: Boolean, default: false },
    confirmPassword: {
      type: String,
      select: false,
      required: ["true", "Please enter the confirmed password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "password and passwordconfirm not same",
      },
    },
    passwordChangedAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    /////////////////////////////////////////////////////////////////
    token: { type: String },
    validtill: { type: Date },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
schema.index({ number: 1 });
schema.index({ email: 1 });
schema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = null;
  next();
});

schema.methods.correctPassword = async function (
  currentpassword,
  userpassword
) {
  return bcrypt.compare(currentpassword, userpassword);
};
schema.methods.generatetoken = async function () {
  let token = crypto.randomBytes(4).toString("hex");
  this.token = crypto.createHash("sha256").update(token).digest("hex");
  this.validtill = Date.now() + 10 * 60 * 1000;
  return token;
};
schema.methods.comparetoken = async function (usertoken, dbtoken) {
  return crypto.createHash("sha256").update(usertoken).digest("hex") == dbtoken;
};
schema.methods.changepassword = async function (time) {
  if (this.passwordChangedAt) {
    let temp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return time > temp;
  }
  return false;
};
model = mongoose.model("User", schema);
module.exports = model;
