import { r } from '../../db';
import { TOKEN_SECRET_KEY } from '../../constants';
import jwt from 'jsonwebtoken';
import validator from "validator";

const USER_NAMEREGEX = /^(?=.{8,20}$)(?![.])(?!.*[.]{2})[a-zA-Z0-9.]+(?<![_.])$/;

const signin = async (args) => {
    const { userNameOrMail, password } = args;
    const filteredData = {};

    /* Validation && UserName or Mail Detector */
    if (userNameOrMail) {
        const isMail = validator.isEmail(userNameOrMail);
        const isUserName = USER_NAMEREGEX.test(userNameOrMail);
        
        if (isMail) filteredData.mail = userNameOrMail;
        else if (isUserName) filteredData.userName = userNameOrMail;
        else return {
            message: "Gönderdiğiniz kullanıcı adı veya mail gerekli kuralları sağlamıyor",
            code: 400
        };
    }
    if (password) {
        const md5Controller = validator.isMD5(password);
        if (md5Controller) filteredData.password = password;
        else return {
            message: "Lütfen md5 formatında bir şifre belirtiniz",
            code: 404
        };
    };

    
    const user = await r.db("hifaKiraTakip").table("users").filter(filteredData).run();
    if (user && user.length) {
        const userData = user[0];
        if (userData.password === args.password) {
            let tokenConfigs = {
                data: {
                    userID: userData.id
                }
            };
            if (args.configs) {
                if (args.configs.expireDate) tokenConfigs.exp = args.configs.expireDate;
            }
            const token = jwt.sign(tokenConfigs, TOKEN_SECRET_KEY);
            return await r.db("hifaKiraTakip").table("users").get(userData.id).update({
                token: token
            }).then(() => {
                return {
                    message: "Giriş başarılı.",
                    code: 200,
                    token: token
                };
            });
        } else {
            return {
                code: 500,
                message: "Parola veya kullanıcı adı hatalı."
            };
        }
    } else {
        return {
            code: 500,
            message: "Böyle bir kullanıcı bulunamadı."
        };
    }

}

export default signin;
