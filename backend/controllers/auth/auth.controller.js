
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user.model");

exports.getuser= async(req,res)=>{
    const user = await User.find();
    res.status(200).json({
        message: "user find",
        user
    })
};

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
 

/// Google callback handler
exports.googleCallback = async (req, res) => {
    const userProfile = req.user;
    
    // Check for existing user using email
    const user = await User.findOne({
        where: { email: userProfile.emails[0].value },
    });

    let token;
    if (user) {
        // Existing user
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    } else {
        // New user
        const newUser = await User.create({
            name: userProfile.displayName,
            email: userProfile.emails[0].value,
            password: "google", // No password needed for OAuth
            googleId: userProfile.id,
            photoUrl: userProfile.photos[0].value,
        });

        token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    }

    // Set token in cookie
    res.cookie('token', token);
    
    // Optionally, you could redirect to your frontend URL
    // res.redirect('http://localhost:5173/loginsuccess');
    res.status(200).json({ message: 'Login successful', token });
};

// Facebook callback handler
exports.facebookCallback = async (req, res) => {
    const userProfile = req.user;
    
    // Check for existing user using email
    const user = await User.findOne({
        where: { email: userProfile.emails[0].value },
    });

    let token;
    if (user) {
        // Existing user
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '30d',
        });
    } else {
        // New user
        const newUser = await User.create({
            name: userProfile.displayName,
            email: userProfile.emails[0].value,
            password: "facebook", // No password needed for OAuth
            facebookId: userProfile.id,
            photoUrl: userProfile.photos[0].value,
        });

        token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '30d',
        });
    }

    // Set token in cookie
    res.cookie('token', token);
    
    // Optionally, you could redirect to your frontend URL
    // res.redirect('http://localhost:5173/loginsuccess');
    res.status(200).json({ message: 'Login successful', token });
};
