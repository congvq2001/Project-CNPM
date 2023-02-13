import express from "express"
import {
  checkLogin,
  createUser,
  checkLoginStaff,
  createStaff,
  CreateTicket,
  UserBuyTicket,
  updateTicket,
  deleteTicket,
  createGame,
  updateGame,
  deleteGame,
  getOneGame,
  createEvent,
  updateEvent,
  deleteEvent,
  // createVipTicket,
  latestEvents,
  getOneEvent,
  getAllEvent,
  // createTypeTicket,
  infoTicket,
  // updateTypeTicket,
  userTicket,
  // deleteTypeTickte,
  UserRegisterEvent,
  participantsEvent,
  checkInTicket,
  checkoutTicket,
  getStaffs,
  updateStaff,
  deleteStaff,
  getCustomers,
  updateUser,
  deleteUser,
  getIncome,
  //getPersonalInfo,
  //personalUpdateUser,
  getGame,
  userJoinEvents,
  getOneStaff,
  getSpecificTicket,
  getSpecificUser,
  getEventTickets,
  getAllTicket,
  addGameToCusTicket,
  searchUsers,
  getUserInfo
  // UserBuyTicketWithoutToken
} from "../controllers"
import { createFeedBack, deleteFeedback, locFeedback, viewFeedback } from "../controllers/feedback"
import {
  validateLogin,
  validateSignup,
  validateSignupStaff,
  verifyToken,
  isAuth,
  isManager,
  validateViewIncome,
} from "../middlewares"

const router = express.Router()

router.post("/login", validateLogin, checkLogin)
router.post("/login-staff", validateLogin, checkLoginStaff)
//router.post("/logout", logout)
router.post("/signup", validateSignup, createUser)
router.post("/signup-staff", validateSignupStaff, createStaff)

// router.get("/userInfo", verifyToken, isAuth, getPersonalInfo)
// router.patch("/userInfo", verifyToken,isAuth, personalUpdateUser)

router.post("/ticket", CreateTicket)
router.get("/ticket/:id", infoTicket)
router.patch("/ticket/:id", updateTicket)
router.delete("/ticket/:id", deleteTicket)
router.get("/ticket", getAllTicket)
router.get("/eventTicket", getEventTickets)

// router.put("/typeTicket/:id", createTypeTicket)
// router.delete("/typeTicket/:id/:typeId", deleteTypeTickte)
// router.put("/ticket/:id/:typeId", updateTypeTicket)
router.get("/ticket/user/:userId", userTicket)

// router.put("/typeTicket/:id", createTypeTicket)
// router.put("/ticket/:id/:typeId", updateTypeTicket)
router.post("/ticketIncome", validateViewIncome, getIncome)

router.get("/game", getGame)
router.get("/game/:id", getOneGame)
router.post("/game", createGame)
router.patch("/game/:id", updateGame)
router.delete("/game/:id", deleteGame)




router.get("/staff",verifyToken, isManager, getStaffs)
router.get("/staff/:id",verifyToken,isAuth, getOneStaff)
router.patch("/staff/:id",verifyToken,isAuth, updateStaff)
router.delete("/staff/:id", verifyToken, isAuth, deleteStaff)
router.post("/staff", verifyToken, isManager, createStaff)

router.get("/customer",verifyToken, isAuth, isManager, getCustomers)
router.post("/customer",verifyToken, isManager, createUser)
router.patch("/customer/:id",verifyToken, isAuth, updateUser)
router.delete("/customer/:id",verifyToken, isAuth, deleteUser)
router.get("/customer/:id", verifyToken, isAuth, getSpecificUser)
router.get("/customerInfo",verifyToken,getUserInfo )

router.post("/customerEvent/:id", verifyToken, UserRegisterEvent)
router.get("/customerEvent", verifyToken, userJoinEvents)

router.post("/event", createEvent) 
router.get("/event/:id", getOneEvent)
router.patch("/event/:id", updateEvent)
router.delete("/event/:id", deleteEvent)
router.get("/latestEvent", latestEvents)
router.get("/event", getAllEvent)
router.get("/event/user/:id", participantsEvent)

//router.post("/user-buy-ticket", verifyToken, UserBuyTicket)
//router.post("/ticket-vip", createVipTicket)

router.put("/staff/checkin", checkInTicket)
router.put("/staff/checkout/:id", checkoutTicket)
router.put("/staff/addGame/:id", addGameToCusTicket)
router.post("/staff/searchByPhone/:id",searchUsers)

router.get("/userTicket/:id", getSpecificTicket)
// router.get("/iduser/:phoneNumber", getSpecificUser)
// router.post("/userbuyticketwithouttoken", UserBuyTicketWithoutToken)

router.post("/feedback/user", verifyToken, createFeedBack)
router.get("/feedback", viewFeedback)
router.post("/feedback/find", locFeedback)
router.delete("/feedback/:id",deleteFeedback)

export default router
