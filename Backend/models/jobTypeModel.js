
const mongoose = require('mongoose');
const { objectId} = mongoose.schema;

const jobTypeschema = new mongoose.schema ({

    jobTypeName: {
        type: String,
        trim: true,
        required: [true, 'job category is required'],
        maxlength: 70,
    },
    user: {
        type: objectId,
        ref: "user",
        req: true
    },

}, {timestamp:true})

module.exports = mongoose.model("jobType", jobTypeschema);