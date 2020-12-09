import { r } from '../../../db';
import { storeUploadImage } from "../../tools/storeUploadImage";
import { storeDeleteImage } from "../../tools/storeDeleteImage";

const updateTenantImage = async (obj, args, context) => {
    const userID = context.userID;
    const tenantID = args.tenantID;
    const tenantDatas = await r.db("hifaKiraTakip").table("tenants").filter({ id: tenantID, visible: true, userID: userID }).run();
    if (tenantDatas.length !== 0) {
        const newTenantDataFiltered = tenantDatas[0];
        let newTenantData = {}
        if (typeof args.profileImage !== "undefined") {
            const uploadResult = await storeUploadImage(args.profileImage.promise);
            if (uploadResult.status === true) {
                if (newTenantDataFiltered.profileImageName !== "") {
                    await storeDeleteImage(newTenantDataFiltered.profileImageName);
                }
                newTenantData.profileImageName = uploadResult.fileName;
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
            await storeDeleteImage(newTenantDataFiltered.profileImageName);
            newTenantData.profileImageName = "";
        }
        return r.db("hifaKiraTakip").table("tenants").filter({ id: tenantID, visible: true, userID: userID }).update(newTenantData).then(() => {
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
            message: "Böyle bir kiracı bulunamadı.",
            code: 500
        };
    }
}
export default updateTenantImage;