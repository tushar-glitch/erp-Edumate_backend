const auth_Model = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const otp_model = require("../models/otpmodel")
const secretKey = "randomSecret"
const nodemailer = require('nodemailer')
class userController {
    static sendotp = async (req, res) => {
        var { email } = req.body
        const isemail = await auth_Model.findOne({ email: email })
        if (!isemail) {
            res.status(404).json({
                message: "Email not exist!"
            })
        }
        else {
            const otp = Math.floor(((Math.random() * 9000) + 1000))
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "tusharc20001@gmail.com",
                    pass: "udfmjqntdpovoaoi",
                },
            });
            const mailoptions = {
                from: "tusharc20001@gmail.com",
                to: email,
                subject: "Verify your email",
                html: `Your otp for verification is <b>${otp}</b>. This code will expire in an <b>1 hour</b>`
            }
            const newOtpVerfication = await new otp_model({
                email: email,
                otp: otp,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000
            })
            await newOtpVerfication.save()
            await transporter.sendMail(mailoptions)
            res.status(200).json({
                message: "Otp sent successfully!"
            })
        }
    }

    static verifyotp = async (req, res) => {
        const { email, user_otp } = req.body
        if (email && user_otp) {
            const otprecords = await otp_model.find({
                email: email
            })

            if (otprecords.length == 0) {
                res.status(403).json({
                    message: "Account does not exist or is already verified!"
                })
            }
            else {
                const expiresAt = otprecords[otprecords.length - 1].expiresAt
                const otp = otprecords[otprecords.length - 1].otp
                console.log(otp);
                console.log(user_otp);
                if (expiresAt < Date.now()) {
                    res.status(403).json({
                        message: "Otp has expired!"
                    })
                }
                else {
                    if (user_otp == otp) {
                        res.status(200).json({
                            message: "Your account has been verified!"
                        })
                    }
                    else {
                        res.status(403).json({
                            message: "Wrong otp!"
                        })
                    }
                }
            }
        }
        else {
            res.status(404).json({
                message: "Please provide email and otp"
            })
        }
    }

    static userRegistration = async (req, res) => {
        const { name, age, email, password, Role } = req.body
        if (name && email && password && Role) {
            const isemail = await auth_Model.findOne({ email: email })
            if (!isemail) {
                const newpass = await bcrypt.hash(password, 10)
                const new_user = auth_Model({
                    name: name,
                    email: email,
                    password: newpass,
                    Role: Role,
                    isverified: false
                })
                const save_user = await new_user.save()
                res.status(200).json({
                    message: "Otp has been sent successfully to your email!"
                })
            }
            else {
                res.status(403).json({
                    "message": "User already exist!"
                })
            }
        }
        else {
            res.status(403).json({
                "message": "Please enter all the fields"
            })
            console.log('Field empty');
        }
    }
    static changepass = async (req, res) => {
        const { email, password } = req.body
        if (email && password) {
            const isemail = await auth_Model.findOne({ email: email })
            console.log(isemail);
            if (!isemail) {
                res.status(404).json({
                    "message": "User not exist!"
                })
            }
            else {
                console.log(isemail.password);
                await auth_Model.updateOne(
                    { email: email },
                    { $set: { password: password } }
                );
                res.status(200).json({
                    message: "Password changed successfully!"
                })
                console.log(isemail.password);
            }
        }
        else {
            res.status(403).json({
                "message": "Please enter all the fields"
            })
        }
    }


    static userLogin = async (req, res) => {
        const { userid, password } = req.body
        if (userid && password) {
            const isuser = await auth_Model.findOne({ userid: userid })
            if (!isuser) {
                res.status(403).json({
                    "message": "Incorrect credentials"
                })
            }
            else {
                if (password != isuser.password) {
                    res.status(403).json({
                        "message": "Incorrect password"
                    })
                }
                else {
                    const token = jwt.sign({ userid, password }, secretKey, { expiresIn: '1h' })
                    console.log(token);
                    res.status(200).json({
                        accesstoken: token
                    })
                }
            }
        }
        else {
            res.status(403).json({
                "message": "Please enter all the fields"
            })
        }
    }
}

module.exports = userController