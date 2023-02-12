import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
    code: {type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    location: String,
    type: { type: String, enum: ['Casual', 'Other'] },
    status: {type: String, enum: ['Updating', 'Fixing','Active', 'Inactive']}
})

export const Game = mongoose.model("game", gameSchema);