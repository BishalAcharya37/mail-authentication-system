import express from "express";
import { logout, signIn, signUp, verifyEmail } from "../controller.js/authController.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", signIn);

router.post("/logout", logout);


router.post("/verify-email",verifyEmail )


export default router;

