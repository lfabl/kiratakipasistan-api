import { r } from '../../../db';
import validate from "type-valid";
import { storeUploadImage } from "../../tools/storeUploadImage";
import { storeDeleteImage } from "../../tools/storeDeleteImage";

const updateProfileImage = async (obj, args, context) => {
    const userID = context.userID;
    const user = await r.db("hifaKiraTakip").table("users").get(userID).run();
    if (user) {
        let newUserData = {}
        if (typeof args.profileImage !== "undefined") {
            const uploadResult = await storeUploadImage(args.profileImage.promise);
            if (uploadResult.status === true) {
                if (user.profileImageName !== "") {
                    await storeDeleteImage(user.profileImageName);
                }
                newUserData.profileImageName = uploadResult.fileName;
            }
            else {
                console.log("buraya girdi")
                return {
                    message: "Güncelleme işlemi yapılamamıştır. Lütfen daha sonra tekrar deneyin",
                    code: 400
                }
            }
        }
        else if (typeof args.deleteProfileImage !== "undefined" && args.deleteProfileImage === true) {
            await storeDeleteImage(user.profileImageName);
            newUserData.profileImageName = "";
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
export default updateProfileImage;