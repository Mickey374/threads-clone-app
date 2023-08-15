import mongoose, { mongo } from "mongoose";

const threadSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, unique: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    community: {
      type: mongoose.Schema.ObjectId,
      ref: "Community",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    parentId: {
      type: String,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
