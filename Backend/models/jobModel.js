

const mongoose = require('mongoose');
const { objectId} = mongoose.schema;

const jobschema = new mongoose.schema ({

    title: {
        type: String,
        trim: true,
        required: [true, 'title is required'],
        maxlength: 70,
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'description is required'],
        
    },
    salary: {
        type: String,
        trim: true,
        required: [true, 'salary is required'],
        
    },
    location: {
        type: String,
        },
     available: {
        type: boolean,
        default: true,
    },
    jobType: {
        type: objectId,
        ref: "jobType",
        req: true
    },
    user: {
        type: objectId,
        ref: "user",
        req: true
    },

}, {timestamp:true})

module.exports = mongoose.model("job", jobschema);