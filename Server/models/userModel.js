import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    minLenght: 6,
    required: true
  },
  profilePic:{
    type: String,
    default: ""
  },
  followers: {
    type: [String],
    default: []
  },
  following: {
    type: [String],
    default: []
  },
  bio:{
    type: String,
    default: ""
  },
  isDisabled:{
    type: Boolean,
    default: false
  }
},{timestamps: true})

export default mongoose.model("User", userSchema)