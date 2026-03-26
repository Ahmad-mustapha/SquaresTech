const { z } = require("zod");

const memberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
});

module.exports = {
  memberSchema,
};
