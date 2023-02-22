const auth_Model = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = "randomSecret"
class attendanceController {
    static overallattendance = async (req, res) => {
        const token = req.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token, secretKey)
        const user = await auth_Model.findOne({ userid: decode.userid })
        const subjects = Object.keys(user.attendance)
        function countDays(attendanceData) {
            const days = [];
            for (const subject_name in attendanceData) {
                let attended_classes = 0;
                let total_classes = 0;
                for (const month in attendanceData[subject_name]) {
                    for (const day in attendanceData[subject_name][month]) {
                        total_classes++;
                        if (attendanceData[subject_name][month][day] === true) {
                            attended_classes++;
                        }
                    }
                }
                const subject_code = 'KCS301'
                const attendance_percent = (attended_classes/total_classes)*100
                days.push({ subject_code, subject_name, attended_classes, total_classes, attendance_percent });
            }
            return days;
        }

        const daysBySubject = countDays(user.attendance);
        console.log(daysBySubject);
        res.send(daysBySubject)
    }
}

module.exports = attendanceController