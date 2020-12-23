import { r } from '../../../db';
import validate from "type-valid";
import { storeUploadImage } from "../../tools/storeUploadImage";
import { storeDeleteImage } from "../../tools/storeDeleteImage";

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

const updatePasswordValidation = async (args) => {
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
        else {
            return {
                message: "",
                code: 200
            }
        }
    }
}

const updateProfile = async (obj, args, context) => {
    const updateVariables = {};
    const userID = context.userID;
    const user = await r.db("hifaKiraTakip").table("users").get(userID).run();

    if (user) {
        /* Update Password */
        if (typeof args.oldPassword !== "undefined" && args.oldPassword !== "") {
            const passwordValidation = await updatePasswordValidation(args);
            if (passwordValidation.code !== 200) return passwordValidation;

            if (args.oldPassword !== user.password) {
                return {
                    message: "Eski şifre hatalı. Lütfen doğru girdiğinizden emin olun.",
                    code: 500
                }
            }
            else {
                updateVariables.password = args.newPassword
            }
        }

        /* Update Profile Image */
        if (typeof args.profileImage !== "undefined") {
            const uploadResult = await storeUploadImage(args.profileImage.promise);
            if (uploadResult.status === true) {
                if (user.profileImageName !== "") {
                    await storeDeleteImage(user.profileImageName);
                }
                updateVariables.profileImageName = uploadResult.fileName;
            }
            else {
                console.log("buraya girdi")
                return {
                    message: "Güncelleme işlemi yapılamamıştır. Lütfen daha sonra tekrar deneyin",
                    code: 400
                }
            }
        }

        /* Delete Profile Image */
        else if (typeof args.deleteProfileImage !== "undefined" && args.deleteProfileImage === true) {
            await storeDeleteImage(user.profileImageName);
            updateVariables.profileImageName = "";
        }

        return r.db("hifaKiraTakip").table("users").get(userID).update(updateVariables).then(() => {
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