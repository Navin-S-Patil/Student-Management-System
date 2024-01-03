const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Task = require("../models/Task");
const generateToken = require("../utils/tokenGenerator");
const { registerUser } = require("./userController");

//@desc    Auth user/set token
//route    POST /api/admin/auth
//@access  Public
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.isAdmin && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      department: user.department,
    });
  } else {
    res.status(400);
    throw new Error("Invalid username or password");
  }
});

//@desc    Register new Admin
//route    POST /api/admin
//@access  Private only admin
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, department } = req.body;

  // Check if the username is already taken
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "Admin already exists" });
    return;
  }

  // Create a new admin
  const newAdmin = await User.create({
    name,
    email,
    department,
    password,
    isAdmin: true,
  });

  if (newAdmin) {
    // generateToken(res, newAdmin._id);
    res.status(201).json({
      // _id: newAdmin._id,
      name: newAdmin.name,
      email: newAdmin.email,
      department: newAdmin.department,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc    logout admin
//route    POST /api/admin/logout
//@access  Public
const loggoutAdmin = asyncHandler(async (req, res) => {
  // Remove the Authorization header containing the token
  res.removeHeader("Authorization");
  res.status(200).json({
    message: "Admin Logout",
  });
});

const addStudents = asyncHandler(async (req, res) => {
  // Call the registerUser function from userController
  const newStudent = await registerUser(req);

  res.status(201).json(newStudent);
});

const assignTask = asyncHandler(async (req, res) => {
  const { newTask, student } = req.body;

  const user = await User.findOne({ email: student.email });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const task = await Task.findOne({ user: user._id });

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  //same task can't be assigned to a student twice
  const taskExists = task.taskList.find((t) => t.title === newTask[0]);
  if (taskExists) {
    res
      .status(400)
      .json({
        message: "Task already assigned, can't assign one task again and again",
      });
    return;
  }

  // Convert newTask to an object assuming it's an array of strings
  const formattedTask = {
    title: newTask[0],
    description: newTask[1],
    status: newTask[2],
    deadline: newTask[3],
  };

  task.taskList.push(formattedTask);

  // Save the document if it's an instance of Mongoose model
  await task.save();

  res.status(201).json(formattedTask);
});

module.exports = {
  authAdmin,
  registerAdmin,
  loggoutAdmin,
  addStudents,
  assignTask,
};
