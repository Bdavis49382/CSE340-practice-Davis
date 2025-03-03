import { Router } from "express";
import { getCategories } from "../../models/category/index.js";
import { registerUser, verifyUser } from "../../models/account/account.js";
import { body, validationResult } from "express-validator";
import { requireAuth } from "../../utils/index.js";

const router = Router();

// Build an array of validation checks for the registration route
const registrationValidation = [
  body("email").isEmail().withMessage("Invalid email format."),
  body("password")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .withMessage(
      "Password must be at least 8 characters long, include one uppercase letter, one number, and one symbol."
    ),
];

router.get("/register", registrationValidation, async (req, res) => {
  const categories = await getCategories();
  res.locals.scripts.push("<script src='/js/registration.js' defer></script>");
  res.render("/account/register", { title: "Account Page", categories });
});

router.post("/register", registrationValidation, async (req, res) => {
  // Check if there are any validation errors
  const results = validationResult(req);
  if (results.errors.length > 0) {
    results.errors.forEach((error) => {
      req.flash("error", error.msg);
    });
    res.redirect("/account/register");
    return;
  }

  const { email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    req.flash("error", "Passwords do not match.");
    res.redirect("/account/register");
  } else {
    registerUser(email, password);
    req.flash("success", "Registration successful! Please log in.");
    res.redirect("/account/login");
  }
});

router.get("/login", async (req, res) => {
  const categories = await getCategories();
  res.render("/account/login", { title: "Account Page", categories });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await verifyUser(email, password);
  if (user) {
    delete user.password;
    req.session.user = user;
    res.redirect("/account");
  } else {
    res.redirect("/account/login");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

router.get("", requireAuth, async (req, res) => {
  const categories = await getCategories();
  res.render("/account/account", { title: "Account Page", categories });
});
export default router;
