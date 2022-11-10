const express = require("express");
const { addStudent, getStudent, editStudent, deleteStudent } = require("../controllers/studentController");
const { registerUser,loginUser } = require("../controllers/userController")
const router = express.Router();


router.post("/api/users/userRegister",registerUser)
router.post("/api/auth",loginUser)

router.post("/addstudent",addStudent)
router.get("/getstudent/:userid",getStudent)
router.put('/:id', editStudent)
router.delete('/:id', deleteStudent)
module.exports = router