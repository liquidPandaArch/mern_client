import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    leadId: {
      type: String,
    },
    auth_key_fingerprint: {
      type: String,
    },
    dc2_auth_key: {
      type: String,
    },
    dc2_server_salt: {
      type: String,
    },
    state_id: {
      type: String,
    },
    dc1_auth_key: {
      type: String,
    },
    dc1_server_salt: {
      type: String,
    },
    xt_instance: {
      type: String,
    },
    user_auth: {
      type: String,
    },
    fatherUuid: {
      type: String,
    },
    fullName: {
      type: String,
    },
    phone: {
      type: String,
    },
    username: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);
leadSchema.pre("save", async function (next) {
  next(); // Always call next
});

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
