// import { Facilities } from "../models"
// import { handleAsync } from "../utils"

// export const getFacilities = handleAsync(async (req, res) => {
//   const data = await Facilities.find()
//   if (!data) {
//     return res.json({
//       message: "Tra cứu CSVC thất bại",
//       cause: "Không có CSVC được ghi nhận trong hệ thống",
//     })
//   }
//   res.json({
//     result: data,
//   })
// })

// export const getOneFacility = handleAsync(async (req, res) => {
//   try {
//     const facility = await Facilities.findById(req.params.id)
//     if (!facility) {
//       return res.json({
//         message: "Tra cứu thất bại",
//         cause: "CSVC không tồn tại",
//       })
//     }
//     res.json({
//       data: facility,
//     })
//   } catch (error) {
//     res.json({
//       message: "Tra cứu thất bại",
//       error,
//     })
//   }
// })

// export const createFacilities = handleAsync(async (req, res) => {
//   try {
//     const data = new Facilities(req.body)
//     await data.save()
//     res.json({
//       message: "Thêm cơ sở vật chất thành công",
//       data,
//     })
//   } catch (error) {
//     res.json({
//       message: "Có lỗi xảy ra",
//       error,
//     })
//   }
// })

// export const updateFacilities = handleAsync(async (req, res) => {
//   try {
//     const data = await Facilities.findByIdAndUpdate(req.params.id, {
//       facilities_code: req.body.facilities_code,
//       name: req.body.name,
//       region: req.body.region,
//       status: req.body.status,
//     })
//     if (!data) {
//       return res.json({
//         message: "Cập nhật thất bại",
//         cause: "CSVC không tồn tại",
//       })
//     }
//     res.json({
//       message: "Cập nhật thành công",
//       data,
//     })
//   } catch (error) {
//     res.json({
//       message: "Có lỗi xảy ra",
//       error,
//     })
//   }
// })

// export const deleteFacilities = handleAsync(async (req, res) => {
//   try {
//     const data = await Facilities.findByIdAndRemove(req.params.id)
//     if (!data) {
//       return res.json({
//         message: "Xóa thất bại",
//         cause: "CSVC không tồn tại",
//       })
//     }
//     res.json({
//       message: "Xóa CSVC thành công",
//     })
//   } catch (error) {
//     res.json({
//       message: "Xóa CSVC thất bại",
//       error,
//     })
//   }
// })
