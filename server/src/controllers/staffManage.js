import { Staff } from "../models"
import { handleAsync } from "../utils"
import bcrypt from "bcrypt"

export const updateStaff = handleAsync(async (req, res) => {
  try {
    var newPassword
    if (req.body.password) {
      newPassword = await bcrypt.hash(req.body.password, 8)
    }
    let params = {
      phone: req.body.phone,
      password: newPassword,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    }
    for (let prop in params) if (!params[prop]) delete params[prop]
    const data = await Staff.findByIdAndUpdate(req.params.id, params)
    if (!data) {
      return res.json({
        message: "Cập nhật thất bại",
        cause: "Nhân viên không tồn tại",
      })
    }
    const newdata = await Staff.findById(req.params.id)
    res.json({
      success:true,
      message: "Cập nhật thành công",
      newdata,
    })
  } catch (error) {
    res.json({
      message: "Có lỗi xảy ra",
      error,
    })
  }
})

export const getOneStaff = handleAsync(async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).select('-password')
    if (!staff) {
      return res.json({
        message: "Xóa thất bại",
        cause: "Nhân viên không tồn tại",
      })
    }
    res.json({
      data: staff,
    })
  } catch (error) {
    res.json({
      message: "Tra cứu thất bại",
      error,
    })
  }
})

export const deleteStaff = handleAsync(async (req, res) => {
  try {
    const data = await Staff.findByIdAndUpdate(req.params.id, {status: false})
    if (!data) {
      return res.json({
        message: "Xóa thất bại",
        cause: "Nhân viên không tồn tại",
      })
    }
    res.json({
      success:true,
      message: "Xóa nhân viên thành công",
    })
  } catch (error) {
    res.json({
      message: "Xóa CSVC thất bại",
      error,
    })
  }
})
