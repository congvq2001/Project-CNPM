import { Customer} from "../models"

export const getAll = async () => {
  return await Customer.find({})
}

export const create = async (data) => {
  const { email, password, name , phone, address} = data
  const user = new Customer({
    phone,
    email,
    password,
    name,
    address
  })
  return await user.save()
}
