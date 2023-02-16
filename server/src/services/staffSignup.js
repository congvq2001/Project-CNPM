import { Staff } from "../models"

export const getAll = async () => {
  return await Staff.find({}).select("-password")
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
  const staff = new Staff({
    email,
    password,
    name,
    phone,
    address,
    role
  })
  return await staff.save()
}
