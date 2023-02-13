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
          cusName,
          cusPhone,
          isVip :  cusId?.isVip ? true :false,
          price: cusId?.isVip ? data.price  * 0.8 : data.price ,
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
export const checkoutTicket = async (req, res, next) => {
  try {
    const cusTicket = await CusTicket.findById(req.params.id).populate('game.gameId').exec();
    const ticket = await Ticket.findById(cusTicket.ticketId)
      if (!cusTicket || cusTicket.status === -1) {
          return res.json({
              message: "Có lỗi xảy ra",
          });
      }      
      let overPrice = 0;
      const game = cusTicket.game.forEach((item) => overPrice+=item.gameId.price *item.quantity);
      console.log(game)

    if(ticket.timeLimit){
        const timeCheckIn=new Date(cusTicket.createdAt);
        const timeCheckOut = new Date();
        console.log(timeCheckIn , timeCheckOut)
        const time = Math.abs(timeCheckOut - timeCheckIn) / 1000 / 60;
        console.log(time)
        if(time>ticket.timeLimit){
          const overTime=Math.floor((time-ticket.timeLimit)/30)*50000;
          overPrice += overTime;
        }
    }
    const checkedTicket = await CusTicket.findOneAndUpdate({_id: req.params.id},{ $set: { updatedAt : Date.now ,price: cusTicket.price + overPrice , overPrice: overPrice, status: -1} }, { new: true});

    res.status(200).json({ status: true, message: "Checkout success",checkedTicket});
  } catch (error) {
    res.json({
      message: "Có lỗi xảy ra",
      error: error.message,
    });
  }
};

// //Tra cứu thông tin vé user
export const searchUsers = async (req, res, next) => {
  try {
    const phoneNumber = req.body.phone;
    const eventId = req.params.id
    const findUser = await Customer.findOne({ phone: phoneNumber }).select('_id');
    const user = await CustomerEvent.findOne({ eventId: eventId, cusId: findUser})
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Not found user" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Search user success",
        result: user
      });
  } catch (error) {
    console.log(error)
    res.json({
      message: "Có lỗi xảy ra",
      error: error.message,
    });
  }
};
