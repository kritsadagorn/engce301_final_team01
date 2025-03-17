const { z } = require("zod");

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

module.exports = {
  loginSchema,
};