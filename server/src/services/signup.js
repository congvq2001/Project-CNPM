import { Customer} from "../models"
import nodemailer from 'nodemailer'

export const getAll = async () => {
  return await Customer.find({}).select('-password')
}

export const create = async (data) => {
  const { email, password, name , phone, address} = data
  const user = new Customer({
    phone,
    email,
    password,
    name,
    address
  })
  return await user.save()
}

export const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_PASS
            }
        })

        const mainOptions = {
            from: 'TinkerBell Garden',
            to: email,
            subject: subject,
            text: text
        }

        await transporter.sendMail(mainOptions);
        return true
    } catch (error) {
        console.log(error)
        throw new Error()
    }
}