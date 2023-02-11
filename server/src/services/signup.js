import { User } from "../models"
export const getAll = async () => {
  return await User.find({})
}

export const create = async (data) => {
  const { phoneNumber, email, password, name } = data
  const user = new User({
    phoneNumber,
    email,
    password,
    name,
  })
  return await user.save()
}
