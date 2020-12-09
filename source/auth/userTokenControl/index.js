import { r } from "../../db";

const userTokenControl = async (args) => {
    return await r.db("hifaKiraTakip").table("users").filter({
        token: args.token
    }).then((res) => {
        if (res && res.length !== 0) {
            return {
                message: "Token Bulundu.",
                code: 200,
                userID: res[0].id
            }
        }
        else {
            return {
                message: "Token Bulunamadı.",
                code: 401
            }
        }
    }).catch((err) => {
        return {
            message: "HATA" + err,
            code: 400
        }
    })
}

export default userTokenControl;