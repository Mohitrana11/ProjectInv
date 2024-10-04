const express = require('express');
const {  createEmployee,updateEmployee ,searchUsers,getEmployee,deleteEmployee } = require('../controller/employeeController');
const router = express.Router();
const multer = require('multer');
const {isAuthenticated}  = require('../middleware/auth');
// Multer upload middleware
const upload = multer({ dest: 'uploads/' });

// Routes
router.get('/employees',isAuthenticated ,getEmployee);
router.post('/employees',isAuthenticated, upload.single('avatar'), createEmployee);
router.post('/employees',isAuthenticated, getEmployee);
router.get('/employee',isAuthenticated,searchUsers );
router.put('/employees/:id',isAuthenticated ,upload.single('avatar'), updateEmployee);
router.delete('/employee/:id', deleteEmployee);

module.exports = router;
