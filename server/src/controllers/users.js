import {
    Customer,
    //User_ticket,
    //Event,
    //User_event,
    //Vip_transition
} from "../models"
import { UserService } from "../services";
import { handleAsync } from "../utils"
import bcrypt from "bcrypt"

export const getCustomers = handleAsync(async (req, res) => {
    try {
        const users = await UserService.getAll();
        res.json({
            data: users
        });
    } catch (error) {
        res.json({
            message: "Có lỗi xảy ra",
            error,
        })
    }
});

export const updateUser = handleAsync(async (req, res) => {
  try {
    var newPassword
    if (req.body.password) {
      newPassword = await bcrypt.hash(req.body.password, 8)
    }
    let params = {
      phone: req.body.phone,
      password: newPassword,
      name: req.body.name,
      address: req.body.address,
    }
    for (let prop in params) if (!params[prop]) delete params[prop]
    const data = await Customer.findByIdAndUpdate(req.params.id, params)
    if (!data) {
      return res.json({
        message: "Cập nhật thất bại",
        cause: "Khách hàng không tồn tại",
      })
    }
    const newdata = await Customer.findById(req.params.id)
    res.json({
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

export const deleteUser = handleAsync(async (req, res) => {
  try {
    const data = await Customer.findByIdAndUpdate(req.params.id, {status: false})
    if (!data) {
      return res.json({
        message: "Xóa thất bại",
        cause: "Khách hàng không tồn tại",
      })
    }
    res.json({
      message: "Xóa khách hàng thành công",
    })
  } catch (error) {
    res.json({
      message: "Xóa khách hàng thất bại",
      error,
    })
  }
})

// export const getPersonalInfo = handleAsync(async (req, res) => {
//   const userId = req.user.userId
//   try {
//     const userinfo = await User.findById(userId)
//     const userticket = await User_ticket.find({ id_user: userId })
//     // const vipInfo = await Vip_transition.findById(userinfo.id_vip_transition)
//     // const vipExpiration = await Vip_transition.find()
//     if (!userinfo) {
//       return res.status(404).json({ success: false, message: "User Not Found" })
//     }
//     if (userticket.length < 1) {
//       return res.status(200).json({
//         success: true,
//         message: "Success",
//         info: userinfo,
//         tickets: "Nothing",
//       })
//     }
//     res.status(200).json({
//       success: true,
//       message: "Success",
//       info: userinfo,
//       tickets: userticket,
//     })
//   } catch (error) {
//     res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR" })
//   }
// })

// export const personalUpdateUser = handleAsync(async (req, res) => {
//   try {
//     const userId = req.user.userId
//     const data = await User.findByIdAndUpdate(userId, {
//       phoneNumber: req.body.phoneNumber,
//       name: req.body.name,
//       email: req.body.email,
//     })
//     if (!data) {
//       return res.json({
//         message: "Cập nhật thất bại",
//         cause: "Khách hàng không tồn tại",
//       })
//     }
//     const newdata = await User.findById(userId)
//     res.json({
//       success:true,
//       message: "Cập nhật thành công",
//       newdata,
//     })
//   } catch (error) {
//     res.json({
//       message: "Có lỗi xảy ra",
//       error,
//     })
//   }
// })

// //events that users participate in
// export const userJoinEvents = async (req, res, next) => {
//   try {
//     const userId = req.user.userId
//     const participants = await User_event.find({ id_user: userId })

//     const Idevents = participants.map((item, index) => item.id_event)

//     const events = await Event.find({ _id: { $in: Idevents } })

//     res.status(200).json({
//       success: true,
//       message: "Information of event participants",
//       result: events,
//     })
//   } catch (error) {
//     res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR" })
//   }
// }

export const getSpecificUser = async (req, res, next) => {
  try {
    const data = await Customer.findById(req.params.id).select('-password')
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      })
    }
    res.status(200).json({
      success: true,
      message: "Get user success",
      data: data,
    })
  } catch (error) {
    res.json({
      message: "Có lỗi xảy ra",
      error,
    })
  }
}