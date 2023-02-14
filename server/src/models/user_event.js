import mongoose from 'mongoose';

const user_eventSchema = new mongoose.Schema({
    id_user: {
        type: String,
        require: true,

    },
    id_event: {
        type: String,
        require: true
    }
})

export const User_event = mongoose.model('User_event', user_eventSchema)