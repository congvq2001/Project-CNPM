import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    ticketType: { type: String, enum: ['Event', 'Casual', 'Unlimited'], required: true },
    name: { type: String, required: true },
    timeLimit :{type: Number, default: 0},
    price: { type: Number, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'event' }
}, { timestamps: true })

export const Ticket =  mongoose.model('ticket', ticketSchema)
