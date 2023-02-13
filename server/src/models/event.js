import mongoose  from 'mongoose';

const eventSchema = new mongoose.Schema({
    image : {
        type: [String],
        require: true, 
    },
    name: {
        type: String,
        require: true,
        unique: true
    },
    time_start: {
        type: Date,
        require: true
    },
    time_end: {
        type:Date,
        require: true,

    },
    description: {
        type: String, 
        require: true, 
    },
    detail: {
        type: String,
        require: true
    },
    discount: {
        type: Number,
        require: true
    }
})

export const Event = mongoose.model('Event', eventSchema)