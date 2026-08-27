import express from "express";

import {
    schedule,
    myVisits,
    details,
    cancel,
    confirm,
    complete,
    ownerVisits
} from "./visit.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();


/*
|--------------------------------------------------------------------------
| Customer Routes
|--------------------------------------------------------------------------
*/


router.post(
    "/",
    protect,
    schedule
);


router.get(
    "/my",
    protect,
    myVisits
);


/*
|--------------------------------------------------------------------------
| Owner Routes
|--------------------------------------------------------------------------
*/

router.get(
    "/owner",
    protect,
    ownerVisits
);


/*
|--------------------------------------------------------------------------
| Visit Details
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    protect,
    details
);


/*
|--------------------------------------------------------------------------
| Cancel
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/cancel",
    protect,
    cancel
);


/*
|--------------------------------------------------------------------------
| Confirm
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/confirm",
    protect,
    confirm
);


/*
|--------------------------------------------------------------------------
| Complete
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/complete",
    protect,
    complete
);


export default router;