import { User, User_ticket, Ticket,User_event,Event } from "../models";

export const checkInTicket = async (req, res, next) => {
  try {
    const data = req.body;
   
    // if (staff.role !==1) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Only the front desk can check in" });
    // }
    const ticket = await User_ticket.findById(data.idUserTicket);
    let idut=' ';

    //console.log('ticket',ticket)
    if (ticket) {
      await ticket.updateOne({ $set: { time_checkin: data.time_checkin } });
      return res.status(200).json({ status: true, message: "Checkin success" });
    } else {
      const isExistTicket = await Ticket.find({
        type: { $elemMatch: { _id: req.body.id_ticket } },
      });
      if (!isExistTicket) {
        return res.status(200).json({
          status: 404,
          message: "Vé hoặc người mua vé không tồn tại",
        });
      }
      const userTicket = new User_ticket(req.body);
      idut=userTicket._id;
      await userTicket.save();
    }

    res.status(200).json({ status: true, message: "Checkin success", id:idut });
  } catch (error) {
    res.json({
      message: "Có lỗi xảy ra",
      error:error.message,
    });
  }
};

/////
export const checkoutTicket = async (req, res, next) => {
  // const idStaff = req.user.userId;
  const sale=[];
  try {
    const data = req.body;
    // const staff = await Staff.findById(idStaff);
    // if (staff.role !== 2) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Only the front desk can check in" });
    // }
    
    const ticket = await User_ticket.findById(data.idUserTicket);

    if (!ticket) {
      res.json({
        message: "Có lỗi xảy ra",
      });
    }
    
    const titleTicket = await Ticket.findOne({
      type: { $elemMatch: { _id: ticket.id_ticket } },
    });

    // let priceTicket=titleTicket.type.find((item,index)=>item._id==ticket.id_ticket).price;
    let priceTicket=ticket.price;
    const checkVipUser=await User.findById(ticket.id_user);
    if(checkVipUser){
    if(checkVipUser.is_vip){
      sale.push({content:"Vip",sale:"20"});
      priceTicket=priceTicket-priceTicket*0.2
    }

    const participants = await User_event.find({ id_user: ticket.id_user });
    const Idevents = participants.map((item, index) => item.id_event);
    const events = await Event.find({ _id: { $in: Idevents } }).sort({discount:-1});

    if(participants){
      sale.push({content:"Event",sale:"20"});
      priceTicket=priceTicket-priceTicket*events[0].discount/100;
    }
  }
    let phat=titleTicket.type[0]
    if(ticket.id_ticket==phat._id){
        const timeCheckIn=new Date(ticket.time_checkin);
        const timeCheckOut=new Date(data.time_checkout);
        const time=Math.abs(timeCheckOut-timeCheckIn)/1000/60-2*60; 
        if(time>=0){
          const overTime=50000/30*time;
          priceTicket +=overTime;
        }
    }

    await ticket.updateOne({ $set: { time_checkout: data.time_checkout,price:priceTicket } });

    res.status(200).json({ status: true, message: "Checkout success",ticket,priceTicket });
  } catch (error) {
    res.json({
      message: "Có lỗi xảy ra",
      error: error.message,
    });
  }
};


//Tra cứu thông tin vé user
export const searchUsers = async (req, res, next) => {
  try {
    const phoneNumber = req.body.phoneNumber;

    const user = await User.find(
      { phoneNumber: { $regex: ".*" + phoneNumber + ".*" } },
      {
        phoneNumber: 1,
      }
    );
    if (user.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: "Not found user" });
    }
    const listUser = user.map((item, index) => {
      return item.phoneNumber;
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Search user success",
        result: listUser,
      });
  } catch (error) {
    res.json({
      message: "Có lỗi xảy ra",
      error: error.message,
    });
  }
};