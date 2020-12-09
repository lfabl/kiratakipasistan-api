import { r } from '../../../db';

const getTenant = async (obj, args, context) => {
    try {
        const tenantID = args.tenantID;
        return await r.db("hifaKiraTakip").table("tenants").filter({
            id: tenantID,
            visible: true
        }).merge(function (tenant) {
            return {
                activeApartment: r.db('hifaKiraTakip').table("contracts").filter({
                    tenantID: tenant("id"),
                    status: "continuation" 
                }).coerceTo("array").merge(function (data) {
                    return r.db('hifaKiraTakip').table("realEstates").get(data("realEstateID"))
                }).pluck("title","id")
            }
        }).then((res) => {
            return {
                data: res.length !== 0 ? res[0] : res,
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

export default getTenant;
