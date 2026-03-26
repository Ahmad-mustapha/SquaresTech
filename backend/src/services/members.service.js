const db = require("../db");
const { v4: uuid } = require("uuid");

// Get all members
function getMembers() {
    return db.prepare("SELECT * FROM members").all();
}

// Create new member
function createMember({ name, email, role }) {
    const id = uuid();
    db.prepare("INSERT INTO members (id, name, email, role) VALUES (?, ?, ?, ?)")
        .run(id, name, email, role);
    return { id, name, email, role };
}

// Update member
function updateMember(id, { name, email, role }) {
    db.prepare("UPDATE members SET name=?, email=?, role=? WHERE id=?")
        .run(name, email, role, id);
    return db.prepare("SELECT * FROM members WHERE id=?").get(id);
}

// Delete member
function deleteMember(id) {
    return db.prepare("DELETE FROM members WHERE id=?").run(id);
}

module.exports = { getMembers, createMember, updateMember, deleteMember };