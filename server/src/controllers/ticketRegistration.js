// //import { Vip_transition } from "../models/vip_transition";
// import { Demo, User,Ticket } from "../models";

// export const createVipTicket = async (req, res, next) => {
//   try {
//     const data = req.body;
//     // const userId = req.user.userId;


//     // const checkStaff = await Staff.findById(userId);

//     // if (checkStaff.role !== 2) {
//     //   return res.status(400).json({ success: false, message: "Not Found" });
//     // }

//     const checkUser = await User.findById(data.id_user);

//     if (!checkUser) {
//       return res.status(400).json({ success: false, message: "Not Found" });
//     }

//     const ticket = await Ticket.findOne({
//       type: { $elemMatch: { _id: data.id_ticket } },
//     },{type:1});

//     const typeTicket = ticket.type[0];

//     let time_expired=new Date();

//     if(typeTicket.kindOfTime=='month'){
//       time_expired.setMonth(time_expired.getMonth()+typeTicket.time);
//     }else if(typeTicket.kindOfTime=='day'){
//       time_expired.setDate(time_expired.getDate()+typeTicket.time);
//     }

//     await checkUser.updateOne({
//       $set: { is_vip: true,timeVip:time_expired},
//     });
 
//     res.status(200).json({ success: true, message: "Register success" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR" });
//   }
// };
