
import { r } from "../../db";
const resetPasswordControl = async (args) => {
    const newResetPassword = await r.uuid();
    return await r.db("hifaKiraTakip").table("users").filter({
        resetPasswordID: args.id
    }).update({
        password: args.password,
        resetPasswordID: null
    }).then((res) => {
        if (res && res.replaced !== 0) {
            return {
                message: "Şifreniz değiştirilmiştir.",
                code: 200
            }
        }
        else {
            return {
                message: "Şifre talepleri tek kullanımlıktır lütfen, yeni bir şifre talebi oluşturun.",
                code: 402
            }
        }
    }).catch((err) => {
        return {
            message: "Hata : " + err,
            code: 400
        }
    })
}

export default resetPasswordControl;