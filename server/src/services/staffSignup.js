import { Staff } from "../models"

export const getAll = async () => {
  return await Staff.find({})
}

export const create = async (data) => {
  const {
    email,
    password,
    name,
    phone,
    address,
    role
  } = data
  const user = new Staff({
    email,
    password,
    name,
    phone,
    address,
    role
  })
  return await user.save()
}
