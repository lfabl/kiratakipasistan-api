import { r } from '../../../db';

const contractControl = async (obj, args, context) => {
    try {
        const userID = context.userID;
        if (args.tenantID && args.tenantID !== "") {
            return r.db("hifaKiraTakip").table("contracts").filter({
                userID: userID,
                tenantID: args.tenantID,
                status: "continuation"
            }).then((res) => {
                if (res.length !== 0) {
                    return {
                        message: "Bu kiracıya ait bir sözleşme bulunmaktadır.",
                        code: 201
                    }
                }
                else {
                    return {
                        message: "Bu kiracı için sözleşme oluşturulabilir.",
                        code: 200
                    }
                }
            }).catch((err) => {
                return {
                    message: "Failed: " + err.message,
                    code: err.code
                }
            })
        }
        else if (args.realEstateID && args.realEstateID !== "") {
            return r.db("hifaKiraTakip").table("contracts").filter({
                userID: userID,
                realEstateID: args.realEstateID,
                status: "continuation"
            }).then((res) => {
                if (res.length !== 0) {
                    return {
                        message: "Bu emlağa ait bir sözleşme bulunmaktadır.",
                        code: 201
                    }
                }
                else {
                    return {
                        message: "Bu emlak için sözleşme oluşturulabilir.",
                        code: 200
                    }
                }
            }).catch((err) => {
                return {
                    message: "Failed: " + err.message,
                    code: err.code
                }
            })
        }
    } catch (error) {
        return {
            message: "Failed: " + error.message,
            code: error.code
        }
    }
}

export default contractControl;
