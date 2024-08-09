const express = require("express");
const Job = require("../Controller/Job");
const router = express.Router();

router.get('/get-job',Job.GetJob);
router.post('/add-job',Job.AddJob);
router.get('/delete-job',Job.DeleteJob);
router.post('/edit-job/:id',Job.EditJob)


module.exports=router;