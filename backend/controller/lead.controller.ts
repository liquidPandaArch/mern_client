import type { Request, Response } from "express";
import Lead from "../models/lead.model.ts";
import User from "../models/user.model.ts";
import generateToken from "../utils/generateToken.util.ts";
import asyncHandler from "express-async-handler";

// @desc    Register a new lead for user
// @route   POST /api/saveauth
// @access  Private
const registerLead = asyncHandler(async (req: Request, res: Response) => {
  const {
    auth_key_fingerprint,
    dc2_auth_key,
    dc2_server_salt,
    dc1_auth_key,
    dc1_server_salt,
    user_auth,
    username,
    currId: fatherUuid,
    xt_instance,
    fullName,
    phone,
    faPass,
    state_id,
  } = req.body;

  let { id: leadId } = JSON.parse(user_auth);

  const leadExist = await Lead.findOne({ leadId });

  const leadData: any = {
    dc2_auth_key,
    user_auth,
    leadId,
    fullName,
    phone,
    username,
    auth_key_fingerprint,
    xt_instance,
    dc2_server_salt,
    dc1_auth_key,
    dc1_server_salt,
    state_id,
    faPass,
    fatherUuid
  };
  if (leadExist) {
    Object.assign(leadExist, leadData);
    // Object.keys(leadData).forEach((key => {
    //   leadExist[key] = leadData[key]
    // }))
    const updatedLead = await leadExist.save();
    res.status(200).json({ res: "updated" });
  } else {
    const lead = await Lead.create(leadData);
    res.status(201).json({ res: "created" });
  }
});


// @desc    Get list of Lead
// @route   GET /api/saveauth
// @access  Private
const getLeadList = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.body.user._id);
  if (!user) {
    res.status(404);
    return
    // throw new Error('User not found');
  }

  const listLead = await Lead
    .find({ fatherUuid: user.uuid })
    .sort({ 'updatedAt': -1 })  //1 for ascending and -1 for descending
  if (!listLead) {
    res.status(404);
    // throw new Error('Lead not found');
  }
  res.json(listLead);
});

// @desc    Get a lead for user
// @route   POST /api/saveauth/catch
// @access  Private
const catchLead = asyncHandler(async (req: Request, res: Response) => {
  const { fatherUuid, id } = req.body;
  const leadExist = await Lead.findOne({ fatherUuid, leadId: id });

  if (!leadExist) {
    res.status(400);
    // throw new Error("User already exists");
  }
  else
    res.status(201).json({
      "dc2_auth_key": leadExist.dc2_auth_key,
      "dc2_server_salt": leadExist.dc2_server_salt,
      "user_auth": leadExist.user_auth,
      "auth_key_fingerprint": leadExist.auth_key_fingerprint,
      "dc1_auth_key": leadExist.dc1_auth_key,
      "dc1_server_salt": leadExist.dc1_server_salt,
      "xt_instance": leadExist.xt_instance,
      "state_id": leadExist.state_id
    });
});
export {
  registerLead,
  getLeadList,
  catchLead
};
