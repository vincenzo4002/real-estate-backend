import express from "express";

import {
    profile,
    update,
    updatePassword
} from "./user.controller.js";

import {
    protect
} from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get(
    "/profile",
    protect,
    profile
);

router.patch(
    "/profile",
    protect,
    update
);

router.patch(
    "/change-password",
    protect,
    updatePassword
);

export default router;