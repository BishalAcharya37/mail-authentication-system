import express from "express";
import { logout, signIn, signUp, verifyEmail, forgetPassword, resetYourPassword, checkAuth } from "../controller.js/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";



const router = express.Router();


router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signUp);

router.post("/login", signIn);

router.post("/logout", logout);


router.post("/verify-email",verifyEmail );

router.post("/forget-password", forgetPassword);


router.post("/reset-your-password/:rtoken",resetYourPassword );





export default router;

