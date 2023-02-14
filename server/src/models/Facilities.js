import mongoose from 'mongoose';

const facilitiesSchema = new mongoose.Schema({
    facilities_code: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,

    },
    region: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    }
})

export const Facilities = mongoose.model('Facilities', facilitiesSchema)