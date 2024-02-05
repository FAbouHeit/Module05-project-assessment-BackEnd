import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connect from './config/Config.js';
import cookieParser from "cookie-parser";
import userRouter from "./Routers/User.Router.js";
import productRouter from "./Routers/Product.Router.js";
import orderRouter from "./Routers/Order.Router.js";
dotenv.config();

const PORT = process.env.PORT || 6666;
const app = express();
app.use(express.json());
app.use(express.static('public'))
app.use('/images', express.static('images'))

const corsOption = {
    origin: process.env.FRONT_END_PATH,
    credentials: true,
    optionsSuccessStatus: 200,
}

app.use(cookieParser());
app.use(cors(corsOption));
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);


app.listen(PORT, ()=>{
    connect();
    console.log(`running on port: ${PORT}`);
    if(PORT === 6666){
        console.log("ERROR: issue reading port from process.env. Continue with caution! ...");
    }
})