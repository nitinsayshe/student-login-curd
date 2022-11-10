const userModel=require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
	try {
		let { email, password } = req.body
        console.log(req.body)
		let user = await userModel.findOne({ email: email });
		if (user) return res.status(409).send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		user = await new userModel({ ...req.body, password: hashPassword }).save();

		res.status(201).send({ message: "User Register Succesfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
};

exports.loginUser = async (req, res) => {
	try {
		let { email, password } = req.body
		const user = await userModel.findOne({ email: email });
		if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

		
		const token = jwt.sign({ _id: user._id,user:email }, "tailwebs-nitin-sayshe", {
			expiresIn: "7d",
		});
		res.status(200).send({ data: {token,email},userId:user._id, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};