import Joi from "joi"
// import { Staff } from "../models"

const phone = Joi.string().required()
const email = Joi.string().min(1).max(50)
const password = Joi.string().min(1).max(20).required()
const name = Joi.string().min(1).max(20).required()
const address = Joi.string().allow('')
const role = Joi.string().required()
const time_from = Joi.date().required()
const time_to = Joi.date().required()

export const createLogin = Joi.object({
  email,
  password,
})

export const signupInput = Joi.object({
  phone,
  email,
  password,
  name,
  address
})

export const signupInputStaff = Joi.object({
  email,
  password,
  phone,
  name,
  address,
  role
})

export const incomeInput = Joi.object({
  time_from,
  time_to,
})
