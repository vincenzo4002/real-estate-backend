import express from "express";

import {
    create,
    getAll,
    getById,
    update,
    remove,
    featured,
    latest,
    myProperties
} from "./property.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { createPropertyValidator } from "./property.validator.js";
import { validate } from "../../middleware/validate.middleware.js";
import upload from "../../middleware/upload.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", getAll);

router.get("/featured", featured);

router.get("/latest", latest);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    protect,
    upload.array("images", 10),
    createPropertyValidator,
    validate,
    create
);

router.get(
    "/my",
    protect,
    myProperties
);

router.patch(
    "/:id",
    protect,
    update
);

router.delete(
    "/:id",
    protect,
    remove
);

/*
|--------------------------------------------------------------------------
| Dynamic Route (Keep Last)
|--------------------------------------------------------------------------
*/

router.get("/:id", getById);

export default router;