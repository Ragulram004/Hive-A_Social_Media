import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js"
import {v2 as cloudinary} from "cloudinary"

//get profile
const getUserProfile = async (req, res) => {
  const username = req.params.username
  try{
    const user = await User.findOne({username}).select("-password").select("-updatedAt")
    if(!user) return res.status(400).json({error:"User not found"})
    res.status(200).json(user)
  }catch(error){
    res.status(500).json({error: error.message})
    console.log("Error in getUserProfile", error.message)
  }
}

//signup user
const signupUser = async (req, res) => {
  try{
    const {name, username, email, password } = req.body
    const user = await User.findOne({$or:[{email},{username}]})

    if(user){
      return res.status(400).json({error: "User already exists"}) 
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password:hashedPassword
    })
    await newUser.save()
    if(newUser){

      generateTokenAndSetCookie(newUser._id, res)

      res.status(201).json({
        _id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        username:newUser.username,
        bio:newUser.bio,
        profilePic:newUser.profilePic
      })
    }else{
      res.status(400).json({error: "Invalid user data"})
    }
  }catch(err){
    res.status(500).json({error: err.message})
    console.log("Error in signupUser", err.message)
  }
}

//login user
const loginUser = async (req, res) => {
  try{
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
    if(!user || !isPasswordCorrect){
      return res.status(400).json({error: "Invalid credentials"})
    }
    generateTokenAndSetCookie(user._id, res)
    res.status(200).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      username:user.username,
      bio:user.bio,
      profilePic:user.profilePic
    })
  }catch(error){
    res.status(500).json({error: error.message})
    console.log("Error in loginUser", error.message)
  }
}

//logout user
const logoutUser = async (req, res) => {
  try{
    res.cookie("jwt", "", {maxAge: 1})
    res.status(200).json({message: "Logout successful"})
  }catch(error){
    res.status(500).json({error: error.message})
    console.log("Error in logoutUser", error.message)
  }
}

//follow and Unfollow user
const followUnFollowUser = async (req, res) => {
  try{
    const {id} = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);
    console.log(id , req.user._id)

    if(id === req.user._id.toString()){
      return res.status(400).json({error: "You can't follow/unfollow yourself"});
    }

    if(!userToModify || !currentUser){
      return res.status(404).json({error: "User not found"})
    }
    const isFollowing = currentUser.followers.includes(id);

    if(isFollowing){
      //unfollow user
      // Modify current user following, modify followers of userToModify 
      await User.findByIdAndUpdate(req.user._id, {
        $pull: {following: id}
      })
      await User.findByIdAndUpdate(id, {
        $pull: {followers: req.user._id}
      })
      res.status(200).json({message: "Unfollow successful"})
    }else{
      //follow user
      await User.findByIdAndUpdate(req.user._id, {
        $push: {following: id}
      })
      await User.findByIdAndUpdate(id, {
        $push: {followers: req.user._id}
      })
      res.status(200).json({message: "Follow successful"})
    }

  }catch(error){
    res.status(500).json({error: error.message})
    console.log("Error in followUnFollowUser", error.message)
  }
}

//update user
const updateUser = async (req,res) =>{
  const {name , email, username, password ,  bio} = req.body
  let {profilePic} = req.body

  const userId = req.user._id
  try{
    let user = await User.findById(userId);
    if(!user) return res.status(400).json({error: "User not found"})

    if(req.params.id !== userId.toString()) return res.status(400).json({error: "You can only update your own profile"})

    if(password){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword
    }

    if(profilePic){
      // Remove old profile picture from Cloudinary if exists
      if(user.profilePic){
        await cloudinary.uploader.destroy(
          user.profilePic.split("/").pop().split(".")[0]
        );
      }
      // Upload new profile picture
      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url
    }

    user.name = name || user.name
    user.email = email || user.email
    user.username = username || user.username
    user.profilePic = profilePic || user.profilePic
    user.bio = bio || user.bio

    await user.save()
    res.status(200).json({message: "Profile updated successfully", user})
    
  }catch(error){
    res.status(500).json({error: error.message})
    console.log("Error in updateUser", error.message)
  }
}


export { signupUser, loginUser, logoutUser,followUnFollowUser,updateUser,getUserProfile }