import { Schema, model } from "mongoose";
const TicketSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    isDelete: { type: Boolean, default: false },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = model("Ticket", TicketSchema);
export default Ticket;
