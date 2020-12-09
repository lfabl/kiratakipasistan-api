import { r } from "../../../db";

const deleteTenant = async (obj, args, context) => {
    try {
        const userID = context.userID;
        return await r.db("hifaKiraTakip").table("tenants").filter({
            id: args.tenantID,
            userID: userID
        }).update({
            visible: false
        }).then(async (res) => {
            if (res.replaced && res.replaced !== 0 || res.unchanged && res.unchanged !== 0) {
                return await r.db("hifaKiraTakip").table("contracts").filter({
                    tenantID: args.tenantID,
                    userID: userID,
                    status: "continuation"
                }).update({
                    status: "cancel"
                }).then((result) => {
                    return {
                        message: "Kiracı başarı ile silinmiştir",
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

export default deleteTenant;
