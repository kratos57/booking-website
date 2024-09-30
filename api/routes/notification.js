// routes/notification.js
import express from "express";
import { getAllNotifications, createNotification, updateNotification, deleteNotification,sumNotiByTo } from "../controllers/notification.js";

const router = express.Router();

router.get("/get", getAllNotifications);
router.post("/creat", createNotification);
router.put("/update/:id", updateNotification);
router.delete("/delete/:id", deleteNotification);
router.get("/sum/:to", async (req, res) => {
  try {
    const { to } = req.params;
    const sum = await sumNotiByTo(to);
    res.json({ sum });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
