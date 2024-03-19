const ErrorResponse = require("../utils/errorResponse");

const Errorhandler = (err,req,res,next) =>{
let error = {...err};
error.message = err.message;

if(err.name === "CastName"){
    const message = `ressource not found ${err.value}`;
    error = new ErrorResponse(message, 404);
}
//mongoose duplicate value
if(err.code === 11000){
    const message = "duplcate field value entered";
    error = new ErrorResponse(message, 400);
}
//mongoose validation error
if(err.name === "ValidationError"){
    const message = object.values(err.errors).map(val => '' + val.message);
    error = new ErrorResponse(message, 400);
}
res.status(error.codestatus || 500).json({
    success: false,
    error: error.message || "server error"
})

}
 module.exports = Errorhandler;