import { r } from '../../../db';

const getAvailableRealEstatesForContract = async (obj, args, context) => {
    try {
        const userID = context.userID;
        return await r.db("hifaKiraTakip").table("realEstates").filter(function (realEstate) {
            return r.branch(
                r.db("hifaKiraTakip").table("contracts").filter(function (contract) {
                    return contract("realEstateID").eq(realEstate("id")).and(
                        contract("status").eq("continuation")
                    )
                }).coerceTo("array").eq([]),
                realEstate("userID").eq(userID)
                    .and(realEstate("visible").eq(true)),
                false
            )
        }).orderBy(r.desc("registerDate"))
            .pluck("id", "title")
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

export default getAvailableRealEstatesForContract;
