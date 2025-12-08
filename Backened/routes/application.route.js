import express from "express";
//import {login,register} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {applyJob,getApplicants,getAppliedJobs,updateStatus} from "../controllers/application.controller.js";
const router=express.Router();

router.route("/apply/:id").get(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated,getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/status/:id/update").get(isAuthenticated,updateStatus);



export default router;
