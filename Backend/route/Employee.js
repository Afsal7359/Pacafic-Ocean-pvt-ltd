const express = require("express");
const Employee = require("../Controller/Employee");
const upload = require("../utils/Multer");
const UserLogin = require("../Controller/UserLogin");
const userAuthMid = require("../MiddileWear/Auth-middlewear");
const router = express.Router();


router.post('/login',UserLogin.LoginAdmin);
router.get('/get-Employee',userAuthMid,Employee.GetEmployee);
router.post('/add-Employee',userAuthMid,upload.single("profileImage"),Employee.AddEmployee);
router.get('/delete-Employee/:id',userAuthMid,Employee.DeleteEmployee);


module.exports=router;