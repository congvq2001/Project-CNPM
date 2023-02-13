import { CusTicket, Game } from "../models"
import { handleAsync } from "../utils"

export const getGame = handleAsync(async (req, res) => {
  const data = await Game.find()
  if (!data) {
    return res.json({
      message: "Tra cứu CSVC thất bại",
      cause: "Không có CSVC được ghi nhận trong hệ thống",
    })
  }
  res.json({
    result: data,
  })
})

export const getOneGame = handleAsync(async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)
    if (!game) {
      return res.json({
        message: "Tra cứu thất bại",
        cause: "CSVC không tồn tại",
      })
    }
    res.json({
      data: game,
    })
  } catch (error) {
    res.json({
      message: "Tra cứu thất bại",
      error,
    })
  }
})

export const createGame = handleAsync(async (req, res) => {
  try {
    const {code, name, price, location, type , status } = req.body
    const data = await Game.create({code, name, price: type === 'Casual' ? 0 : price , location, type , status} )
    res.json({
      message: "Thêm cơ sở vật chất thành công",
      data,
    })
  } catch (error) {
    res.json({
      message: "Có lỗi xảy ra",
      error,
    })
  }
})

export const updateGame = handleAsync(async (req, res) => {
  try {
    const data = await Game.findByIdAndUpdate(req.params.id, {
      code: req.body.code,
      name: req.body.name,
      price: req.body.price,
      location: req.body.location,
      type: req.body.type,
      status: req.body.status,
    }, {new: true})
    if (!data) {
      return res.json({
        message: "Cập nhật thất bại",
        cause: "CSVC không tồn tại",
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

export const deleteGame = handleAsync(async (req, res) => {
  try {
    const data = await Game.findByIdAndRemove(req.params.id)
    if (!data) {
      return res.json({
        message: "Xóa thất bại",
        cause: "CSVC không tồn tại",
      })
    }
    res.json({
      message: "Xóa CSVC thành công",
    })
  } catch (error) {
    res.json({
      message: "Xóa CSVC thất bại",
      error,
    })
  }
})

export const addGameToCusTicket = handleAsync(async(req, res) => {
  try {
    const cusTicketId = req.params.id
    const { gameId, quantity } = req.body
    const data = { gameId, quantity }
    await CusTicket.findOneAndUpdate({ _id: cusTicketId }, { $push: { game: { gameId, quantity } } } )
    res.status(200).json({
      message: "Them tro choi thanh cong",
    })
  } catch (error) {
    res.json({
      message: "Co loi xay ra",
      error,
    })
  }
}) 
