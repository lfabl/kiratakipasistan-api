import {
    r
} from '../../../db';

const updateRealestateNotificationGQL = async (obj, args, context) => {
    try {
        const requestorID = context.userID;
        const estate = await r
            .db("hifaKiraTakip")
            .table("realEstates")
            .get(args.id)
        .run();
        if(estate === null || estate === undefined) return {
            message: "İlgili emlak bulunamadı.",
            code: 400
        };
        if(
            estate.userID === null || 
            estate.userID === undefined || 
            requestorID !== estate.userID
        ) return {
            message: "Yetkisiz girişim.",
            code: 503
        };
        if(
            estate.openNotifications === args.openNotifications
        ) return {
            message: "Bildirim ayarı zaten bu durumda.",
            code: 500
        };
        return await r
            .db("hifaKiraTakip")
            .table("realEstates")
            .update({
                openNotifications: args.openNotifications
            }, {
                returnChanges: true
            })
        .then((changedEstate) => {
            const newData = changedEstate.changes[0].new_val;
            return {
                message: "Bildirim ayarı güncellendi.",
                code: 200,
                data: newData
            };
        });
    } catch (error) {
        return {
            message: "Sunucu kaynaklı hata: " + error.message,
            code: 400
        }
    }
}
export default updateRealestateNotificationGQL;