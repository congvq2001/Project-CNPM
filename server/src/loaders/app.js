import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {router} from '../routes';
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "2mb" }));
app.use('/api/v1/', router);


export {
    app
}