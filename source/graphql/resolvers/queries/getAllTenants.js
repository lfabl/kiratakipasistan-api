import { r } from '../../../db';

const getAllTenants = async (obj, args, context) => {
    try {
        const userID = context.userID;
        return await r.db("hifaKiraTakip").table("tenants").filter({
            userID: userID,
            visible: true
        }).merge(function (tenant) {
            return {
                activeApartment: r.db('hifaKiraTakip').table("contracts").filter({
                    tenantID: tenant("id"),
                    status: "continuation"
                }).coerceTo("array").merge(function (data) {
                    return r.db('hifaKiraTakip').table("realEstates").get(data("realEstateID"))
                }).pluck("title", "id")
            }
        }).orderBy(r.desc("registerDate"))
            .pluck("id", "fullName", "phoneNumber1", "suretyFullName", "suretyPhoneNumber", "profileImageName", "activeApartment")
            .then((res) => {
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

export default getAllTenants;
