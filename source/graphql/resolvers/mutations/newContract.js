import { r } from '../../../db';
import validate from "type-valid";

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

const newContract = async (obj, args, context) => {
    let newContractDatas = {};
    let validationTypes = {
        tenantID: {
            isEmptyString: true,
            isUUID: true
        },
        realEstateID: {
            isEmptyString: true,
            isUUID: true
        },
        rentalDate: {
            isEmptyString: true,
            isLength: {
                min: 1,
                max: 100
            },
        },
        paymentType: {
            isEmptyString: true,
            isLength: {
                min: 1,
                max: 100
            },
        },

    };

    const validationControlResult = validationControl(args, validationTypes);
    if (!validationControlResult.result) {
        return {
            message: validationControlResult.error,
            code: 400
        };
    }
    const contractPeriodValidResult = await validCustomProps(args.contractPeriod, "contractTypeValid");
    const paymentTypeValidResult = await validCustomProps(args.paymentType, "paymentTypeValid");
    const paymentPeriodValidResult = await validCustomProps(args.paymentPeriod.type, "paymentPeriodValid");
    if (paymentTypeValidResult === false || paymentPeriodValidResult === false || contractPeriodValidResult === false) {
        return {
            message: contractPeriodValidResult.message ? contractPeriodValidResult.message : paymentTypeValidResult.message ? paymentTypeValidResult.message : paymentPeriodValidResult.message,
            code: 400
        }
    }
    else {
        let _rentalDate = args.rentalDate;
        if(args.rentalDate.indexOf("-") !== -1) {
            const splitDate = args.rentalDate.split("-");
            let newDate = new Date();
            newDate.setFullYear(splitDate[0], splitDate[1] - 1, splitDate[2]);
            newDate = new Date(newDate);
            newDate.setHours(12, 0, 0);
            _rentalDate = new Date(newDate);
        } else {
            _rentalDate = new Date(args.rentalDate);
        }
        const userID = context.userID;
        newContractDatas.userID = userID;
        newContractDatas.tenantID = args.tenantID;
        newContractDatas.realEstateID = args.realEstateID;
        newContractDatas.contractDate = new Date().toISOString();
        newContractDatas.rentalDate = _rentalDate.toISOString();
        newContractDatas.contractPeriod = args.contractPeriod;
        newContractDatas.rentalPrice = args.rentalPrice;
        newContractDatas.paymentType = args.paymentType;
        newContractDatas.paymentPeriod = args.paymentPeriod;
        newContractDatas.status = "continuation";

        return await createNewContract({ newContractDatas })
    }
}

const createNewContract = async ({ newContractDatas }) => {
    try {
        return await r.db("hifaKiraTakip").table("contracts").filter({ tenantID: newContractDatas.tenantID, status: "continuation" }).then(async (tenantResult) => {
            if (tenantResult && tenantResult.length !== 0) {
                return {
                    message: "Bu kiracıya ait bir sözleşme bulunmaktadır lütfen farklı bir kiracı deneyiniz.",
                    code: 400
                }
            }
            else {
                return await r.db("hifaKiraTakip").table("contracts").filter({ realEstateID: newContractDatas.realEstateID, status: "continuation" }).then(async (realEstateResult) => {
                    if (realEstateResult && realEstateResult.length !== 0) {
                        return {
                            message: "Bu emlağa ait bir sözleşme bulunmaktadır lütfen farklı bir emlak deneyiniz.",
                            code: 400
                        }
                    }
                    else {
                        return await r.db("hifaKiraTakip").table("contracts").insert(newContractDatas).then((res) => {
                            if (res.inserted && res.inserted !== 0 && res.generated_keys && res.generated_keys.length !== 0) {
                                return {
                                    message: "Başarı ile yeni sözleşme oluşturulmuştur",
                                    code: 200
                                }
                            }
                            else {
                                return {
                                    message: "Hata: Yeni sözleşme oluşturulamamıştır lütfen daha sonra tekrar deneyiniz.",
                                    code: 400
                                }
                            }

                        }).catch((err) => {
                            return {
                                message: "Hata: " + err,
                                code: 400
                            }
                        })
                    }
                }).catch((realEstateError) => {
                    return {
                        message: "Hata : " + realEstateError,
                        code: 400
                    }
                })
            }
        }).catch((tenantError) => {
            return {
                message: "Hata : " + tenantError,
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

const validCustomProps = async (args, type) => {
    const contractTypeValid = ["0", "1", "2", "3", "4", "5"];
    const paymentTypeValid = ["cash", "transfer", "installment"];
    const paymentPeriodValid = ["monthly", "yearly"];
    return await new Promise((resolve, reject) => {
        let validType = []
        if (type === "paymentTypeValid") {
            validType = paymentTypeValid;
        }
        else if (type === "paymentPeriodValid") {
            validType = paymentPeriodValid;
        }
        else if (type === "contractTypeValid") {
            validType = contractTypeValid;
        }
        for (let index = 0; index < validType.length; index++) {
            const element = validType[index];
            if (args === element) {
                resolve({
                    status: true
                })
            }
            if (index === validType.length - 1) {
                reject({
                    status: false,
                    message: type === "paymentTypeValid" ? "Ödeme şekli parametresi bulunamamıştır (Örn: cash , transfer, installment)" :
                        type === "paymentTypeValid" ? "Sözleşme süresi parametresi bulunamamıştır (Örn: 0,1,2,3,4,5)" :
                            "Ödeme periyodu parametresi bulunamamıştır (Örn: monthly , yearly)"
                })
            }
        }
    })
}

export default newContract;