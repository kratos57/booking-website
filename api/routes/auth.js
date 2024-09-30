import express from "express";

import { login, register, activateAccount, forgotpassword, changepassword, subscribe, addToFavorites, removeFromFavorites,getUserFavorites,sendEmail } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/confirm/:token", activateAccount);
router.post("/forgot-password", forgotpassword);
router.post("/reset-password/:id/:token", changepassword);
router.post("/subscribe", subscribe);
router.post("/send-email", sendEmail);

router.post("/user/favorites/add", addToFavorites); // Change to: router.post("/favorites/add", addToFavorites);
router.post("/user/favorites/remove", removeFromFavorites); // Change to: router.post("/favorites/remove", removeFromFavorites);
router.get("/user/favorites/:username", getUserFavorites);

export default router;
