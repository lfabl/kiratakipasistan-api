import { r } from '../../../db';

const getAllRealEstates = async (obj, args, context) => {
    try {
        const userID = context.userID;

        return await r.db("hifaKiraTakip").table("realEstates").filter({
            userID: userID,
            visible: true
        }).merge(function (realEstates) {
            return {
                activeTenant: r.db('hifaKiraTakip').table("contracts").filter({
                    realEstateID: realEstates("id"),
                    status: "continuation"
                }).coerceTo("array").merge(function (data) {
                    return r.db('hifaKiraTakip').table("tenants").get(data("tenantID"))
                }).pluck("fullName"),

                rentalType: r.db("hifaKiraTakip").table("contracts")
                    .filter({ 
                        realEstateID: realEstates("id"),
                        status: "continuation" 
                    })
                    .coerceTo("array").pluck("status"),
            }
        }).orderBy(r.desc("registerDate")).pluck("id", "title", "type", "rentalType", "rentalDate", "ownerManagerPhoneNumber", "ownerNameSurname", "activeTenant", "paymentPeriod", "detailRent")
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

export default getAllRealEstates;
