const express = require("express");
const membersController = require("../controllers/members.controller");

const router = express.Router();

router.get("/", membersController.getAllMembers);
router.post("/", membersController.createMember);
router.put("/:id", membersController.updateMember);
router.delete("/:id", membersController.deleteMember);

module.exports = router;
