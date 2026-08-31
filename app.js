import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./src/modules/auth/auth.routes.js";
import userRoutes from "./src/modules/users/user.routes.js";
import propertyRoutes from "./src/modules/properties/property.routes.js";
import wishlistRoutes from "./src/modules/wishlist/wishlist.routes.js";
import visitRoutes from "./src/modules/visits/visit.routes.js";
import notificationRoutes from "./src/modules/notifications/notification.routes.js";
import messageRoutes from "./src/modules/messages/message.routes.js";
import adminRoutes from "./src/modules/admin/admin.routes.js";

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

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/properties", propertyRoutes);
app.use("/api/v1/wishlist",wishlistRoutes);
app.use("/api/v1/visits",visitRoutes);
app.use("/api/v1/notifications",notificationRoutes);
app.use("/api/v1/messages",messageRoutes);
app.use("/api/v1/admin",adminRoutes);


app.get("/",(req,res)=>{

res.json({

message:
"Real Estate API Running"

});

});



export default app;