const Employee = require('../module/employeeModule');
const multer = require('multer');
const path = require('path');
const catchAsyncError = require('../middleware/catchAsyncErrors');
const ErrorHandle  = require('../utils/errorHandler')
const fs = require('fs');  // Add this line
// const path = require('path');
// Set up multer for avatar uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/avatars/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File type validation (only jpg and png)
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 2 },
    fileFilter: fileFilter
});


// Create Employee:
const createEmployee = catchAsyncError(async (req, res) => {
        const { name, email, mobile, designation, gender, course } = req.body;
        if (req.file) {
            req.body.avatar = req.file.filename;
        }
        const newEmployee = await Employee.create(req.body);
        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            employee: newEmployee
        });
})


// Update Employee:
const updateEmployee = catchAsyncError(async (req, res) => {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
        return res.status(404).json({ success: false, message: "Employee not found" });
    }
    req.body.email = employee.email;
    req.body.password = employee.password;
    if (req.file) {
        req.body.avatar = req.file.filename;
    }

    // Update the employee details, excluding email and password
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        message: "Employee updated successfully",
        employee: updatedEmployee,
    });
});



// get all users:
const getEmployee = catchAsyncError(async (req,res,next)=>{
    const users = await Employee.find({});
    res.status(200).json({
        success:true,
        users
    })
})




// Remove an employee
const deleteEmployee = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
        return next(new ErrorHandler('User Not found', 404));
    }

    if (employee.avatar) {
        // Remove the avatar image if it exists
        const avatarPath = path.join(__dirname, '../uploads/avatars/', employee.avatar);
        if (fs.existsSync(avatarPath)) {
            fs.unlinkSync(avatarPath);
        }
    }

    await Employee.findByIdAndDelete(id);  // Use findByIdAndDelete to remove employee

    res.status(200).json({
        success: true,
        message: "Employee deleted successfully"
    });
});


//search users
const searchUsers = catchAsyncError(async (req, res) => {
    const search = req.query.search ? req.query.search.trim() : '';
    const searchQuery = search
        ? { name: { $regex: `.*${search}.*`, $options: "i" } } 
        : {};

    // Fetch the filtered users
    const users = await Employee.find(searchQuery);

    res.status(200).json({
        search,
        success: true,
        users,
        message: search ? 'Filtered Users' : 'All users returned',
    });
});





module.exports = {
    createEmployee,updateEmployee,searchUsers,getEmployee,deleteEmployee
}