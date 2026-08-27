import express from "express";

import {
    list,
    unreadCount,
    details,
    markAsRead,
    markAllAsRead,
    remove,
    removeRead
} from "./notification.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();


/*
|--------------------------------------------------------------------------
| Notification Routes
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Get All Notifications
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    protect,
    list
);


/*
|--------------------------------------------------------------------------
| Get Unread Notification Count
|--------------------------------------------------------------------------
*/

router.get(
    "/unread",
    protect,
    unreadCount
);


/*
|--------------------------------------------------------------------------
| Mark All Notifications As Read
|--------------------------------------------------------------------------
*/

router.patch(
    "/read-all",
    protect,
    markAllAsRead
);


/*
|--------------------------------------------------------------------------
| Delete All Read Notifications
|--------------------------------------------------------------------------
*/

router.delete(
    "/read",
    protect,
    removeRead
);


/*
|--------------------------------------------------------------------------
| Mark Single Notification As Read
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/read",
    protect,
    markAsRead
);


/*
|--------------------------------------------------------------------------
| Delete Single Notification
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    protect,
    remove
);


/*
|--------------------------------------------------------------------------
| Get Notification Details
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    protect,
    details
);


export default router;