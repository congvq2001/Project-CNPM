import mongoose from 'mongoose';

const schema = new mongoose.Schema({ 
    email: {
        type: String,
    },
    token: {
        type: String
    }
    });
export const Token = mongoose.model('Token', schema);