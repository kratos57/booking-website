import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import nodemailer from 'nodemailer';



export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };
  export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next,() => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };

const verifmail= async(email,link)=>{

  try{
    let transporter = nodemailer.createTransport({
      service:"Gmail" ,
      auth:{
        user: process.env.USER,
        pass:process.env.PASSWORD,
      },
    });
    //send email 
    let infot =await transporter.sendMail({
      from:process.env.USER,//sender email
      to:email,//receiver
      subject:"Account verification",
      text:"Welcome",
      html:`
      <div>
      <a href=${link}> Click here to activate your account</a>

      </div>
      `//MAIL BODY 
    });
    console.log("mail send successfuly");

  }catch(error)
  {
    console.log(error, "mail failed to send ")
  }
};
export default verifmail;
