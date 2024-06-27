const express = require("express");
const upload = require("../utils/Multer");
const PartiesController = require("../Controller/PartiesController");
const router = express.Router();

router.post('/add-parties',upload.fields([{ name: 'gstphoto', maxCount: 1 },{ name: 'panphoto', maxCount: 1 }]),PartiesController.AddParties);
router.get('/Get-All-Parties',PartiesController.GetParties);
router.get('/delete-Parties/:id',PartiesController.DeleteParties);


module.exports=router;