const studentModel = require("../models/studentModel")

exports.addStudent = async (req, res) => {
    try {
        let { name, subject, marks, userId } = req.body;
     
        if (!name.length || !subject.length || !marks.length)
            return res.status(400).json({ status: false, message: "Missing details" })

        const findStudent = await studentModel.findOne({ name: name, subject: subject })
        if (!findStudent) {
            const data = await studentModel.create({ name, subject, marks, userId });
            return res.status(201).json({ status: true, message: "Student Added Successfully", data: data })
        } else {
            const data = await studentModel.findOneAndUpdate({ name: name, subject: subject }, { $inc: { marks: marks } })
            return res.status(200).json({ status: true, message: "Student Updated Successfully", data: data })
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

exports.getStudent = async (req, res) => {
    try {
        let userid  = req.params.userid;
        const students = await studentModel.find({ isDeleted: false,userId:userid })
        return res.status(200).json(students)
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}
exports.editStudent = async (req, res) => {
    try {
        let student = req.body;
        let studentId = req.params.id
        const editStudent = await studentModel.findByIdAndUpdate(studentId, student);
        res.status(201).json({ status: true, message: "Student Updated Successfully", data: editStudent })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        let studentId = req.params.id
        await studentModel.updateOne({ _id: studentId }, { isDeleted: true });
        res.status(201).json("Student deleted Successfully");
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}