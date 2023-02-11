import mongoose from "mongoose";

const customerEventSchema = mongoose.Schema({
    cusId: { type: mongoose.Schema.Types.ObjectId, ref: 'customer'},
    quantity: { type: Number, default: 1 },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'event' },
},{timestamps:true})

export const CustomerEvent =  mongoose.model('customerEvent', customerEventSchema)