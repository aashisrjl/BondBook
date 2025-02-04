
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
    const alreadyExituser = await User.findOne({ where: { email } });
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

    res.status(200).json({
        message: "User registered",
        user,
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
        const user = await User.findOne({ where: { email } });
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
                expiresIn: process.env.JWT_EXPIRES_IN,
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
 

// Google callback handler
exports.googleCallback = async (req, res) => {
        const userProfile = req.user; 
        const user = await User.findOne({
            where: { email: userProfile.emails[0].value },
        });

        let token;
        if (user) {
            // Existing user
            token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
        } else {
            // New user
            const newUser = await users.create({
                username: userProfile.displayName,
                email: userProfile.emails[0].value,
                password: Math.random().toString(36).substring(2, 10),
                googleId: userProfile.id,
                imgUrl: userProfile.photos[0].value,
            });

            token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
        }

        res.cookie('token', token);
        res.redirect('http://localhost:5173/settings');
   
};

// Facebook callback handler
exports.facebookCallback = async (req, res) => {
        const userProfile = req.user;
        const user = await User.findOne({
            where: { email: userProfile.emails[0].value },
        });

        let token;
        if (user) {
            // Existing user
            token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
        } else {
            // New user
            const newUser = await users.create({
                username: userProfile.displayName,
                email: userProfile.emails[0].value,
                password: Math.random().toString(36).substring(2, 10),
                facebookId: userProfile.id,
                imgUrl: userProfile.photos[0].value,
            });

            token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN, 
            });
        }

        res.cookie('token', token);
        res.redirect('http://localhost:5173/settings');
    
};


exports.handleLogout= async(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({
        message: "Logout success",
    });
}