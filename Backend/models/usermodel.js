

const mongoose = require('mongoose');
const bcrypts = require("bcryptjs");
const { objectId} = mongoose.schema;
const jwt = require("jsonwebtoken");


const jobsHistorySchema = new mongoose.schema ({

    title: {
        type: String,
        trim: true,
        maxlength: 70,
    },
    description: {
        type: String,
        trim: true,
        
        
    },
    salary: {
        type: String,
        trim: true,
        
        
    },
    location: {
        type: String,
        },
        interviewDate: {
            type: date,
            },
            applicationstatus: {
                type: string,
                enum: ['pending', 'accepted', 'rejected'],
                default: 'pending'
                },

    user: {
        type: objectId,
        ref: "user",
        req: true
    },

}, {timestamp:true})
const userschema = new mongoose.schema ({

    firstname: {
        type: String,
        trim: true,
        required: [true, 'first name is required'],
        maxlength: 32,
    },
    lastname: {
        type: String,
        trim: true,
        required: [true, 'last name is required'],
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'e-mail is required'],
        unique: true,
        match:[
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/, 'please add a valid e-mail'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'password is required'],
        minlength: [6, 'password must have at least (6) character'],
    },
    jobsHistory: [jobsHistorySchema],
role:{
    type: Number,
    default: 0,
}

}, {timestamp:true})

// encrypting password before changing 
userschema.pre('save', async function(next){
if(this.isModified('password')){
    next();
}
this.password = await bcrypt.hash(this.password, 10)

})
userschema.methods.comparepassword = async function (enteredpassword)
{
 return await bcrypt.compare(enteredpassword, this.password)   
}

// return a jwt token
userschema.methods.getjwtToken = function(){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        ExpiresIn: 3600
    });

}
module.exports = mongoose.model("user", userschema);