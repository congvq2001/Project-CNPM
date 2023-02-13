import { handleAsync } from "../utils"
import {
  createLogin,
  signupInput,
  signupInputStaff,
  incomeInput,
} from "../validators"
import jwt from "jsonwebtoken"

export const validateLogin = handleAsync(async (req, res, next) => {
  await createLogin.validateAsync(req.body)
  next()
})

export const validateSignup = handleAsync(async (req, res, next) => {
  console.log(req.body)

  try {
    await signupInput.validateAsync(req.body)
    next()
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: "400",
      message: "validate fail",
    })
  }
})

export const validateSignupStaff = handleAsync(async (req, res, next) => {
  console.log(req.body)
  try {
    await signupInputStaff.validateAsync(req.body)
    next()
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: "400",
      message: "validate fail",
    })
  }
})

export const verifyToken = async(req, res, next) => {
    try {
      const authHeader = req.headers?.authorization
      console.log(req.headers);
        const token = authHeader && authHeader.split(" ")[1]; 
        if (!token) {
            return res.status(403).send({message: "missing token"})
        } 
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) return res.status(403).send({ message: error })
            req.user = user
            next()
        })

    } catch (error) {
        console.log(error)
    }
}

export const isAuth = async (req, res, next) => {
    try {
        let loggedInUserId = req.params.id;
        //manager always auth
        if(req.user.role != "quanLy")
            if (!loggedInUserId || !req.user.userId || loggedInUserId !== req.user.userId) 
                return res.status(403).json({ msg: "You are not authenticate" });
        next()
    } catch (error) {
        return res.status(404).json({msg: error});
    }
}

export const isManager = async (req, res, next) => {
    try {
        if (!req.user.role) return res.status(400).json({ msg: "missing role" })
        if (req.user.role !== 'quanLy') //only manager can create staff
            return res.status(403).json({ msg: 'you are not the manager' })
        next()
    } catch (error) {
        return res.status(404).json({msg: error});
    }
}


export const validateViewIncome = handleAsync(async (req, res, next) => {
  console.log(req.body)

  try {
    await incomeInput.validateAsync(req.body)
    next()
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: "400",
      message: "validate fail",
    })
  }
})
