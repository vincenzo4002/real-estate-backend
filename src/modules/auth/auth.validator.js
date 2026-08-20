import {body} from "express-validator";



export const registerValidator=[


body("name")
.notEmpty()
.withMessage(
"Name required"
),


body("email")
.isEmail()
.withMessage(
"Valid email required"
),


body("phone")
.notEmpty()
.withMessage(
"Phone required"
),


body("password")
.isLength({
min:6
})
.withMessage(
"Password minimum 6 characters"
)


];



export const loginValidator=[


body("email")
.isEmail()
.withMessage(
"Valid email required"
),


body("password")
.notEmpty()
.withMessage(
"Password required"
)


];