import {app} from './app';
import mongoose from 'mongoose';
import {PORT, MONGODB_URI, mongooseOptions} from '../configs';

export const startServer = async() => {
    try {
        await Promise.all([
            mongoose.connect(MONGODB_URI, mongooseOptions),
            mongoose.set('debug', true),
            app.listen(PORT)
        ]);
        console.log(`Server running on port ${PORT}, connected to db`);
    }
    catch(error) {
        console.log(error);
    }
};

