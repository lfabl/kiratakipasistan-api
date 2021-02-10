import { r } from '../../../db';
import validate from "type-valid";
import { fixtureDatasConverter } from "../../tools/fixtureDatasConverter";
const validationControl = (args, validationTypes) => {
    let newArgs = [];
    const names = Object.keys(validationTypes);
    names.forEach(name => newArgs.push({
        name,
        param: args[name],
        type: validationTypes[name]
    }));
    const result = validate({ args: newArgs });
    return result;
}

const updateRealEstate = async (obj, args, context) => {
    let updateRealEstateDatas = {};

    let validationTypes = {
        type: {
            isEmptyString: true,
            isLength: {
                min: 5,
                max: 85
            }
        },
        title: {
            isEmptyString: true,
            isLength: {
                min: 4,
                max: 40
            }
        },
        adress: {
            isEmptyString: true,
            isLength: {
                min: 5,
                max: 85
            },
        }
    };

    if (args.usageType) {
        validationTypes.usageType = {
            isEmptyString: true,
            isLength: {
                min: 4,
                max: 40
            },
        };
        updateRealEstateDatas.usageType = args.usageType;
    }
    else {
        updateRealEstateDatas.usageType = "";
    }

    if (args.fixtureDatas) {
        if (args.fixtureDatas.length !== 0) {
            if (args.fixtureDatas.length > 8) {
                return {
                    message: "Maksimum demirbaş sınırına ulaştığınız için ekleme yapılamamaktadır",
                    code: 400
                }
            }
            else {
                const fixtureResult = await fixtureDatasConverter(args.fixtureDatas, args.realEstateID);
                if (fixtureResult.status === true) {
                    updateRealEstateDatas.fixtureDatas = fixtureResult.data
                }
                else {
                    if (typeof fixtureResult.message !== "undefined") {
                        return {
                            message: fixtureResult.message,
                            code: 400
                        }
                    }
                    else {
                        return {
                            message: "Demirbaşlar güncellenirken bir hata oluşmuştur. Lütfen tekrar deneyin",
                            code: 400
                        }
                    }
                }
            }
        }
        else {
            updateRealEstateDatas.fixtureDatas = [];
        }
    }
    else {
        updateRealEstateDatas.fixtureDatas = [];
    }

    if (args.rentalDate) {
        updateRealEstateDatas.rentalDate = args.rentalDate;
    }
    else {
        updateRealEstateDatas.rentalDate = "0";
    }

    if (args.electricity) {
        validationTypes.electricity = {
            isEmptyString: true
        };
        updateRealEstateDatas.electricity = args.electricity;
    }
    else {
        updateRealEstateDatas.electricity = "";
    }

    if (args.water) {
        validationTypes.water = {
            isEmptyString: true,
            isLength: {
                min: 5,
                max: 150
            }
        };
        updateRealEstateDatas.water = args.water;
    }
    else {
        updateRealEstateDatas.water = "";
    }

    if (args.naturalGas) {
        validationTypes.naturalGas = {
            isEmptyString: true,
            isLength: {
                min: 5,
                max: 150
            },

        };
        updateRealEstateDatas.naturalGas = args.naturalGas;
    }
    else {
        updateRealEstateDatas.naturalGas = "";
    }

    if (args.TCIPNo) {
        validationTypes.TCIPNo = {
            isEmptyString: true,
            isLength: {
                min: 3,
                max: 150
            }
        };
        updateRealEstateDatas.TCIPNo = args.TCIPNo;
    }
    else {
        updateRealEstateDatas.TCIPNo = "";
    }

    if (args.ownerNameSurname) {
        validationTypes.ownerNameSurname = {
            isEmptyString: true,
            isLength: {
                min: 3,
                max: 150
            }
        };
        updateRealEstateDatas.ownerNameSurname = args.ownerNameSurname;
    }
    else {
        updateRealEstateDatas.ownerNameSurname = "";
    }

    if (args.ownerManagerPhoneNumber) {
        validationTypes.ownerManagerPhoneNumber = {
            isEmptyString: true,
            isLength: {
                min: 9,
                max: 16
            }
        };
        updateRealEstateDatas.ownerManagerPhoneNumber = args.ownerManagerPhoneNumber;
    }
    else {
        updateRealEstateDatas.ownerManagerPhoneNumber = "";
    }

    if (args.ownerTcIdentity) {
        validationTypes.ownerTcIdentity = {
            isEmptyString: true,
            isLength: {
                min: 10,
                max: 11
            }
        };
        updateRealEstateDatas.ownerTcIdentity = args.ownerTcIdentity;
    }
    else {
        updateRealEstateDatas.ownerTcIdentity = "";
    }

    if (args.ownerIban) {
        validationTypes.ownerIban = {
            isEmptyString: true,
            isLength: {
                min: 25,
                max: 34
            }
        };
        updateRealEstateDatas.ownerIban = args.ownerIban;
    }
    else {
        updateRealEstateDatas.ownerIban = "";
    }

    if (args.detailDues) {
        validationTypes.detailDues = {
            isEmptyString: true,
        };
        updateRealEstateDatas.detailDues = args.detailDues;
    }
    else {
        updateRealEstateDatas.detailDues = "";
    }

    if (args.detailManagerPhoneNumber) {
        validationTypes.detailManagerPhoneNumber = {
            isEmptyString: true,
            isLength: {
                min: 3,
                max: 150
            }
        };
        updateRealEstateDatas.detailManagerPhoneNumber = args.detailManagerPhoneNumber;
    }
    else {
        updateRealEstateDatas.detailManagerPhoneNumber = "";
    }

    if (args.detailAdditionalInformation) {
        validationTypes.detailAdditionalInformation = {
            isEmptyString: true,
            isLength: {
                min: 3,
                max: 720
            }
        };
        updateRealEstateDatas.detailAdditionalInformation = args.detailAdditionalInformation;
    }
    else {
        updateRealEstateDatas.detailAdditionalInformation = "";
    }

    if (args.numberOfRoom) {
        validationTypes.numberOfRoom = {
            isEmptyString: true,
            isLength: {
                min: 3,
                max: 150
            }
        };
        updateRealEstateDatas.numberOfRoom = args.numberOfRoom;
    }
    else {
        updateRealEstateDatas.numberOfRoom = "";
    }

    if (args.purposeOfUsage) {
        validationTypes.purposeOfUsage = {
            isEmptyString: true,
            isLength: {
                min: 2,
                max: 300
            }
        };
        updateRealEstateDatas.purposeOfUsage = args.purposeOfUsage;
    }
    else {
        updateRealEstateDatas.purposeOfUsage = "";
    }

    if (args.detailRent) {
        validationTypes.detailRent = {
            isEmptyString: true,

        };
        updateRealEstateDatas.detailRent = args.detailRent;
    }
    else {
        updateRealEstateDatas.detailRent = "";
    }


    if (args.deposit) {
        updateRealEstateDatas.deposit = args.deposit;
    }
    else {
        updateRealEstateDatas.deposit = "0";
    }

    const validationControlResult = validationControl(args, validationTypes);
    if (!validationControlResult.result) {
        return {
            message: validationControlResult.error,
            code: 400
        };
    }

    const userID = context.userID;
    updateRealEstateDatas.userID = userID;
    updateRealEstateDatas.realEstateID = args.realEstateID;
    updateRealEstateDatas.type = args.type;
    updateRealEstateDatas.title = args.title;
    updateRealEstateDatas.adress = args.adress;
    updateRealEstateDatas.paymentPeriod = args.paymentPeriod;
    updateRealEstateDatas.rentalType = args.rentalType;
    updateRealEstateDatas.registerDate = new Date().toISOString();

    return await updateRealEstateData({ updateRealEstateDatas })
}

const updateRealEstateData = async ({ updateRealEstateDatas }) => {
    try {
        let updateDataFilterType = {};
        if (updateRealEstateDatas.type === "store") {
            updateDataFilterType = {
                userID: updateRealEstateDatas.userID,
                type: updateRealEstateDatas.type,
                usageType: "null",
                title: updateRealEstateDatas.title,
                adress: updateRealEstateDatas.adress,
                fixtureDatas: updateRealEstateDatas.fixtureDatas,
                electricity: updateRealEstateDatas.electricity,
                water: updateRealEstateDatas.water,
                naturalGas: updateRealEstateDatas.naturalGas,
                TCIPNo: updateRealEstateDatas.TCIPNo,
                ownerNameSurname: updateRealEstateDatas.ownerNameSurname,
                ownerManagerPhoneNumber: updateRealEstateDatas.ownerManagerPhoneNumber,
                ownerTcIdentity: updateRealEstateDatas.ownerTcIdentity,
                ownerIban: updateRealEstateDatas.ownerIban,
                detailDues: updateRealEstateDatas.detailDues,
                detailManagerPhoneNumber: updateRealEstateDatas.detailManagerPhoneNumber,
                detailAdditionalInformation: updateRealEstateDatas.detailAdditionalInformation,
                numberOfRoom: "0+0",
                purposeOfUsage: updateRealEstateDatas.purposeOfUsage,
                detailRent: updateRealEstateDatas.detailRent,
                registerDate: updateRealEstateDatas.registerDate,
                paymentPeriod: updateRealEstateDatas.paymentPeriod,
                deposit: updateRealEstateDatas.deposit
            }
        }
        else if (updateRealEstateDatas.type === "apartment") {
            updateDataFilterType = {
                userID: updateRealEstateDatas.userID,
                type: updateRealEstateDatas.type,
                usageType: "null",
                title: updateRealEstateDatas.title,
                adress: updateRealEstateDatas.adress,
                fixtureDatas: updateRealEstateDatas.fixtureDatas,
                electricity: updateRealEstateDatas.electricity,
                water: updateRealEstateDatas.water,
                naturalGas: updateRealEstateDatas.naturalGas,
                TCIPNo: updateRealEstateDatas.TCIPNo,
                ownerNameSurname: updateRealEstateDatas.ownerNameSurname,
                ownerManagerPhoneNumber: updateRealEstateDatas.ownerManagerPhoneNumber,
                ownerTcIdentity: updateRealEstateDatas.ownerTcIdentity,
                ownerIban: updateRealEstateDatas.ownerIban,
                detailDues: updateRealEstateDatas.detailDues,
                detailManagerPhoneNumber: updateRealEstateDatas.detailManagerPhoneNumber,
                detailAdditionalInformation: updateRealEstateDatas.detailAdditionalInformation,
                numberOfRoom: updateRealEstateDatas.numberOfRoom,
                purposeOfUsage: updateRealEstateDatas.purposeOfUsage,
                detailRent: updateRealEstateDatas.detailRent,
                registerDate: updateRealEstateDatas.registerDate,
                paymentPeriod: updateRealEstateDatas.paymentPeriod,
                deposit: updateRealEstateDatas.deposit
            }
        }
        else if (updateRealEstateDatas.type === "other") {
            updateDataFilterType = {
                userID: updateRealEstateDatas.userID,
                type: updateRealEstateDatas.type,
                usageType: updateRealEstateDatas.usageType,
                title: updateRealEstateDatas.title,
                adress: updateRealEstateDatas.adress,
                fixtureDatas: [],
                electricity: "",
                water: "",
                naturalGas: "",
                TCIPNo: "",
                ownerNameSurname: updateRealEstateDatas.ownerNameSurname,
                ownerManagerPhoneNumber: updateRealEstateDatas.ownerManagerPhoneNumber,
                ownerTcIdentity: updateRealEstateDatas.ownerTcIdentity,
                ownerIban: updateRealEstateDatas.ownerIban,
                detailDues: "0",
                detailManagerPhoneNumber: "",
                detailAdditionalInformation: updateRealEstateDatas.detailAdditionalInformation,
                numberOfRoom: "0+0",
                purposeOfUsage: "",
                detailRent: updateRealEstateDatas.detailRent,
                registerDate: updateRealEstateDatas.registerDate,
                paymentPeriod: updateRealEstateDatas.paymentPeriod,
                deposit: updateRealEstateDatas.deposit
            }
        }
        const contractControl = await r.db("hifaKiraTakip").table("contracts").filter({ realEstateID: updateRealEstateDatas.realEstateID, status: "continuation", userID: updateRealEstateDatas.userID }).then((res) => res.length !== 0 ? true : false)

        return await r.db("hifaKiraTakip").table("realEstates").get(updateRealEstateDatas.realEstateID).update(updateDataFilterType).then(async (res) => {
            if (res.replaced && res.replaced !== 0 || res.unchanged && res.unchanged !== 0) {
                if (contractControl === true && updateRealEstateDatas.rentalType === "unattached") {

                    return await r.db("hifaKiraTakip").table("contracts").filter({ realEstateID: updateRealEstateDatas.realEstateID, status: "continuation", userID: updateRealEstateDatas.userID }).update({
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
                                message: "Hata: Emlak bilgileri güncellenememiştir, lütfen daha sonra tekrar deneyiniz.",
                                code: 400
                            }
                        }
                    })

                }
                else {
                    return {
                        message: "Başarı ile bilgiler güncellenmiştir.",
                        code: 200
                    }
                }
            }
            else {
                return {
                    message: "Hata: Emlak bilgileri güncellenememiştir, lütfen daha sonra tekrar deneyiniz.",
                    code: 400
                }
            }

        }).catch((err) => {
            return {
                message: "Hata: " + err,
                code: 400
            }
        })
    } catch (error) {
        return {
            message: "Hata: " + error.message,
            code: error.code
        }
    }

}
export default updateRealEstate;