const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const user = require("../models/usermodel");



// check user is Authenicated
exports.isAuthenicated = async(req, res, next)=>{
    const { token } = req.cookies;
    // make sure token exists
    if (!token){
        return next(new ErrorResponse('not authorized to access this route', 401));
    }
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decoded.id);
    next();
} catch (error) {
    return next(new ErrorResponse('not autherized to this route', 401));
    
}
}
// middleware for admin
exports.isAdmin = (req, res, next)=>{
    if(req.user.role ===0){
        return next(new ErrorResponse('access denied, you must an admin',401));
    }
    next();
}