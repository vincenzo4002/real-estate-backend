import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";


const app = express();



app.use(
    cors({
        origin:"*",
        credentials:true
    })
);


app.use(express.json());


app.use(express.urlencoded({
    extended:true
}));


app.use(cookieParser());


app.use(helmet());


app.use(morgan("dev"));



app.get("/",(req,res)=>{

    res.json({
        success:true,
        message:"Real Estate API Running"
    });

});



export default app;