import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Token from "../models/token.js"; 
import Hotel from "../models/Hotel.js";
// Import the Token model
import crypto from "crypto";
import nodemailer from "nodemailer";
import verifmail from "../utils/verifyToken.js";
import mongoose from 'mongoose';

export const register = async (req, res, next) => {
    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if the email already exists
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Check if the phone number already exists
        const existingPhone = await User.findOne({ phone: req.body.phone });
        if (existingPhone) {
            return res.status(400).json({ message: "Phone already exists" });
        }
        const existingrib = await User.findOne({ phone: req.body.rib});
        if (existingrib) {
            return res.status(400).json({ message: "rib already exists" });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Create a new user instance
        const newUser = new User({
            ...req.body,
            password: hash,
        });

        // Save the user to the database
        await newUser.save();

        // Generate and save verification token
        const token = new Token({
            userId: newUser._id, // Use newUser._id to get the user's ID
            token: crypto.randomBytes(16).toString('hex')
        });
        await token.save();
        
        console.log(token); // Just for testing, you may remove this line
        // send mail 

        const usermail = req.body.email;
        
        const link =`http://localhost:8800/api/auth/confirm/${token.token}`;
        await verifmail(usermail , link);
        res.status(200).send({
          message: "Email send check your mail "
        })
        res.status(200).send("User has been created");
    } catch (err) {
        next(err);
    }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ message: "User not found!" });

    // Check if the user's email is verified
    if (!user.verified) {
      return res.status(401).json({ message: "Email not verified! Please verify your email to log in." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Wrong password or username!" });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};


export const activateAccount = async (req, res, next) => {
  try {
      const token = await Token.findOne({ token: req.params.token });

      if (!token) {
          return res.status(404).send("Token not found");
      }

      await User.updateOne({ _id: token.userId }, { $set: { verified: true } });
      await Token.findByIdAndDelete(token._id);

      // Send dashboard email after account activation
      const user = await User.findById(token.userId);
      if (user.rib) {
          const dashboardLink = `http://localhost:8800/dashboard`;
          await sendDashboardEmail(user.email, dashboardLink);
      }

      res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            text-align: center;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
          }
          p {
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Email Verified Successfully</h1>
          <p>Your email has been successfully verified. You can now access your account.</p>
        </div>
      </body>
      </html>
    `);
    
  } catch (error) {
      next(error);
  }
};

const sendDashboardEmail = async (email, link) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: "Welcome to Your Dashboard",
            html: `
                <p>Dear User,</p>
                <p>Thank you for verifying your email and signing up to be a host. Click the following link to access your dashboard:</p>
                <a href="${link}">${link}</a>
                <p>Best regards,</p>
                <p>Your Website Team</p>
            `,
        });
    } catch (error) {
        console.error('Error sending dashboard email:', error);
        throw new Error("Failed to send dashboard email");
    }
};


export const forgotpassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }); // Use User instead of UserModel

    if (!user) {
      return res.send({ Status: "User not existed" });
    }

    const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.USER, // Sender email
      to: email, // Receiver
      subject: "Reset Your password",
      html: `
        <div>
          <p>Click the following link to reset your password:</p>
          <a href="${process.env.BASE_URL}reset_password/${user._id}/${token}">Reset Password</a>
        </div>
      `,
    });

    console.log("Mail sent successfully");
    res.status(200).send("Mail sent successfully");
  } catch (error) {
    console.log("Mail failed to send", error);
    res.status(500).send("Mail failed to send");
  }
};

export const changepassword = async (req, res, next) => {

const {id, token} = req.params
const {password} = req.body

jwt.verify(token, "jwt_secret_key", (err, decoded) => {
  if(err){
    return res.json({Status: "Error with token"})
  } else {
    bcrypt.hash(password, 10)
    .then(hash =>{
      User.findByIdAndUpdate({_id: id}, {password: hash})
      .then(u => res.send({Status: "Succes"}))
      .catch(err => res.send({Status: err}))
    })
    .catch(err => res.send({Status: err}))
  }
})


}
export const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User with this email is not registered' });
    }

    // Check if the user is already subscribed
    if (user.subscribed) {
      return res.status(400).json({ success: false, message: 'User with this email is already subscribed' });
    }

    // Update the subscribed field to true
    user.subscribed = true;
    await user.save();

    // Send a response indicating successful subscription
    res.status(200).json({ success: true, message: 'Subscription successful!' });
  } catch (err) {
    console.error('Subscription error:', err);
    res.status(500).json({ success: false, message: 'Error subscribing to email notifications' });
  }
};

// Add to favorites controller
export const addToFavorites = async (req, res, next) => {
  try {
    const { username, hotelId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({ message: "Invalid hotel ID format" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    if (!user.favorites.includes(hotelId)) {
      user.favorites.push(hotelId);
      await user.save();
    }

    res.status(200).json({ message: "Hotel added to favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Remove from favorites controller
export const removeFromFavorites = async (req, res, next) => {
  try {
      const { username, hotelId } = req.body;

      const user = await User.findOne({ username }); // Find user by username
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Remove hotel from favorites
      user.favorites = user.favorites.filter(fav => fav.toString() !== hotelId);
      await user.save();

      res.status(200).json({ message: "Hotel removed from favorites" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const getUserFavorites = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username }).populate("favorites");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const sendEmail = async (req, res) => {
  
  const { name, email, emailTo, phone, message } = req.body;

  try {
    
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.USER, // sender address
      to: emailTo, // list of receivers
      subject: `Message from ${name}`, // Subject line
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage: ${message}`, // plain text body
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};


