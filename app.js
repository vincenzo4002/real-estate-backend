import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes.js";


const app = express();



app.use(cors({
origin:"*",
credentials:true
}));


app.use(express.json());


app.use(express.urlencoded({
extended:true
}));


app.use(cookieParser());


app.use(helmet());


app.use(morgan("dev"));



app.use(
"/api/v1/auth",
authRoutes
);



app.get("/",(req,res)=>{

res.json({

message:
"Real Estate API Running"

});

});



export default app;