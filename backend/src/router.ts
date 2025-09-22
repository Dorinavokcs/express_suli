import { Router } from "express";
import { getAll, deleteUser, addUser, updateUser } from "./controller.js";

const router = Router();

router.get("/users", getAll);
router.delete("/users/:id", deleteUser);
router.post("/users", addUser);
router.put("/users/:id", updateUser);

export default router;