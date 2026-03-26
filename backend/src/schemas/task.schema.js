const { z } = require("zod");

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().default(""),
  status: z.enum(["todo", "in_progress", "done"]).default("todo"),
  memberId: z.string().optional(),
});

module.exports = {
  taskSchema,
};
