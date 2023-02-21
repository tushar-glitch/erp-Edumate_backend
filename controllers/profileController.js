const auth_Model = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = "randomSecret"
class profileController{
    static getprofile = async (req, res) => {
        const token = req.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token, secretKey)
        const user = await auth_Model.findOne({ userid: decode.userid })
        res.send(user)
    }
}

module.exports = profileController