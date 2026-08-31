import express from "express";

import {
    reports,
    propertyAnalytics,
    userAnalytics,
    visitAnalytics,
    messageAnalytics,
    monthlyProperties,
    monthlyUsers
} from "./report.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { adminOnly } from "./admin.middleware.js";

const router = express.Router();


/*
|--------------------------------------------------------------------------
| Complete Reports
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    protect,
    adminOnly,
    reports
);


/*
|--------------------------------------------------------------------------
| Property Analytics
|--------------------------------------------------------------------------
*/

router.get(
    "/properties",
    protect,
    adminOnly,
    propertyAnalytics
);


/*
|--------------------------------------------------------------------------
| User Analytics
|--------------------------------------------------------------------------
*/

router.get(
    "/users",
    protect,
    adminOnly,
    userAnalytics
);


/*
|--------------------------------------------------------------------------
| Visit Analytics
|--------------------------------------------------------------------------
*/

router.get(
    "/visits",
    protect,
    adminOnly,
    visitAnalytics
);


/*
|--------------------------------------------------------------------------
| Message Analytics
|--------------------------------------------------------------------------
*/

router.get(
    "/messages",
    protect,
    adminOnly,
    messageAnalytics
);


/*
|--------------------------------------------------------------------------
| Monthly Property Analytics
|--------------------------------------------------------------------------
*/

router.get(
    "/properties/monthly",
    protect,
    adminOnly,
    monthlyProperties
);


/*
|--------------------------------------------------------------------------
| Monthly User Analytics
|--------------------------------------------------------------------------
*/

router.get(
    "/users/monthly",
    protect,
    adminOnly,
    monthlyUsers
);


export default router;