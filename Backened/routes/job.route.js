import express from "express";
//import {login,register,logout} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {getAdminJobs,getAllJobs,postJob,getJobById} from "../controllers/job.controller.js";

 const router=express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);
router.route("/get/:id").get(getJobById);

export default router;
