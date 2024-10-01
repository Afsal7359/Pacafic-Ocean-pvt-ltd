const express = require("express");
const Job = require("../Controller/Job");
const userAuthMid = require("../MiddileWear/Auth-middlewear");
const router = express.Router();

router.get('/get-job',userAuthMid,Job.GetJob);
router.post('/add-job',userAuthMid,Job.AddJob);
router.get('/delete-job',userAuthMid,Job.DeleteJob);
router.post('/edit-job/:id',userAuthMid,Job.EditJob);
router.post('/block-job/:id',userAuthMid,Job.BlockEditandDelete);
router.post('/unblock-job/:id',userAuthMid,Job.UnBlockEditandDelete);


module.exports=router;