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
import propertyAdminRoutes from "./src/modules/admin/property-admin.routes.js";
import userAdminRoutes from "./src/modules/admin/user-admin.routes.js";
import reportRoutes from "./src/modules/admin/report.routes.js";
import settingsRoutes from "./src/modules/admin/settings.routes.js";

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
app.use("/api/v1/admin/properties",propertyAdminRoutes);
app.use("/api/v1/admin/customers",userAdminRoutes);
app.use("/api/v1/admin/reports",reportRoutes);
app.use("/api/v1/admin/settings",settingsRoutes);

app.get("/",(req,res)=>{

res.json({

message:
"Real Estate API Running"

});

});



export default app;