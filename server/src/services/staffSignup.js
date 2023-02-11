export const getAll = async () => {
  return await Staff.find({})
}

export const create = async (data) => {
  const {
    // staff_code,
    phoneNumber,
    email,
    password,
    name,
    role,
    salary,
  } = data
  const user = new Staff({
    // staff_code,
    phoneNumber,
    email,
    password,
    name,
    role,
    salary,
  })
  return await user.save()
}
