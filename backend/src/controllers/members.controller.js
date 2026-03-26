const membersService = require("../services/members.service");
const { memberSchema } = require("../schemas/member.schema");

async function getAllMembers(req, res, next) {
  try {
    const members = membersService.getMembers();
    res.json(members);
  } catch (error) {
    next(error);
  }
}

async function createMember(req, res, next) {
  try {
    const validatedData = memberSchema.parse(req.body);
    const newMember = membersService.createMember(validatedData);
    res.status(201).json(newMember);
  } catch (error) {
    next(error);
  }
}

async function updateMember(req, res, next) {
  try {
    const { id } = req.params;
    const validatedData = memberSchema.parse(req.body);
    const updatedMember = membersService.updateMember(id, validatedData);
    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(updatedMember);
  } catch (error) {
    next(error);
  }
}

async function deleteMember(req, res, next) {
  try {
    const { id } = req.params;
    membersService.deleteMember(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
};
