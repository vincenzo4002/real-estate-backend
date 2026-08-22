import { body } from "express-validator";

export const createPropertyValidator = [

    body("title")
        .notEmpty()
        .withMessage("Title is required"),

    body("description")
        .notEmpty()
        .withMessage("Description is required"),

    body("category")
        .notEmpty()
        .withMessage("Category is required"),

    body("listingType")
        .isIn(["SALE", "RENT"])
        .withMessage("Listing type must be SALE or RENT"),

    body("price")
        .isNumeric()
        .withMessage("Price must be numeric"),

    body("location.city")
        .notEmpty()
        .withMessage("City is required"),

    body("location.state")
        .notEmpty()
        .withMessage("State is required"),

    body("location.address")
        .notEmpty()
        .withMessage("Address is required"),

    body("area")
        .isNumeric()
        .withMessage("Area is required")

];