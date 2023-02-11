import { handleAsync } from "../utils"
import { StaffService } from "../services"

export const getStaff = handleAsync(async (req, res) => {
  const staff = await StaffService.getAll()
  res.json({
    data: staff,
  })
})

export const createStaff = handleAsync(async (req, res) => {
  const staff = await StaffService.create(req.body)
  res.json({
    data: staff,
  })
})
