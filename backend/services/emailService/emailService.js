const nodemailer = require('nodemailer')
const sendEMail = async(data)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.MY_EMAIL,
            pass: process.env.EMAIL_APP_PASS
        }
    })

    const mailOption={
        from: "BondBook",
        to: data.email,
        subject: data.subject,
        text: data.text
    }

    await transporter.sendMail(mailOption)

}
module.exports = sendEMail;