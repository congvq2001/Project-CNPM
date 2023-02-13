import mongoose from "mongoose";

const cusTicketSchema = mongoose.Schema({
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'ticket' },
    cusId: {type: mongoose.Schema.Types.ObjectId,ref: 'customer', default: process.env.DEFAULT_CUS_ID},
    quantity: { type: Number, default: 1 },
    cusName: { type: String},
    cusPhone: { type: String, required: true},
    isPreOrder: { type: Boolean, default: false},
    isVip: { type: Boolean, required: true },
    loyalty: {type:Boolean ,required :true},
    price: { type: Number, required: true },
    game: [{
        gameId: {type: mongoose.Schema.Types.ObjectId, ref: 'gameTicket' },
        quantity: Number
        }
    ],
    overPrice: { type: Number, default: 0 }
}, {timestamps: true})

export const CusTicket =  mongoose.model('cusTicket', cusTicketSchema)