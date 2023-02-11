import express from "express"
import {
  checkLogin,
  logout,
  createUser,
  checkLoginStaff,
  createStaff,
  // CreateTicket,
  // UserBuyTicket,
  // updateTicket,
  // deleteTicket,
  // createFacilities,
  // updateFacilities,
  // deleteFacilities,
  // getOneFacility,
  // createEvent,
  // updateEvent,
  // deleteEvent,
  // createVipTicket,
  // latestEvents,
  // getOneEvent,
  // getAllEvent,
  // createTypeTicket,
  // infoTicket,
  // updateTypeTicket,
  // userTicket,
  // deleteTypeTickte,
  // UserRegisterEvent,
  // participantsEvent,
  // checkInTicket,
  // checkoutTicket,
  // getStaff,
  // updateStaff,
  // deleteStaff,
  // getUSer,
  // updateUser,
  // deleteUser,
  // getIncome,
  // getPersonalInfo,
  // personalUpdateUser,
  // getFacilities,
  // userJoinEvents,
  // getOneStaff,
  // getTicketTypes,
  // getSpecificTicket,
  // getSpecificUser,
  // UserBuyTicketWithoutToken
} from "../controllers"
import {
  validateLogin,
  validateSignup,
  validateSignupStaff,
  signedIn,
  validateViewIncome,
} from "../middlewares"

const router = express.Router()

router.post("/login", validateLogin, checkLogin)
router.post("/login-staff", validateLogin, checkLoginStaff)
router.post("/logout", logout)
router.post("/signup", validateSignup, createUser)
router.post("/signup-staff", validateSignupStaff, createStaff)

// router.get("/userInfo", signedIn, getPersonalInfo)
// router.patch("/userInfo", signedIn, personalUpdateUser)

// router.post("/ticket", CreateTicket)
// router.get("/ticket/:id", infoTicket)
// router.patch("/ticket/:id", updateTicket)
// router.delete("/ticket/:id", deleteTicket)
// router.get("/ticket", getTicketTypes)

// router.put("/typeTicket/:id", createTypeTicket)
// router.delete("/typeTicket/:id/:typeId", deleteTypeTickte)
// router.put("/ticket/:id/:typeId", updateTypeTicket)
// router.get("/ticket/user/:userId", userTicket)

// router.put("/typeTicket/:id", createTypeTicket)
// router.put("/ticket/:id/:typeId", updateTypeTicket)
// router.post("/ticketIncome", validateViewIncome, getIncome)

// router.get("/facilities", getFacilities)
// router.get("/facilities/:id", getOneFacility)
// router.post("/facilities", createFacilities)
// router.patch("/facilities/:id", updateFacilities)
// router.post("/userEvent", signedIn, UserRegisterEvent)
// router.delete("/facilities/:id", deleteFacilities)
// router.post("/Event", createEvent)

// router.get("/event/user/:id", participantsEvent)

// router.get("/staff", getStaff)
// router.get("/staff/:id", getOneStaff)
// router.patch("/staff/:id", updateStaff)
// router.delete("/staff/:id", deleteStaff)

// router.get("/users", getUSer)
// router.post("/users", createUser)
// router.get("/user/event", signedIn, userJoinEvents)
// router.patch("/users/:id", updateUser)
// router.delete("/users/:id", deleteUser)

// router.get("/event/:id", getOneEvent)
// router.patch("/Event/:id", updateEvent)
// router.delete("/Event/:id", deleteEvent)
// router.get("/latestEvents", latestEvents)
// router.get("/allEvent", getAllEvent)

// router.post("/user-buy-ticket", signedIn, UserBuyTicket)
// router.post("/ticket-vip", createVipTicket)

// router.put("/staff/checkin", checkInTicket)
// router.put("/staff/checkout", checkoutTicket)

// router.get("/userTicket/:id", getSpecificTicket)
// router.get("/iduser/:phoneNumber", getSpecificUser)
// router.post("/userbuyticketwithouttoken", UserBuyTicketWithoutToken)
export default router
