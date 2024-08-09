const express = require("express");
const Employee = require("../Controller/Employee");
const upload = require("../utils/Multer");
const UserLogin = require("../Controller/UserLogin");
const router = express.Router();


router.post('/login',UserLogin.LoginAdmin);
router.get('/get-Employee',Employee.GetEmployee);
router.post('/add-Employee',upload.single("profileImage"),Employee.AddEmployee);
router.get('/delete-Employee/:id',Employee.DeleteEmployee);


module.exports=router;