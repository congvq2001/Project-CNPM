import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const staffSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true },
    name: {type:String, required: true},
    phone: { type: String ,required: true},
    address: { type: String },
    role: { type: String, enum: ["nvLeTan","nvQuay", "quanLy"] },
    status: {type: Boolean, default: true}
}, { timestamps: true })

staffSchema.pre('save', async function (next) {
    const staff = this
    if (staff.isModified('password')) {
        staff.password = await bcrypt.hash(staff.password, 8)
    }
    next()
})

staffSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error()
    }
};

export const Staff = mongoose.model("staff", staffSchema);

