import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters long'],
      maxlength: [100, 'Full name cannot exceed 100 characters']
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters long']
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\+?[\d\s-]{10,15}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    image: {
      type: String, 
      required: false
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
   
    bloodGroup:{
      type:String,
      require:true
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    collegeId:{
      type:String
      
    }
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });
userSchema.index({ phoneNumber: 1 });

const User = mongoose.model("User", userSchema);

export default User;
