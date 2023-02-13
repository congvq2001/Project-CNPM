import { Ticket, Customer, CusTicket } from "../models"
import { handleAsync } from "../utils"

export const CreateTicket = handleAsync(async (req, res) => {
    try {
      const {ticketType, name, timeLimit, price} = req.body
    const data = new Ticket({ticketType, name, timeLimit, price})
        await data.save()
        console.log(data)
    res.json({
      message: "Tạo vé thành công",
    })
    } catch (error) {
    res.json({
      message: "Có lỗi xảy ra",
      error,
    })
  }
})

//Tạo vé vào cửa hoặc tô tượng
export const createTypeTicket = async (req, res, next) => {
  try {
    const idTicket = req.params.id
    const ticket = await Ticket.findOne({ _id: idTicket })
    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Not found ticket" })
    }
    await Ticket.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { type: req.body },
      }
    )

    res
      .status(200)
      .json({ success: true, message: "create type ticket success" })
  } catch (error) {
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR" })
  }
}

//Lấy vé trả phí theo thời gian hoặc mất phí(tô tượng,...)
export const infoTicket = async (req, res, next) => {
  const idTicket = req.params.id

  try {
    const ticket = await Ticket.findById(idTicket)
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Not Found" })
    }

    res.status(200).json({ success: true, message: "Success", result: ticket })
  } catch (error) {
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR" })
  }
}

export const getAllTicket = async (req, res, next) => {
    try {
    const tickets = await Ticket.find()
    if (!tickets) {
      return res.status(404).json({ success: false, message: "Not Found" })
    }
    res.status(200).json({ success: true, message: "Success", result: tickets })
  } catch (error) {
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR" })
  }
}

export const getEventTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({eventId: {$exists: true}})
    if (!tickets) {
      return res.status(404).json({ success: false, message: "Not Found" })
    }
    res.status(200).json({ success: true, message: "Success", result: tickets })
  } catch (error) {
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR" })
  }
}


// export const getTicketTypes = async (req, res) => {
//   const ticketTitle = req.body.title
//   try {
//     console.log(ticketTitle)
//     const ticketName = await Ticket.findOne({ title: req.body.title })
//     const ticket=ticketName
//     const type=ticket.type
    
//     if (ticketName.length < 1) {
//       return res.status(404).json({ success: false, message: "Not Found" })
//     }else{
//       res.status(200).json({
//         success: true,
//         message: "Tra cứu thành công",
//         data: type
//       })
//     }
//     // console.log(ticketName[0])
//     // console.log(ticketName)
//   } catch (error) {
//     res.json({
//       message: "Có lỗi xảy ra",
//       error,
//     })
//   }
// }

//update kiểu vé (vé 2h,tô tượng,....);
// export const updateTypeTicket = async (req, res, next) => {
//   try {
//     const idTicket = req.params.id
//     const ticket = await Ticket.findById(idTicket)
//     if (!ticket) {
//       return res.status(404).json({ success: false, message: "Not Found" })
//     }

//     const typeIdTicket = req.params.typeId

//     await Ticket.updateOne(
//       {
//         _id: idTicket,
//         type: { $elemMatch: { _id: typeIdTicket } },
//       },
//       {
//         $set: {
//           "type.$.nameTicket": req.body.nameTicket,
//           "type.$.price": req.body.price,
//         },
//       }
//     )

//     res
//       .status(200)
//       .json({ success: true, message: "update type ticket success" })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR" })
//   }
// }

export const updateTicket = handleAsync(async (req, res) => {
    try {
        const {name,price} = req.body
        const data = await Ticket.findOneAndUpdate({ _id: req.params.id , eventId: {$exists: false}}, { name,price }, {new: true})
    if (!data) {
      return res.json({
        message: "Cập nhật thất bại",
        cause: "Vé không tồn tại",
      })
    }
    res.json({
      message: "Cập nhật thành công",
      data,
    })
    } catch (error) {
        console.log(error)
    res.json({
      message: "Có lỗi xảy ra",
      error,
    })
  }
})

export const deleteTicket = handleAsync(async (req, res) => {
  try {
    const data = await Ticket.findOne({ _id: req.params.id , eventId: {$exists: false}})
    if (!data) {
      return res.json({
        message: "Xóa thất bại",
        cause: "Vé không tồn tại",
      })
    }
    res.json({
      message: "Xóa vé thành công",
    })
  } catch (error) {
    res.json({
      message: "Xóa vé thất bại",
      error,
    })
  }
})

//delete type ticket
// export const deleteTypeTickte = async (req, res, next) => {
//   try {
//     await Ticket.findByIdAndUpdate(
//       {
//         _id: req.params.id,
//       },
//       { $pull: { type: { _id: req.params.typeId } } }
//     )

//     res
//       .status(200)
//       .json({ success: true, message: "Delete type ticket success" })
//   } catch (error) {
//     res.json({
//       message: "Có lỗi xảy ra",
//       error: error.message,
//     })
//   }
// }

export const UserBuyTicket = handleAsync(async (req, res) => {
  try {
    const isExistTicket = await Ticket.find({
      type: { $elemMatch: { _id: req.body.id_ticket } },
    })
    const isExistUser = await User.findById(req.user.userId)

    if (!isExistTicket && !isExistUser) {
      return res.status(200).json({
        status: 404,
        message: "Vé hoặc người mua vé không tồn tại",
      })
    }

    const ticket = { ...req.body, id_user: req.user.userId }

    const data = new CusTicket(ticket)
    await data.save()

    res.json({
      success: true,
      message: "Mua vé thành công",
      data,
    })
  } catch (error) {
    res.json({
      message: "Có lỗi xảy ra",
      error,
    })
  }
})

//Get user's ticket information
export const userTicket = async (req, res, next) => {
  const userId = req.params.userId
  try {
    const data = await CusTicket.find({
      cusId: userId
    }).populate('game.gameId ticketId').exec()

    res.status(200).json({
      success: true,
      message: "Get user's ticket success",
      result: data,
    })
  } catch (error) {
      console.log(error)
    res.json({
      message: "Có lỗi xảy ra",
      error,
    })
  }
}

export const getIncome = handleAsync(async (req, res) => {
  try {
    let a=req.body.time_from
    let b= req.body.time_to
    const query = await CusTicket.find({
      updatedAt: 
        { 
          $gte: new Date(req.body.time_from), 
          $lte: new Date(req.body.time_to) 
        }
      ,
    })
    res.json({
      data: query,
    })
  } catch (error) {
      console.log(error)
    res.json({
      message: "Có lỗi xảy ra",
      error,
    })
  }
})

export const getSpecificTicket = async (req, res) => {
  try {
    const data = await CusTicket.findById(req.params.id).populate('game.gameId ticketId').exec()
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No user tickets with this ID in the system",
      })
    }
    res.status(200).json({
      success: true,
      message: "Get user's ticket success",
      result: data,
    })
  } catch (error) {
    res.json({
      message: "Có lỗi xảy ra",
      error:error.message,
    })
  }
}

export const UserBuyTicketWithoutToken = handleAsync(async (req, res) => {
  try {
    const isExistTicket = await Ticket.find({
      type: { $elemMatch: { _id: req.body.id_ticket } },
    })
    const isExistUser = await User.findById(req.body.id_user)

    if (!isExistTicket && !isExistUser) {
      return res.status(200).json({
        status: 404,
        message: "Vé hoặc người mua vé không tồn tại",
      })
    }

    const ticket = { ...req.body }

    const data = new User_ticket(ticket)
    await data.save()

    res.json({
      success: true,
      message: "Mua vé thành công",
      data,
    })
  } catch (error) {
    res.json({
      message: "Có lỗi xảy ra",
      error,
    })
  }
})