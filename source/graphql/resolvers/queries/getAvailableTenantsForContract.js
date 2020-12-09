import { r } from '../../../db';

const getAvailableTenantsForContract = async (obj, args, context) => {
    try {
        const userID = context.userID;
        return await r.db("hifaKiraTakip").table("tenants").filter(function (tenant) {
            return r.branch(
                r.db("hifaKiraTakip").table("contracts").filter(function (contract) {
                    return contract("tenantID").eq(tenant("id")).and(
                        contract("status").eq("continuation")
                    )
                }).coerceTo("array").eq([]),
                tenant("userID").eq(userID)
                    .and(tenant("visible").eq(true)),
                false
            )
        }).orderBy(r.desc("registerDate"))
            .pluck("id", "fullName")
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

export default getAvailableTenantsForContract;
