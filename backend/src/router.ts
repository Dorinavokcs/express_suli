import { Router } from "express";
import { getAll, deleteUser, addUser, updateUser, getCurrentUser,updateFullUser } from "./controller.js";

const router = Router();

router.get("/users", getAll);
router.delete("/users/:id", deleteUser);
router.post("/users", addUser);
router.put("/users/:id", updateUser);
router.put("users/:id", updateFullUser); //hianyzik?
router.get("users/:id", getCurrentUser)
router.get("/search", searchUsers)

export default router;