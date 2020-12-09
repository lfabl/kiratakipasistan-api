import { r } from '../../db';
import validate from 'type-valid';
import nodemailer from "nodemailer";
import { restart } from 'nodemon';

const validationControl = (args, validationTypes) => {
    let newArgs = [];
    const names = Object.keys(validationTypes);
    names.forEach(name => newArgs.push({
        name,
        param: args[name],
        type: validationTypes[name]
    }));
    const result = validate({ args: newArgs });
    return result;
}
const forgetPassword = async (args) => {
    console.log(args)
    let validationTypes = {
        mail: {
            isEmptyString: true,
            isMail: true,
            isLength: {
                min: 5,
                max: 80
            }
        }
    };

    const validationControlResult = validationControl(args, validationTypes);
    if (!validationControlResult.result) {
        return {
            message: validationControlResult.error,
            code: 400
        };
    }

    const userEmail = await r.db("hifaKiraTakip").table("users").filter({
        mail: args.mail
    }).run();

    if (userEmail && userEmail.length) {
        return await sendEmail({ args });
    
    } else {
        return {
            message: "Bu kullanıcı maili bulunamadı.",
            code: 409
        };
    }
}

const sendEmail = async ({ args }) => {
    return new Promise(async (resolve, reject) => {
        const uuid = await r.uuid();
        const mail = args.mail;
        const subject = "HifaSoft Şifre Sıfırlama";
        const text = "Merhabalar, şifre sıfırlama isteğiniz sistemimiz tarafından algılanmıştır" + " http://5.2.82.43:4010/auth/resetPassword?id=" + uuid;

        const result = await emailSender({ mail, subject, text })
        if (result.code === 200) {
            await r.db("hifaKiraTakip").table("users").filter({ mail: mail }).update({ resetPasswordID: uuid }).then((res) => {
                resolve({
                    message: "İşlem başarılı Lütfen Mailinizi Kontrol Edin",
                    code: 200
                })
            }).catch((err) => {
                reject({
                    message: err,
                    code: 400
                });
            })
        }
        else {
            reject(result);
        }
    })
}

const emailSender = ({ mail, subject, text }) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'caglayagci371@gmail.com',
                pass: '123456789cagla'
            }
        });

        const mailOptions = {
            from: 'caglayagci371@gmail.com',
            to: mail,
            subject: subject,
            text: text
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject({
                    message: "Mail gönderimi başarız",
                    code: 400
                })
            } else {
                resolve({
                    message: "Doğrulama mailiniz gönderilmiştir lütfen bakınız şifresini unutan mallar" + info,
                    code: 200
                })
            }
        });
    })
}
export default forgetPassword;