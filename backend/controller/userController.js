
const User = require('../module/userModule');
const catchAsyncErrors =require('../middleware/catchAsyncErrors');
const ErrorHandler  = require('../utils/errorHandler');

const register = catchAsyncErrors(async (req,res,next)=>{
    const {email, username, password, avatar} = req.body;
    const emailFind = await User.findOne({email});
    if(emailFind){
        return next(new ErrorHandler('Email Already Exist',400));
    }
    const profilePicBoy = avatar|| `https://avatar.iran.liara.run/public/boy/?username${username}`;
    const user = await User.create({ email, username, password,avatar:profilePicBoy
    });
    const token = user.jwtToken();
    res.cookie('token',token);
    res.status(201).json({
        success: true,
        message: 'Sign in Successful',user,token
    });
})


const login = catchAsyncErrors(async (req,res,next)=>{
    const { email, password } = req.body;
    if(!email || !password){
        return next(new ErrorHandler('User Email and password required!',400));
    }
    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorHandler('Email not found!',400));
        // throw new Exception('Email not found!');
    }
    const passwords =await  user.comparePassword(password);
    if(!passwords){
        return next(new ErrorHandler('Wrong Password... ',400));
    }
    const token = user.jwtToken();
    res.cookie('token', token);
    const users =  await User.findOne({email}).select('-email').select('-password');
    res.status(200).json({
        success: true,
        message: 'Login in Successful',
        users,
        token
    });
})


const logout = catchAsyncErrors(async (req,res,next)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: 'logout  Successful'
    });
})


module.exports = {
    register,login,logout
}