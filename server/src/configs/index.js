const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

const mongooseOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}

export {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    mongooseOptions
}