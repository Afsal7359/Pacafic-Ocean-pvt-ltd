const express = require("express");
const upload = require("../utils/Multer");
const PartiesController = require("../Controller/PartiesController");
const userAuthMid = require("../MiddileWear/Auth-middlewear");
const router = express.Router();

router.post('/add-parties',userAuthMid,upload.fields([{ name: 'gstphoto', maxCount: 1 },{ name: 'panphoto', maxCount: 1 }]),PartiesController.AddParties);
router.get('/Get-All-Parties',userAuthMid,PartiesController.GetParties);
router.get('/delete-Parties/:id',userAuthMid,PartiesController.DeleteParties);
router.get('/middle/:id',PartiesController.MiddileWear);
router.post('/edit-parties/:id',userAuthMid,upload.fields([{ name: 'gstphoto', maxCount: 1 },{ name: 'panphoto', maxCount: 1 }]),PartiesController.EditParties)


module.exports=router;