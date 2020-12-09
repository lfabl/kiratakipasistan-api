import { r } from "../../../db";

const deleteRealEstate = async (obj, args, context) => {
    try {
        const userID = context.userID;
        return await r.db("hifaKiraTakip").table("realEstates").filter({
            id: args.realEstateID,
            userID: userID
        }).update({
            visible: false
        }).then(async (res) => {
            if (res.replaced && res.replaced !== 0 || res.unchanged && res.unchanged !== 0) {
                return await r.db("hifaKiraTakip").table("contracts").filter({
                    realEstateID: args.realEstateID,
                    userID: userID,
                    status: "continuation"
                }).update({
                    status: "cancel"
                }).then((result) => {
                    return {
                        message: "Emlak başarı ile silinmiştir",
                        code: 200
                    }
                }).catch((err) => {
                    return {
                        message: "Hata" + err.toString(),
                        code: 400
                    }
                })
            }
            else {
                return {
                    message: "Üzgünüz Bir hata oluştu",
                    code: 400
                }
            }
        }).catch((err) => {
            return {
                message: "Hata" + err.toString(),
                code: 400
            }
        })
    } catch (error) {
        return {
            message: "Hata" + error,
            code: 500
        }
    }
}

export default deleteRealEstate;
