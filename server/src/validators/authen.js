import Joi from "joi"
// import { Staff } from "../models"

const phoneNumber = Joi.string().length(10).required()
const email = Joi.string().min(1).max(50)
const password = Joi.string().min(1).max(20).required()
const name = Joi.string().min(1).max(20).required()
const role = Joi.number().required()
const salary = Joi.number().required()
const time_from = Joi.date().required()
const time_to = Joi.date().required()
// const staff_code = Joi.string().lowercase().required()

export const createLogin = Joi.object({
  phoneNumber,
  password,
})

export const signupInput = Joi.object({
  phoneNumber,
  email,
  password,
  name,
})

export const signupInputStaff = Joi.object({
  // staff_code,
  phoneNumber,
  email,
  password,
  name,
  role,
  salary,
})

export const incomeInput = Joi.object({
  time_from,
  time_to,
})
