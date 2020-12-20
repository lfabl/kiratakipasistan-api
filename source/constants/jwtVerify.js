import { r } from "../db";
import { TOKEN_SECRET_KEY } from './index.js';
import jwt from 'jsonwebtoken';

const jwtVerify = async (request) => {
    return new Promise(async (resolve, reject) => {
        const token = await request.headers["x-access-token"];
        if (!token)
            reject({
                message: "Token bulunmamaktadır.",
                code: 400
            })
        else {
            return await jwt.verify(token, TOKEN_SECRET_KEY, (error, decoded) => {
                if (error)
                    reject({
                        message: "Beklenmedik bir hata ile karşılaşıldı.",
                        code: 400
                    })
                else {
                    r.db("hifaKiraTakip").table("users").filter({ id: decoded.data.userID, token: token }).then((res) => {
                        if (res.length !== 0 && typeof res !== "undefined") {
                            resolve({
                                message: "Bir sorun yok",
                                code: 200,
                                userID: decoded.data.userID
                            })
                        }
                        else {
                            reject({
                                message: "Bu token'e ait bir kullanıcı bulunamamıştır.",
                                code: 400
                            })

                        }
                    })
                }
            });
        }
    })
}

export default jwtVerify;