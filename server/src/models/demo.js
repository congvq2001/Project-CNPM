import mongoose from 'mongoose';

const demoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

export const Demo = mongoose.model('Demo', demoSchema);