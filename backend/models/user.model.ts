import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      trim: true,
    },
    uuid: {
      type: String,
      default: randomUUID,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving to database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next(); // Always call next
});

// Compare passwords method
userSchema.methods.comparePasswords = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
