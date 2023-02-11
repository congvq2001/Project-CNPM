import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"
const StaffSchema = new mongoose.Schema({
  // staff_code: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   lowercase: true,
  // },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 50,
  },
  name: {
    type: String,
    required: true,
    validate: {
      validator: function () {
        return /^([A-Z]){1}([\w_\.!@#$%^&*()]+){5,31}$/
      },
      required: [true, "vui long nhap lai"],
    },
  },
  email: {
    type: String,
    required: false,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "thatbai " })
      }
    },
  },
  role: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
})
StaffSchema.pre("save", async function (next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

StaffSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw new Error()
  }
}

export const Staff = mongoose.model("Staff", StaffSchema)
