import express from "express";

import {
    dashboard,
    statistics,
    recentProperties,
    recentUsers,
    recentVisits
} from "./admin.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { adminOnly } from "./admin.middleware.js";

const router = express.Router();


/*
|--------------------------------------------------------------------------
| Admin Dashboard
|--------------------------------------------------------------------------
*/

router.get(
    "/dashboard",
    protect,
    adminOnly,
    dashboard
);


/*
|--------------------------------------------------------------------------
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

router.get(
    "/dashboard/statistics",
    protect,
    adminOnly,
    statistics
);


/*
|--------------------------------------------------------------------------
| Recent Properties
|--------------------------------------------------------------------------
*/

router.get(
    "/dashboard/properties",
    protect,
    adminOnly,
    recentProperties
);


/*
|--------------------------------------------------------------------------
| Recent Users
|--------------------------------------------------------------------------
*/

router.get(
    "/dashboard/users",
    protect,
    adminOnly,
    recentUsers
);


/*
|--------------------------------------------------------------------------
| Recent Visits
|--------------------------------------------------------------------------
*/

router.get(
    "/dashboard/visits",
    protect,
    adminOnly,
    recentVisits
);


export default router;