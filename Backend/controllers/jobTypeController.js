const JobType = require('../models/jobTypeModels');
const ErrorResponse = require('../utils/errorResponse');

//create job category
exports.createJobType = async(req, res, next)=> {
    try {
        const jobT = await JobType.create({
            jobTypeName: req.body.jobTypeName,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            jobT
        })
    }catch (error) {
        next(error);

    }
    }

    //All jobs category
exports.allJobsType = async(req, res, next)=> {
    try {
        const jobT = await JobType.find();
        res.status(200).json({
            success: true,
            jobT
        })
    }catch (error) {
        next(error);

    }
    }
       //update job type
exports.updateJobType = async(req, res, next)=> {
    try {
        const jobT = await JobType.findByIdAndUpdate(req.params.type_id, req.body, {new: true});
        res.status(200).json({
            success: true,
            jobT
        })
    }catch (error) {
        next(error);

    }
    }
        //delete job type
exports.deleteJobType = async(req, res, next)=> {
    try {
        const jobT = await JobType.findByIdAndRemove(req.params.type_id);
        res.status(200).json({
            success: true,
            message: "job Type deleted"
        })
    }catch (error) {
        next(new ErrorResponse("server error", 500));

    }
    }