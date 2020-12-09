import { r } from '../../../db';

const getProfile = async (obj, args, context) => {
    try {
        const userID = context.userID;
        return await r.db("hifaKiraTakip").table("users").get(userID).pluck("id", "fullName", "userName", "mail", "profileImageName", "registerDate").then((res) => {
            return {
                data: res,
                response: {
                    message: "Success",
                    code: 200
                }
            }
        }).catch((err) => {
            return {
                data: [],
                response: {
                    message: "Failed: " + err,
                    code: 400
                }
            }
        })
    } catch (error) {
        return {
            data: [],
            response: {
                message: "Failed: " + error.message,
                code: error.code
            }
        }
    }
}

export default getProfile;
