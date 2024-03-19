

const user = require('../models.usermodel');
const ErrorResponse = require('../utils/errorResponse');


exports.signup = async (req, res, next) => {
    const {email}= req.body;
    const userExits = await user.findone({email});
    if (userExits){
        return next(new ErrorResponse("E-mail already registred", 400));
    }
    try {
        const user =  await user.create(req.body);
        res.status(201).json({
            success: true,
            user

    })
}catch (error){
    next(error);
}
};

exports.signin = async (req, res, next) => {
  
    try {
        const {email,password}= req.body;
        //validation
        if (!Email){
            return next(new ErrorResponse("please add an Email", 403));
        }
          
        if (!password){
            return next(new ErrorResponse("please add an password", 403));
        }
        // check users email
        const user =  await user.findone({ Email });
        if (!user){
            return next(new ErrorResponse("invalid credentials", 400));
        }
        // check users paasword
        const isMatched = await user.comparepassword(password);
        if (!isMatched){
            return next(new ErrorResponse("invalid credentials", 400));
        }
        sendTokenResponse(user, res, 200);

}catch (error){
    next(error);
}
}

const  sendTokenResponse = async(user, codestatus, res)=>{
    const token = await user.getjwtToken();
    res
    .status(codestatus)
    .cookie('token', token, { maxAge: 60 * 60 * 1000, httponly: true })
    .json({success: true, 
        role: user.role
    })
}

// log out
exports.logout = (req, res, next)=>{
    res.clearcookie('token');
    res.status(200).json({
        success: true,
        message: "logged out"
    });
}
// user profie
exports.userprofile = async(req, res, next)=>{
    
    const user = await user.findById(req.user.id).select('-password');
    res.status(200).json({
        success: true,
       user
    });
}
