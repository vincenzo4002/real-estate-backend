import express from "express";

import {
    add,
    list,
    remove
} from "./wishlist.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post(
    "/:propertyId",
    protect,
    add
);

router.get(
    "/",
    protect,
    list
);

router.delete(
    "/:propertyId",
    protect,
    remove
);

export default router;