import { Router } from "express";

const router = Router();

router.route("/login").post(login)
router.router("/register").post(register)
router.route("/add_t0_actvity")
router.route("/get_all_activity")

export default router;