import express from "express";


import {
register,
login
}
from "./auth.controller.js";


import {
registerValidator,
loginValidator
}
from "./auth.validator.js";



const router =
express.Router();





router.post(

"/register",

registerValidator,

register

);



router.post(

"/login",

loginValidator,

login

);



export default router;