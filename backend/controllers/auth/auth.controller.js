
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user.model");


exports.handleRegister = async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        res.status(400).json({
            message: "Please provide username, email, and password",
        });
        return;
    }
    if(!req.file){
        res.status(400).json({
            message: "please select a image"
        })
    }
    const image = req.file.filename;
    const alreadyExituser = await User.findOne({  email });
    if (alreadyExituser) {
        res.status(400).json({
            message: "User with that email already exists",
        });
        return;
    }

    const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        photoUrl: image
    });
    await user.save();

    res.status(200).json({
        message: "User registered",
        user,
    });
}

exports.handleLogout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Logout success",
    });
  }

exports.handleLogin = async (req, res) => {
    console.log(req.body)
    const { email, password} = req.body;
        if(!email || !password){
            res.status(400).json({
                message: "Please provide email and password",
                });
                return;
        }

        const user = await User.findOne({email});
        console.log("User is ",user)
        if (!user) {
            res.status(400).json({
                message: "User not found",
                });
                return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                message: "Invalid credentials",
                });
                return;
            }
            //cookies 
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , {
                expiresIn:'30d'
            });
            res.cookie("token", token, {
                httpOnly: true
            });
            res.status(200).json({
                message: "Login success",
                user: user.name,
                email: user.email,
                token: token
            })
            
}
 


exports.googleCallback = async (req, res) => {
    const userProfile = req.user;
    console.log("Google user profile:", userProfile);
    
    try {
      const user = await User.findOne({
        where: { email: userProfile.emails[0].value },
      });
  
      let token;
      if (user) {
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '30d',
        });
      } else {
        const newUser = await User.create({
          name: userProfile.displayName,
          email: userProfile.emails[0].value,
          password: "google", 
          googleId: userProfile.id,
          photoUrl: userProfile.photos[0].value,
        });
  
        token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: '30d',
        });
      }
  
      res.cookie("token", token);
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error during Google login:", error);
      res.status(500).json({ message: "An error occurred while logging in." });
    }
  };
  


// Facebook callback handler
exports.facebookCallback = async (req, res) => {
    const userProfile = req.user;
    console.log("Facebook user profile:", userProfile);
    
    try {
      const user = await User.findOne({
        where: { email: userProfile.emails[0].value },
      });
  
      let token;
      if (user) {
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '30d',
        });
      } else {
        const newUser = await User.create({
          name: userProfile.displayName,
          email: userProfile.emails[0].value,
          password: "facebook",
          facebookId: userProfile.id,
          photoUrl: userProfile.photos[0].value,
        });
  
        token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: '30d',
        });
      }
  
      res.cookie("token", token);
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error during Facebook login:", error);
      res.status(500).json({ message: "An error occurred while logging in." });
    }
  };
  