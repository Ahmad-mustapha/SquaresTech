const db = require("../db");
const { v4: uuid } = require("uuid");

function getTasks() {
    return db.prepare("SELECT * FROM tasks").all();
}

function createTask({ title, description, status, memberId }) {
    const id = uuid();
    db.prepare(
        "INSERT INTO tasks (id, title, description, status, memberId) VALUES (?, ?, ?, ?, ?)"
    ).run(id, title, description, status, memberId || null);
    return { id, title, description, status, memberId: memberId || null };
}

function updateTask(id, { title, description, status, memberId }) {
    db.prepare(
        "UPDATE tasks SET title=?, description=?, status=?, memberId=? WHERE id=?"
    ).run(title, description, status, memberId || null, id);
    return db.prepare("SELECT * FROM tasks WHERE id=?").get(id);
}

function deleteTask(id) {
    return db.prepare("DELETE FROM tasks WHERE id=?").run(id);
}

module.exports = { getTasks, createTask, updateTask, deleteTask };