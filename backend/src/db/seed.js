const db = require("./index");
const { v4: uuid } = require("uuid");

const initialMembers = [
  { name: "Alice Johnson", email: "alice@squarestech.com", role: "Frontend Developer" },
  { name: "Bob Smith", email: "bob@squarestech.com", role: "Backend Developer" },
  { name: "Charlie Davis", email: "charlie@squarestech.com", role: "Full Stack Developer" },
];

function seed() {
  const insert = db.prepare("INSERT INTO members (id, name, email, role) VALUES (?, ?, ?, ?)");

  initialMembers.forEach((member) => {
    // Check if member already exists by email
    const exists = db.prepare("SELECT * FROM members WHERE email = ?").get(member.email);
    if (!exists) {
      insert.run(uuid(), member.name, member.email, member.role);
    }
  });

  console.log("Database seeded successfully!");
}

seed();
