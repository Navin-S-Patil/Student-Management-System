const router = require("express").Router();
const {
  authAdmin,
  registerAdmin,
  loggoutAdmin,
  addStudents,
  assignTask,
} = require("../controller/adminController");
const { registerUser } = require("../controller/userController");
const { protectAdmin } = require("../middleware/authMiddleware");
``;
router.post("/auth", authAdmin);
router.post("/register", protectAdmin, registerAdmin);
router.post("/loggout", loggoutAdmin);
router.post("/addStuds", protectAdmin, registerUser);
router.post("/assignTask", protectAdmin, assignTask);

module.exports = router;
