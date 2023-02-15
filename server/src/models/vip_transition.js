import mongoose from "mongoose"

const vip_transition_Schema = new mongoose.Schema(
  {
    id_user: {
      type: String,
      require: true,
    },
    is_paid: {
      type: Boolean,
      require: true,
    },
    time_expired: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
)

export const Vip_transition = mongoose.model(
  "Vip_transition",
  vip_transition_Schema
)
