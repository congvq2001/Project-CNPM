import { Event, Customer, CustomerEvent, Ticket } from "../models";
import { handleAsync } from "../utils";

export const createEvent = handleAsync(async (req, res) => {
  try {
    const { image, name, timeStart, timeEnd, description, price } = req.body;
    const data = new Event({
      image,
      name,
      timeStart,
      timeEnd,
      description,
      price,
    });
    await data.save();
    await Ticket.create({ ticketType: "Event", name: `Ve cua su kien ${data.name}`, price: data.price , eventId: data._id})
    res.json({
      success: true,
      message: "Tạo sự kiện thành công",
      data,
    });
  } catch (error) {
    res.json({
      message: "Có lỗi xảy ra",
      error,
    });
  }
});

export const updateEvent = handleAsync(async (req, res) => {
  try {
    const data = await Event.findByIdAndUpdate(req.params.id, {
      timeStart: req.body.timeStart,
      timeEnd: req.body.timeEnd,
      description: req.body.description,
      detail: req.body.detail,
      image: req.body.image,
      name: req.body.name,
    }, {new: true});
    if (!data) {
      return res.json({
        message: "Cập nhật thất bại",
        cause: "Vé không tồn tại",
      });
    }
    res.json({
      success: true,
      message: "Cập nhật thành công",
      data,
    });
  } catch (error) {
    res.json({
      message: "Có lỗi xảy ra",
      error,
    });
  }
});

export const deleteEvent = handleAsync(async (req, res) => {
  try {
    const data = await Event.findByIdAndRemove(req.params.id);
    if (!data) {
      return res.json({
        message: "Xóa thất bại",
        cause: "Vé không tồn tại",
      });
    }
    res.json({
      success: true,
      message: "Xóa vé thành công",
    });
  } catch (error) {
    res.json({
      message: "Xóa vé thất bại",
      error,
    });
  }
});

export const UserRegisterEvent = handleAsync(async (req, res) => {
  try {
    const isExistTicket = await Event.findById(req.body.id_event);
    const isExistUser = await User.findById(req.user.userId);
    if (!isExistTicket && !isExistUser) {
      return res.status(200).json({
        status: 404,
        message: "Vé hoặc người mua vé không tồn tại",
      });
    }
    const ev = { ...req.body, id_user: req.user.userId };
    const data = new User_event(ev);
    const { description, image, detail, ...event } = isExistTicket._doc;
    const { password, createdAt, email, ...users } = isExistUser._doc;

    await data.save();
    res.json({
      success: true,
      message: "Mua vé thành công",
      data: { ...users, ...event },
    });
  } catch (error) {
    res.json({
      message: "Có lỗi xảy ra",
      error,
    });
  }
});

//Get the latest 3 events
export const latestEvents = async (req, res, next) => {
  try {
    const listEvent = await Event.find()
      .sort({ timeStart: -1 })
      .limit(3)
          .exec();
    res
      .status(200)
      .json({ success: true, message: "Get event success", result: listEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR" });
  }
};

//Get id event
export const getOneEvent = async (req, res) => {
  const idParam = req.params.id;

  try {
    const event = await Event.findById({ _id: idParam });
    if (!event) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Get event success", result: event });
  } catch (error) {
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR" });
  }
};

//all events
export const getAllEvent = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skipIndex = (page - 1) * limit;

  try {
    const events = await Event.find()
      .sort({ time_start: -1 })
      .skip(skipIndex)
      .limit(limit)
      .exec();
//doan nay` hay
    res
      .status(200)
      .json({ success: true, message: "Get event success", result: events });
  } catch (error) {
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR" });
  }
};

//Get Information of event participants
export const participantsEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Not Found Event" });

    const participants = await User_event.find({ id_event: eventId });

    const userId = participants.map((item, index) => item.id_user);

    const users = await User.find({ _id: { $in: userId } }, { password: 0 });

    res.status(200).json({
      success: true,
      message: "Information of event participants",
      result: users,
      event,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR" });
  }
};
