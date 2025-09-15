import express from "express";
import { 
  register, 
  login, 
  allUsers, 
  verifyUser, 
  sendVerificationOTP, 
  verifyOTP, 
  sendPasswordResetOTP, 
  resetPassword, 
  updateProfile, 
  Blood
} from "../controllers/user.controller.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

const uploadsDir = "uploads/";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "profile-" + uniqueSuffix + path.extname(file.originalname));
  },
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, gif, webp)"));
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: fileFilter
});

router.post("/upload-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    
    res.status(200).json({ 
      message: "Image uploaded successfully",
      url: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/register", upload.single("image"), async (req, res, next) => {
  try {
    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      req.body.image = imageUrl;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}, register);


router.post("/login", login);

router.post("/send-verification-otp", sendVerificationOTP);
router.post("/verify-otp", verifyOTP);
router.get("/blood",Blood)

router.post("/send-reset-otp", sendPasswordResetOTP);
router.post("/reset-password", resetPassword);

router.use(protect);

router.get("/profile", verifyUser);
router.put("/update-profile", upload.single("image"), async (req, res, next) => {
  try {
   
    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      req.body.image = imageUrl;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}, updateProfile);

router.get("/all-users", async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
}, allUsers);

router.get("/verify-user", async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
}, verifyUser);

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum size is 2MB.' });
    }
  }
  
  if (error.message.includes('Only image files are allowed')) {
    return res.status(400).json({ error: error.message });
  }
  
  res.status(500).json({ error: error.message });
});

export default router;
