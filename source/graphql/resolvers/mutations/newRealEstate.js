import { r } from '../../../db';
import validate from "type-valid";
import { fixtureDatasConverter } from '../../tools/fixtureDatasConverter';

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

const newRealEstate = async (obj, args, context) => {
    let newRealEstateDatas = {};
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
        newRealEstateDatas.usageType = args.usageType;
    }
    else {
        newRealEstateDatas.usageType = "null";
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
                const fixtureResult = await fixtureDatasConverter(args.fixtureDatas);
                if (fixtureResult.status === true) {
                    newRealEstateDatas.fixtureDatas = fixtureResult.data
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
                            message: "Demirbaşlar eklenirken bir hata oluşmuştur. Lütfen tekrar deneyin",
                            code: 400
                        }
                    }
                }
            }
        }
        else {
            newRealEstateDatas.fixtureDatas = [];
        }
    }
    else {
        newRealEstateDatas.fixtureDatas = [];
    }


    if (args.rentalDate) {
        newRealEstateDatas.rentalDate = args.rentalDate;
    }
    else {
        newRealEstateDatas.rentalDate = "0";
    }

    if (args.electricity) {
        validationTypes.electricity = {
            isEmptyString: true
        };
        newRealEstateDatas.electricity = args.electricity;
    }
    else {
        newRealEstateDatas.electricity = "";
    }

    if (args.water) {
        validationTypes.water = {
            isEmptyString: true,
            isLength: {
                min: 5,
                max: 150
            }
        };
        newRealEstateDatas.water = args.water;
    }
    else {
        newRealEstateDatas.water = "";
    }

    if (args.naturalGas) {
        validationTypes.naturalGas = {
            isEmptyString: true,
            isLength: {
                min: 5,
                max: 150
            },

        };
        newRealEstateDatas.naturalGas = args.naturalGas;
    }
    else {
        newRealEstateDatas.naturalGas = "";
    }

    if (args.TCIPNo) {
        validationTypes.TCIPNo = {
            isEmptyString: true,
            isLength: {
                min: 3,
                max: 150
            }
        };
        newRealEstateDatas.TCIPNo = args.TCIPNo;
    }
    else {
        newRealEstateDatas.TCIPNo = "";
    }

    if (args.ownerNameSurname) {
        validationTypes.ownerNameSurname = {
            isEmptyString: true,
            isLength: {
                min: 3,
                max: 150
            }
        };
        newRealEstateDatas.ownerNameSurname = args.ownerNameSurname;
    }
    else {
        newRealEstateDatas.ownerNameSurname = "";
    }

    if (args.ownerManagerPhoneNumber) {
        validationTypes.ownerManagerPhoneNumber = {
            isEmptyString: true,
            isLength: {
                min: 9,
                max: 16
            }
        };
        newRealEstateDatas.ownerManagerPhoneNumber = args.ownerManagerPhoneNumber;
    }
    else {
        newRealEstateDatas.ownerManagerPhoneNumber = "";
    }

    if (args.ownerTcIdentity) {
        validationTypes.ownerTcIdentity = {
            isEmptyString: true,
            isLength: {
                min: 9,
                max: 12
            }
        };
        newRealEstateDatas.ownerTcIdentity = args.ownerTcIdentity;
    }
    else {
        newRealEstateDatas.ownerTcIdentity = "";
    }

    if (args.ownerIban) {
        validationTypes.ownerIban = {
            isEmptyString: true,
            isLength: {
                min: 25,
                max: 34
            }
        };
        newRealEstateDatas.ownerIban = args.ownerIban;
    }
    else {
        newRealEstateDatas.ownerIban = "";
    }

    if (args.detailDues) {
        validationTypes.detailDues = {
            isEmptyString: true,
        };
        newRealEstateDatas.detailDues = args.detailDues;
    }
    else {
        newRealEstateDatas.detailDues = "";
    }

    if (args.detailManagerPhoneNumber) {
        validationTypes.detailManagerPhoneNumber = {
            isEmptyString: true,
            isLength: {
                min: 9,
                max: 16
            }
        };
        newRealEstateDatas.detailManagerPhoneNumber = args.detailManagerPhoneNumber;
    }
    else {
        newRealEstateDatas.detailManagerPhoneNumber = "";
    }

    if (args.detailAdditionalInformation) {
        validationTypes.detailAdditionalInformation = {
            isEmptyString: true,
            isLength: {
                min: 3,
                max: 720
            }
        };
        newRealEstateDatas.detailAdditionalInformation = args.detailAdditionalInformation;
    }
    else {
        newRealEstateDatas.detailAdditionalInformation = "";
    }

    if (args.numberOfRoom) {
        validationTypes.numberOfRoom = {
            isEmptyString: true,
            isLength: {
                min: 3,
                max: 150
            }
        };
        newRealEstateDatas.numberOfRoom = args.numberOfRoom;
    }
    else {
        newRealEstateDatas.numberOfRoom = "0+0";
    }

    if (args.purposeOfUsage) {
        validationTypes.purposeOfUsage = {
            isEmptyString: true,
            isLength: {
                min: 2,
                max: 300
            }
        };
        newRealEstateDatas.purposeOfUsage = args.purposeOfUsage;
    }
    else {
        newRealEstateDatas.purposeOfUsage = "";
    }

    if (args.detailRent) {
        validationTypes.detailRent = {
            isEmptyString: true,

        };
        newRealEstateDatas.detailRent = args.detailRent;
    }
    else {
        newRealEstateDatas.detailRent = "";
    }

    if (args.deposit) {
        newRealEstateDatas.deposit = args.deposit;
    }
    else {
        newRealEstateDatas.deposit = "0";
    }

    const validationControlResult = validationControl(args, validationTypes);
    if (!validationControlResult.result) {
        return {
            message: validationControlResult.error,
            code: 400
        };
    }

    const userID = context.userID;
    newRealEstateDatas.userID = userID;
    newRealEstateDatas.type = args.type;
    newRealEstateDatas.title = args.title;
    newRealEstateDatas.adress = args.adress;
    newRealEstateDatas.visible = true;
    newRealEstateDatas.paymentPeriod = args.paymentPeriod;
    newRealEstateDatas.registerDate = new Date().toISOString();

    return await createNewRealEstate({ newRealEstateDatas })
}

const createNewRealEstate = async ({ newRealEstateDatas }) => {
    try {
        let insertRealEstateDatas = {};
        if (newRealEstateDatas.type === "store") {
            insertRealEstateDatas = {
                userID: newRealEstateDatas.userID,
                type: newRealEstateDatas.type,
                usageType: "null",
                title: newRealEstateDatas.title,
                adress: newRealEstateDatas.adress,
                fixtureDatas: newRealEstateDatas.fixtureDatas,
                electricity: newRealEstateDatas.electricity,
                water: newRealEstateDatas.water,
                naturalGas: newRealEstateDatas.naturalGas,
                TCIPNo: newRealEstateDatas.TCIPNo,
                ownerNameSurname: newRealEstateDatas.ownerNameSurname,
                ownerManagerPhoneNumber: newRealEstateDatas.ownerManagerPhoneNumber,
                ownerTcIdentity: newRealEstateDatas.ownerTcIdentity,
                ownerIban: newRealEstateDatas.ownerIban,
                detailDues: newRealEstateDatas.detailDues,
                detailManagerPhoneNumber: newRealEstateDatas.detailManagerPhoneNumber,
                detailAdditionalInformation: newRealEstateDatas.detailAdditionalInformation,
                numberOfRoom: "0+0",
                purposeOfUsage: newRealEstateDatas.purposeOfUsage,
                detailRent: newRealEstateDatas.detailRent,
                registerDate: newRealEstateDatas.registerDate,
                paymentPeriod: newRealEstateDatas.paymentPeriod,
                deposit: newRealEstateDatas.deposit,
                visible: true

            }
        }
        else if (newRealEstateDatas.type === "apartment") {
            insertRealEstateDatas = {
                userID: newRealEstateDatas.userID,
                type: newRealEstateDatas.type,
                usageType: "null",
                title: newRealEstateDatas.title,
                adress: newRealEstateDatas.adress,
                fixtureDatas: newRealEstateDatas.fixtureDatas,
                electricity: newRealEstateDatas.electricity,
                water: newRealEstateDatas.water,
                naturalGas: newRealEstateDatas.naturalGas,
                TCIPNo: newRealEstateDatas.TCIPNo,
                ownerNameSurname: newRealEstateDatas.ownerNameSurname,
                ownerManagerPhoneNumber: newRealEstateDatas.ownerManagerPhoneNumber,
                ownerTcIdentity: newRealEstateDatas.ownerTcIdentity,
                ownerIban: newRealEstateDatas.ownerIban,
                detailDues: newRealEstateDatas.detailDues,
                detailManagerPhoneNumber: newRealEstateDatas.detailManagerPhoneNumber,
                detailAdditionalInformation: newRealEstateDatas.detailAdditionalInformation,
                numberOfRoom: newRealEstateDatas.numberOfRoom,
                purposeOfUsage: newRealEstateDatas.purposeOfUsage,
                detailRent: newRealEstateDatas.detailRent,
                registerDate: newRealEstateDatas.registerDate,
                paymentPeriod: newRealEstateDatas.paymentPeriod,
                deposit: newRealEstateDatas.deposit,
                visible: true

            }
        }
        else if (newRealEstateDatas.type === "other") {
            insertRealEstateDatas = {
                userID: newRealEstateDatas.userID,
                type: newRealEstateDatas.type,
                usageType: newRealEstateDatas.usageType,
                title: newRealEstateDatas.title,
                adress: newRealEstateDatas.adress,
                fixtureDatas: [],
                electricity: "",
                water: "",
                naturalGas: "",
                TCIPNo: "",
                ownerNameSurname: newRealEstateDatas.ownerNameSurname,
                ownerManagerPhoneNumber: newRealEstateDatas.ownerManagerPhoneNumber,
                ownerTcIdentity: newRealEstateDatas.ownerTcIdentity,
                ownerIban: newRealEstateDatas.ownerIban,
                detailDues: "0",
                detailManagerPhoneNumber: "",
                detailAdditionalInformation: newRealEstateDatas.detailAdditionalInformation,
                numberOfRoom: "0+0",
                purposeOfUsage: "",
                detailRent: newRealEstateDatas.detailRent,
                registerDate: newRealEstateDatas.registerDate,
                paymentPeriod: newRealEstateDatas.paymentPeriod,
                deposit: newRealEstateDatas.deposit,
                visible: true
            }
        }
        return await r.db("hifaKiraTakip").table("realEstates").insert(insertRealEstateDatas).then((res) => {
            if (res.inserted && res.inserted !== 0 && res.generated_keys && res.generated_keys.length !== 0) {
                return {
                    message: "Başarı ile yeni emlak oluşturulmuştur",
                    code: 200
                }
            }
            else {
                return {
                    message: "Hata: Yeni emlak oluşturulamamıştır lütfen daha sonra tekrar deneyiniz.",
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
export default newRealEstate;