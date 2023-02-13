import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
    code: String,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    location: String,
    type: { type: String, enum: ['Casual', 'Other'] },
    status: {type: String, enum: ['Updating', 'Fixing','Active', 'Inactive']}
})

export const Game = mongoose.model("game", gameSchema);