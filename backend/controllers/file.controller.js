import File from "../models/file.model.js";
import path from "path";
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("Uploaded File:", req.file); // ✅ Check if size exists

    const file = await File.create({
      filename: req.file.filename,
      fileType: path.extname(req.file.originalname).substring(1),
      fileUrl: `/uploads/${req.file.filename}`,
      user: req.user.userId,
      size: req.file.size || 0,
    });

    res.status(201).json({ message: "File uploaded successfully", file });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "File upload failed" });
  }
};

export const getUserFiles = async (req, res) => {
  try {
    const files = await File.find({ user: req.user.userId })
      .populate("user", "name email")
      .exec();
    res.status(200).json({ files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching files" });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(process.cwd(), "uploads", filename);
    res.download(filePath, filename, (err) => {
      if (err) {
        res.status(500).json({ message: "Error downloading file" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "File not found" });
  }
};


