// import {Demo, User,Staff} from '../models';
import bcrypt from 'bcrypt';


export const checklogin = async (data) => {
    const {phoneNumber,password} = data
    try {
        const user = await User.findOne({ phoneNumber})
        if (!user) throw new Error()
        const isMatch = await user.isValidPassword(password)
        if (!isMatch) throw new Error()
        return user
    } catch (error) {
        if (error) return 'Error'
    }
}

export const checkloginStaf = async (data) => {
    const {phoneNumber,password} = data
    try {
        const user = await Staff.findOne({ phoneNumber})
        if (!user) throw new Error()
        const isMatch = await user.isValidPassword(password)
        if (!isMatch) throw new Error()
        return user
    } catch (error) {
        if (error) return 'Error'
    }
}

export const checkloginStaff = async (data) => {
    const {phoneNumber,password} = data
    try {
        const staff = await Staff.findOne({ phoneNumber})
        if (!staff) throw new Error()
        const isMatch = await staff.isValidPassword(password)
        if (!isMatch) throw new Error()
        return data
    } catch (error) {
        if (error) return 'Error'
    }
}