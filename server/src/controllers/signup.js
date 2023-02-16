import { Customer, MailToken } from "../models"
import nodemailer from 'nodemailer'
import crypto from "crypto";
import { handleAsync } from "../utils";
import { sendEmail } from "../services/signup";




// export const createUser = handleAsync(async(req, res) => {
//     const user = await UserService.create(req.body);
//     const accessToken = jwt.sign(
//         user._id,
//         JWT_SECRET
//       );
//     res.json({
//         data: user,
//         accessToken:accessToken
//     });
// })
export const createUser = handleAsync(async(req, res) => {
    const { email, password, name, phone, address } = req.body;
  try {
    const existUser = await Customer.findOne({ email });

    if (existUser)
      return res.status(400).json({success: false, message: "User already exists" });
    const tk = crypto.randomBytes(32).toString("hex")
    const newUser = await Customer.create({
      email,
      password,
      name,
      phone,
        address,
      activeToken: tk,
      activeExpires: Date.now()  + 86400000
    });

    let token = await new MailToken({
      userId: newUser._id,
      token: tk,
    }).save();

    const message = `${process.env.BASE_URL}:${process.env.PORT}/api/v1/verify/${newUser._id}/${token.token}`;

    const isMailed = await sendEmail(newUser.email, "Verify Account", message);
    console.log(isMailed);
    res.status(200).json({succes: true, msg: "An Email sent to your account please verify"});
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, msg: "Internal Server Error" });
  }
})

export const verifyEmail = async (req, res, next) => {
  try {
    const user = await Customer.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({msg: 'Invalid Link', success: false});
    if(Date.now() > user.activeExpires) return res.status(400).send({msg: 'Token expired', success: false});
    const token = await MailToken.findOne({
      userId: user._id,
      token: req.params.token,
    });
      
    if (!token) return res.status(400).json({msg: 'Invalid Link', success: false});

    await Customer.findByIdAndUpdate(user._id, {status: true });
    await MailToken.findByIdAndRemove(token._id);

    return res.status(200).json({success: true, msg: 'email verified sucessfully'})
  } catch (error) {
      console.log(error);
    return res.status(400).json({success: false,msg:"Internal Server Error"});
  }
};

