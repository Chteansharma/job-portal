const Job = require("../models/jobModels");
const JobType = require("../models/jobTypeModel");
const ErrorResponse = require("../utils/errorResponse");

//create job
exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      salary: req.body.salary,
      jobType: req.body.jobType,
      user: req.user.id,
    });
    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

//single job
exports.singleJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

//update job by id.
exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, {
      new: true,
    })
      .populate("jobType", "jobTypeName")
      .populate("user", "firstName lastName");
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

//update job by id.
exports.showJobs = async (req, res, next) => {
  //enable search
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  // filter jobs by category ids
  let ids = [];
  const jobTypeCategory = await jobType.find({}, { _id: 1 });
  jobTypeCategory.forEach((cat) => {
    ids.push(cat._id);
  });
  let cat = req.query.cat;
  let categ = cat !== "" ? cat : ids;

  // jobs by location
  let locations = [];
  const jobByLocation = await job.find({}, { location: 1 });
  jobByLocation.forEach((val) => {
    locations.push(val.location);
  });
  let setUniqueLocation = [...new set(locations)];
  let location = req.query.location;
  let locationFilter = location !== '' ? location : setUniqueLocation;

  // enable pagination
  const pagesizes = 5;
  const page = Number(req.query.pageNumber) || 1;
  //const count = await job.find({}).estimatedDocumentCount();
  const count = await job.find({ ...keyword, jobType: categ, location : locationFilter }).countDocuments();
  try {
    const jobs = await Job.find({ ...keyword, jobType: categ, location: locationFilter }).sort({createdAt : -1})
      .skip(pagesize * (pagesize - 1))
      .limit(pagesize);
    res.status(200).json({
      success: true,
      jobs,
      page,
      pages: Math.ceil(count / pagesize),
      count,
      setUniqueLocation,
    });
  } catch (error) {
    next(error);
  }
};
