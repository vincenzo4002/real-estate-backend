import express from "express";

import {
    getCustomers,
    getCustomer,
    block,
    unblock,
    remove
} from "./user-admin.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { adminOnly } from "./admin.middleware.js";

const router = express.Router();


/*
|--------------------------------------------------------------------------
| Customer Management
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Get All Customers
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    protect,
    adminOnly,
    getCustomers
);


/*
|--------------------------------------------------------------------------
| Get Customer By ID
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    protect,
    adminOnly,
    getCustomer
);


/*
|--------------------------------------------------------------------------
| Block Customer
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/block",
    protect,
    adminOnly,
    block
);


/*
|--------------------------------------------------------------------------
| Unblock Customer
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/unblock",
    protect,
    adminOnly,
    unblock
);


/*
|--------------------------------------------------------------------------
| Delete Customer
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    protect,
    adminOnly,
    remove
);


export default router;