import { r } from '../../../db';
import validate from "type-valid";

const isEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
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

const updateProfile = async (obj, args, context) => {
    let validationTypes = {};
    if (args.oldPassword) {
        validationTypes.oldPassword = {
            isEmptyString: true,
            isMD5: true
        };
    }
    if (args.newPassword) {
        validationTypes.newPassword = {
            isEmptyString: true,
            isMD5: true
        };
    }
    if (!isEmpty(validationTypes)) {
        const validationControlResult = validationControl(args, validationTypes);
        if (!validationControlResult.result) {
            return {
                message: validationControlResult.error,
                code: 400
            };
        }
    }
    const userID = context.userID;
    const user = await r.db("hifaKiraTakip").table("users").get(userID).run();
    if (user) {
        let newUserData = {}
        if (args.oldPassword !== user.password) {
            return {
                message: "Eski şifre hatalı. Lütfen doğru girdiğinizden emin olun.",
                code: 500
            }
        }
        else {
            newUserData.password = args.newPassword
        }
        return r.db("hifaKiraTakip").table("users").get(userID).update(newUserData).then(() => {
            return {
                message: "Bilgileriniz başarı ile güncellenmiştir.",
                code: 200
            }
        }).catch((err) => {
            return {
                message: err,
                code: 500
            }
        });

    } else {
        return {
            message: "Böyle bir kullanıcı bulunamadı.",
            code: 500
        };
    }
}
export default updateProfile;