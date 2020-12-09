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

const newTenant = async (obj, args, context) => {
    console.log(args)
    let newTenantDatas = {};
    let validationTypes = {
        fullName: {
            isEmptyString: true,
            isLength: {
                min: 4,
                max: 50
            }
        },
        tcIdentity: {
            isEmptyString: true,
            isLength: {
                min: 10,
                max: 11
            }
        },
        phoneNumber1: {
            isEmptyString: true,
            isLength: {
                min: 10,
                max: 16
            },
        }
    };

    if (args.phoneNumber2) {
        validationTypes.phoneNumber2 = {
            isEmptyString: true,
            isLength: {
                min: 10,
                max: 16
            },
        };
        newTenantDatas.phoneNumber2 = args.phoneNumber2;
    }
    else {
        newTenantDatas.phoneNumber2 = "";
    }

    if (args.tenantAdress) {
        validationTypes.tenantAdress = {
            isEmptyString: true,
            isLength: {
                min: 5,
                max: 50
            }
        };
        newTenantDatas.tenantAdress = args.tenantAdress;
    }
    else {
        newTenantDatas.tenantAdress = "";
    }

    if (args.profileImageName) {
        validationTypes.profileImageName = {
            isEmptyString: true
        };
        newTenantDatas.profileImageName = args.profileImageName;
    }
    else {
        newTenantDatas.profileImageName = "";
    }

    if (args.suretyFullName) {
        validationTypes.suretyFullName = {
            isEmptyString: true,
            isLength: {
                min: 5,
                max: 50
            }
        };
        newTenantDatas.suretyFullName = args.suretyFullName;
    }
    else {
        newTenantDatas.suretyFullName = "";
    }

    if (args.suretyTcIdentity) {
        validationTypes.suretyTcIdentity = {
            isEmptyString: true,
            isLength: {
                min: 10,
                max: 11
            }
        };
        newTenantDatas.suretyTcIdentity = args.suretyTcIdentity;
    }
    else {
        newTenantDatas.suretyTcIdentity = "";
    }

    if (args.suretyPhoneNumber) {
        validationTypes.suretyPhoneNumber = {
            isEmptyString: true,
            isLength: {
                min: 10,
                max: 16
            },

        };
        newTenantDatas.suretyPhoneNumber = args.suretyPhoneNumber;
    }
    else {
        newTenantDatas.suretyPhoneNumber = "";
    }

    if (args.suretyAdress) {
        validationTypes.suretyAdress = {
            isEmptyString: true,
            isLength: {
                min: 3,
                max: 50
            }
        };
        newTenantDatas.suretyAdress = args.suretyAdress;
    }
    else {
        newTenantDatas.suretyAdress = "";
    }

    const validationControlResult = validationControl(args, validationTypes);
    if (!validationControlResult.result) {
        return {
            message: validationControlResult.error,
            code: 400
        };
    }

    const userID = context.userID;
    newTenantDatas.userID = userID;
    newTenantDatas.fullName = args.fullName;
    newTenantDatas.tcIdentity = args.tcIdentity;
    newTenantDatas.phoneNumber1 = args.phoneNumber1;
    newTenantDatas.visible = true;
    newTenantDatas.registerDate = new Date().toISOString();

    return await createNewTenant({ newTenantDatas })
}

const createNewTenant = async ({ newTenantDatas }) => {
    try {
        return await r.db("hifaKiraTakip").table("tenants").insert(newTenantDatas).then((res) => {
            if (res.inserted && res.inserted !== 0 && res.generated_keys && res.generated_keys.length !== 0) {
                return {
                    message: "Başarı ile yeni kiracı oluşturulmuştur",
                    code: 200
                }
            }
            else {
                return {
                    message: "Hata: Yeni kiracı oluşturulamamıştır lütfen daha sonra tekrar deneyiniz.",
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
export default newTenant;