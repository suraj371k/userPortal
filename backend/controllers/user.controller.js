import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password , phone , address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      address: address || []
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000, // 1 hour expiration
    });

    // Exclude password from user object
    const { password: _, ...userData } = newUser.toObject();

    return res.status(201).json({
      message: "User registered successfully",
      user: userData,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user with password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript access (XSS protection)
      sameSite: "Strict", // Prevents CSRF attacks
      maxAge: 60 * 60 * 1000, 
    });

    const { password: _, ...userData } = user.toObject();

    return res.status(200).json({
      message: "Login successful",
      user: userData, 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in user" });
  }
};



export const updateUserProfile = async (req , res) => {
  try {
    const { name , addresses , phone } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId , 
      {name , phone , addresses},
      {new: true}
    ).select("-password");//excluded password

    res.status(200).json({message: "Profile updated successfully" , user: updatedUser})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating profile" });
  }
}

export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
