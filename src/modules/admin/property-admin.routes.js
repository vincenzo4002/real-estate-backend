import express from "express";

import {
    getProperties,
    getProperty,
    approve,
    reject,
    remove
} from "./property-admin.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { adminOnly } from "./admin.middleware.js";

const router = express.Router();


/*
|--------------------------------------------------------------------------
| Property Management
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Get All Properties
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    protect,
    adminOnly,
    getProperties
);


/*
|--------------------------------------------------------------------------
| Get Property By ID
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    protect,
    adminOnly,
    getProperty
);


/*
|--------------------------------------------------------------------------
| Approve Property
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/approve",
    protect,
    adminOnly,
    approve
);


/*
|--------------------------------------------------------------------------
| Reject Property
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/reject",
    protect,
    adminOnly,
    reject
);


/*
|--------------------------------------------------------------------------
| Remove Property
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    protect,
    adminOnly,
    remove
);


export default router;