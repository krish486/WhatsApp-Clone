let zod = require("zod")

const registerSchema = zod.object({
    name: zod.string()
        .trim(),
    email: zod
        .string()
        .email("invalid email address")
})

module.exports = registerSchema