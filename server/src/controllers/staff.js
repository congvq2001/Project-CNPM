import { Customer, CusTicket, Ticket, CustomerEvent, Event } from "../models";

export const checkInTicket = async (req, res, next) => {
  try {
    const { ticketId, cusId, quantity, cusName, cusPhone } =
      req.body;
    let idut = " ";
    const data = await Ticket.findById(ticketId);
    if (data.ticketType === "Event") {
      const cus = await Customer.findById(cusId);
      const ticket = await CustomerEvent.findOne({
        eventId: data.eventId,
        cusId: cusId,
      });
      if (ticket) {
        const checkInTicket = await CusTicket.create({
          ticketId,
          cusId,
          quantity: ticket.quantity,
          cusName: cus.name,
          cusPhone: cus.phone,
          isPreOrder: true,
          isVip: cus.isVip,
          price: cus.isVip
            ? data.price * ticket.quantity * 0.8
            : data.price * ticket.quantity * 0.64,
        });
        return res
          .status(200)
          .json({
            status: true,
            message: "Checkin success",
            data: checkInTicket,
          });
      } else {
        const userTicket = await CusTicket.create({
          ticketId,
          cusId,
          quantity,
          cusName,
          cusPhone,
          isVip : cusId?.isVip ? true :false,
          price: cusId?.isVip ? data.price * quantity * 0.8 : data.price * quantity,
        });
        return res
          .status(200)
          .json({ status: true, message: "Checkin success", data: userTicket});
      }
    }
    const userTicket = await CusTicket.create({
          ticketId,
          cusId,
          quantity,
          cusName,
          cusPhone,
          isVip :  cusId?.isVip ? true :false,
          price: cusId?.isVip ? data.price * quantity * 0.8 : data.price * quantity,
        });
        return res
          .status(200)
          .json({ status: true, message: "Checkin success", data: userTicket});
  } catch (error) {
    console.log(error);
    res.json({
      message: "Có lỗi xảy ra",
      error: error.message,
    });
  }
};

// /////
// export const checkoutTicket = async (req, res, next) => {
//   // const idStaff = req.user.userId;
//   const sale=[];
//   try {
//     const data = req.body;
//     // const staff = await Staff.findById(idStaff);
//     // if (staff.role !== 2) {
//     //   return res
//     //     .status(400)
//     //     .json({ success: false, message: "Only the front desk can check in" });
//     // }

//     const ticket = await User_ticket.findById(data.idUserTicket);

//     if (!ticket) {
//       res.json({
//         message: "Có lỗi xảy ra",
//       });
//     }

//     const titleTicket = await Ticket.findOne({
//       type: { $elemMatch: { _id: ticket.id_ticket } },
//     });

//     // let priceTicket=titleTicket.type.find((item,index)=>item._id==ticket.id_ticket).price;
//     let priceTicket=ticket.price;
//     const checkVipUser=await User.findById(ticket.id_user);
//     if(checkVipUser){
//     if(checkVipUser.is_vip){
//       sale.push({content:"Vip",sale:"20"});
//       priceTicket=priceTicket-priceTicket*0.2
//     }

//     const participants = await User_event.find({ id_user: ticket.id_user });
//     const Idevents = participants.map((item, index) => item.id_event);
//     const events = await Event.find({ _id: { $in: Idevents } }).sort({discount:-1});

//     if(participants){
//       sale.push({content:"Event",sale:"20"});
//       priceTicket=priceTicket-priceTicket*events[0].discount/100;
//     }
//   }
//     let phat=titleTicket.type[0]
//     if(ticket.id_ticket==phat._id){
//         const timeCheckIn=new Date(ticket.time_checkin);
//         const timeCheckOut=new Date(data.time_checkout);
//         const time=Math.abs(timeCheckOut-timeCheckIn)/1000/60-2*60;
//         if(time>=0){
//           const overTime=50000/30*time;
//           priceTicket +=overTime;
//         }
//     }

//     await ticket.updateOne({ $set: { time_checkout: data.time_checkout,price:priceTicket } });

//     res.status(200).json({ status: true, message: "Checkout success",ticket,priceTicket });
//   } catch (error) {
//     res.json({
//       message: "Có lỗi xảy ra",
//       error: error.message,
//     });
//   }
// };

// //Tra cứu thông tin vé user
// export const searchUsers = async (req, res, next) => {
//   try {
//     const phoneNumber = req.body.phoneNumber;

//     const user = await User.find(
//       { phoneNumber: { $regex: ".*" + phoneNumber + ".*" } },
//       {
//         phoneNumber: 1,
//       }
//     );
//     if (user.length == 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Not found user" });
//     }
//     const listUser = user.map((item, index) => {
//       return item.phoneNumber;
//     });

//     res
//       .status(200)
//       .json({
//         success: true,
//         message: "Search user success",
//         result: listUser,
//       });
//   } catch (error) {
//     res.json({
//       message: "Có lỗi xảy ra",
//       error: error.message,
//     });
//   }
// };
