const { z } = require("zod");

const signupValidation = (req, res, next) => {
    console.log("🔍 Verifying user details... for signup ")
  const schema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(3).max(100),
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Bad request",
      errors: result.error.errors.map((err) => err.message)
    });
  }

console.log("✅ User details verified for Signup")
  next();
};


const loginValidation = (req, res, next) => {
     console.log("🔍 Verifying user details... for login ")
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(100),
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Bad request",
      errors: result.error.errors.map((err) => err.message)
    });
  }
console.log("✅ User details verified for Login")
  next();
};
module.exports={
    loginValidation,signupValidation
}