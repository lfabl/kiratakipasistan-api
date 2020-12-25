import { r } from "../../../db";

const deleteContract = async (obj, args, context) => {
    try {
        const userID = context.userID;
        return await r.db("hifaKiraTakip").table("contracts").filter(function (contract) {
            return contract("status").eq("continuation").and(
                contract("userID").eq(userID)
            ).and(
                contract("tenantID").eq(args.tenantID).or(
                    contract("realEstateID").eq(args.realEstateID)
                )
            )
        }).update({
            status: "cancel"
        }).then((updateResult) => {
            if (updateResult.replaced && updateResult.replaced !== 0 || updateResult.unchanged && updateResult.unchanged !== 0) {
                return {
                    message: "Başarı ile bilgiler güncellenmiştir.",
                    code: 200
                }
            }
            else {
                return {
                    message: "Hata: sözleşme iptal edilememiştir.",
                    code: 400
                }
            }
        })
    } catch (error) {
        return {
            message: "Hata" + error,
            code: 500
        }
    }
}

export default deleteContract;
