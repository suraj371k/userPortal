import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    fileType: { type: String, required: true }, 
    fileUrl: { type: String, required: true }, 
    size: {type: Number , default: 0},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const File = mongoose.model("File", FileSchema);
export default File;
