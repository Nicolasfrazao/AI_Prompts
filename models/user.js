import bcrypt from "bcrypt";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists in the system. Please choose a different email.'],
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]]+(?<![_.])%/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
    minlength: [8, 'Username should be at least 8 characters long.'],
    maxlength: [20, 'Username should not exceed 20 characters.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password should be at least 8 characters long'],
  },
  image: String
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = models.User || model("User", UserSchema);

export default User;
