// controllers/notification.js
import Notification from "../models/notification.js";

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNotification = async (req, res) => {
  const { message, to,img ,namee} = req.body;
  try {
    const newNotification = new Notification({ message, to ,img,namee});
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (notification) {
      res.json(notification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNotification = async (req, res) => {
  const { message, to, num } = req.body;
  try {
    const notification = await Notification.findById(req.params.id);
    if (notification) {
      notification.message = message || notification.message;
      notification.to = to || notification.to;
      notification.num = num !== undefined ? num : notification.num; // Assurez-vous que le champ "num" est mis à jour si la nouvelle valeur est fournie
      await notification.save();
      res.json(notification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const result = await Notification.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



export const sumNotiByTo = async (to) => {
  try {
    // Find notifications with the specified 'to' value
    const notifications = await Notification.find({ to });

    // Calculate the sum of 'noti' values
    const sum = notifications.reduce((total, notification) => total + notification.num, 0);

    return sum;
  } catch (error) {
    throw new Error(error.message);
  }
};

