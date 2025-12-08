import express from "express";
import {login,register,logout} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
 const router=express.Router();
 import { singleUpload } from "../middleware/multer.js";

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated);

export default router;
