import express from "express";
import type { Router } from "express";

import {
  registerLead,
  getLeadList,
  catchLead,
} from "../controller/lead.controller.ts";

import {
  getUserProfile,
  updateUserProfile,
} from "../controller/user.controller.ts";

import { protect } from "../middleware/auth.middleware.ts";

const router: Router = express.Router();

router.post("/catch", catchLead);
router.post("/", registerLead);
router.get("/", protect, getLeadList);


export default router;
