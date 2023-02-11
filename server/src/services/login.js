// import {Demo, User,Staff} from '../models';
import bcrypt from 'bcrypt';
import { Customer, Staff } from '../models/';

export const checklogin = async (data) => {
    const {email,password} = data
    try {
        const user = await Customer.findOne({ email })
        if (!user) throw new Error()
        const isMatch = await user.isValidPassword(password)
        if (!isMatch) throw new Error()
        return user
    } catch (error) {
        if (error) return 'Error'
    }
}

export const checkloginStaff = async (data) => {
    const {email,password} = data
    try {
        const staff = await Staff.findOne({ email })
        if (!staff) throw new Error()
        const isMatch = await staff.isValidPassword(password)
        if (!isMatch) throw new Error()
        return staff
    } catch (error) {
        if (error) return 'Error'
    }
}