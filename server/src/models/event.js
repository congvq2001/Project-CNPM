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
    timeStart: {
        type: Date,
        require: true
    },
    timeEnd: {
        type:Date,
        require: true,

    },
    description: {
        type: String, 
        require: true, 
    },
    price: {
        type: Number,
        require: true
    }
})

export const Event = mongoose.model('event', eventSchema)
