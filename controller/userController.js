const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Task = require("../models/Task");
const generateToken = require("../utils/tokenGenerator");
const { getDecodedUser } = require("../utils/decoder");

//@desc    Auth user/set token
//route    POST /api/student/auth
//@access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
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

//@desc    Register new user
//route    POST /api/student
//@access  Private only admin
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, department } = req.body;

  // Check if the username is already taken
  const userExists = await User.findOne({ email });

  if (userExists) {
    console.error("User already exists:", userExists);
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // Create a new user
  const newUser = await User.create({
    name,
    email,
    department,
    password,
  });

  // Create a new portfolio for the user
  const newTask = new Task({ user: newUser._id });
  newUser.Task = newTask._id;

  // Save the portfolio and user
  await Promise.all([newTask.save(), newUser.save()]);

  if (newUser) {
    // generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      department: newUser.department,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc    logout user
//route    POST /api/student/logout
//@access  Public
const loggoutUser = asyncHandler(async (req, res) => {
  // Remove the Authorization header containing the token
  res.removeHeader("Authorization");
  res.status(200).json({
    message: "User Logout",
  });
});

//@desc    See user task
//route    get /api/student/seeTask
//@access  Private
const seeTask = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedUser = getDecodedUser(token);

    const task = await Task.findOne({ user: decodedUser.userId });

    if (task) {
      res.status(200).json(task.taskList);
    } else {
      res.status(401);
      throw new Error("Task not found");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

//@desc    Update task status by user
//route    PUT /api/student/updateTaskStatus
//@access  Private
const updateTaskStatus = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedUser  = getDecodedUser(token);

    const task = await Task.findOne({ user: decodedUser.userId });

    if (task) {
      const { title, status } = req.body;

      const index = task.taskList.findIndex((task) => task.title === title);

      if (index !== -1) {
        task.taskList[index].status = status;
        await task.save();
        res.status(200).json(task.taskList[index]);
      } else {
        res.status(401);
        throw new Error("Task not found");
      }
    } else {
      res.status(401);
      throw new Error("Task not found");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = {
  authUser,
  registerUser,
  loggoutUser,
  seeTask,
  updateTaskStatus,
};
