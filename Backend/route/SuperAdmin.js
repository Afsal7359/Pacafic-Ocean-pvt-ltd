const express = require('express');
const SuperAdmin = require('../Controller/SuperAdmin');
const router = express.Router();


router.post('/login',SuperAdmin.LoginSuperAdmin);



module.exports = router;