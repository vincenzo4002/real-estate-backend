import express from "express";

import {
    settings,
    update,
    create,
    banners,
    activeBanners,
    banner,
    updateBannerController,
    removeBanner,
    toggle
} from "./settings.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { adminOnly } from "./admin.middleware.js";

const router = express.Router();


/*
|--------------------------------------------------------------------------
| Platform Settings
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Get Platform Settings
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    protect,
    adminOnly,
    settings
);


/*
|--------------------------------------------------------------------------
| Update Platform Settings
|--------------------------------------------------------------------------
*/

router.patch(
    "/",
    protect,
    adminOnly,
    update
);


/*
|--------------------------------------------------------------------------
| Banner Management
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Get Active Banners
|--------------------------------------------------------------------------
|
| Keep this route BEFORE "/banners/:id"
| so "active" is not treated as an ID.
|
*/

router.get(
    "/banners/active",
    activeBanners
);


/*
|--------------------------------------------------------------------------
| Get All Banners
|--------------------------------------------------------------------------
*/

router.get(
    "/banners",
    protect,
    adminOnly,
    banners
);


/*
|--------------------------------------------------------------------------
| Create Banner
|--------------------------------------------------------------------------
*/

router.post(
    "/banners",
    protect,
    adminOnly,
    create
);


/*
|--------------------------------------------------------------------------
| Get Banner By ID
|--------------------------------------------------------------------------
*/

router.get(
    "/banners/:id",
    protect,
    adminOnly,
    banner
);


/*
|--------------------------------------------------------------------------
| Update Banner
|--------------------------------------------------------------------------
*/

router.patch(
    "/banners/:id",
    protect,
    adminOnly,
    updateBannerController
);


/*
|--------------------------------------------------------------------------
| Toggle Banner
|--------------------------------------------------------------------------
*/

router.patch(
    "/banners/:id/toggle",
    protect,
    adminOnly,
    toggle
);


/*
|--------------------------------------------------------------------------
| Delete Banner
|--------------------------------------------------------------------------
*/

router.delete(
    "/banners/:id",
    protect,
    adminOnly,
    removeBanner
);


export default router;