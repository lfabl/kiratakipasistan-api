import {
    r
} from '../../../db';

const realestateNotificationSettings = async (obj, args, context) => {
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
        return {
            message: "Erişim başarılı.",
            code: 200,
            data: estate
        };
    } catch (error) {
        return {
            message: "Sunucu kaynaklı hata: " + error.message,
            code: 400
        }
    }
}
export default realestateNotificationSettings;
