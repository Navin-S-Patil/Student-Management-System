const router = require("express").Router();
const {
  authUser,
  registerUser,
  loggoutUser,
  seeTask,
  updateTaskStatus,
} = require("../controller/userController");
const {protectUser, protectAdmin} = require("../middleware/authMiddleware");

router.post("/auth", authUser);
//use can only be registerd by admin
//middleware to check if user is admin
router.post("/register", protectAdmin,registerUser);

router.post("/loggout", loggoutUser);

router.get("/seeTask", protectUser,seeTask);
router.put("/updateTaskStatus", protectUser,updateTaskStatus);

module.exports = router;
