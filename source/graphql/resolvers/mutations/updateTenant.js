import { r } from '../../../db';
import validate from "type-valid";
import { storeUploadImage } from "../../tools/storeUploadImage";
import { storeDeleteImage } from "../../tools/storeDeleteImage";
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
    let updateTenantDatas = {};
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
        updateTenantDatas.phoneNumber2 = args.phoneNumber2;
    }
    else {
        updateTenantDatas.phoneNumber2 = "";
    }

    if (args.tenantAdress) {
        validationTypes.tenantAdress = {
            isEmptyString: true,
            isLength: {
                min: 5,
                max: 50
            }
        };
        updateTenantDatas.tenantAdress = args.tenantAdress;
    }
    else {
        updateTenantDatas.tenantAdress = "";
    }

    if (args.profileImageName) {
        validationTypes.profileImageName = {
            isEmptyString: true
        };
        updateTenantDatas.profileImageName = args.profileImageName;
    }
    else {
        updateTenantDatas.profileImageName = "";
    }

    if (args.suretyFullName) {
        validationTypes.suretyFullName = {
            isEmptyString: true,
            isLength: {
                min: 5,
                max: 50
            }
        };
        updateTenantDatas.suretyFullName = args.suretyFullName;
    }
    else {
        updateTenantDatas.suretyFullName = "";
    }

    if (args.suretyTcIdentity) {
        validationTypes.suretyTcIdentity = {
            isEmptyString: true,
            isLength: {
                min: 10,
                max: 11
            }
        };
        updateTenantDatas.suretyTcIdentity = args.suretyTcIdentity;
    }
    else {
        updateTenantDatas.suretyTcIdentity = "";
    }

    if (args.suretyPhoneNumber) {
        validationTypes.suretyPhoneNumber = {
            isEmptyString: true,
            isLength: {
                min: 10,
                max: 16
            },

        };
        updateTenantDatas.suretyPhoneNumber = args.suretyPhoneNumber;
    }
    else {
        updateTenantDatas.suretyPhoneNumber = "";
    }

    if (args.suretyAdress) {
        validationTypes.suretyAdress = {
            isEmptyString: true,
            isLength: {
                min: 3,
                max: 50
            }
        };
        updateTenantDatas.suretyAdress = args.suretyAdress;
    }
    else {
        updateTenantDatas.suretyAdress = "";
    }

    const validationControlResult = validationControl(args, validationTypes);
    if (!validationControlResult.result) {
        return {
            message: validationControlResult.error,
            code: 400
        };
    }
    updateTenantDatas.userID = context.userID;
    updateTenantDatas.fullName = args.fullName;
    updateTenantDatas.tcIdentity = args.tcIdentity;
    updateTenantDatas.phoneNumber1 = args.phoneNumber1;

    if (typeof args.profileImage !== "undefined") {
        const uploadResult = await storeUploadImage(args.profileImage.promise);
        if (uploadResult.status === true) {
            if (updateTenantDatas.profileImageName !== "") {
                await storeDeleteImage(updateTenantDatas.profileImageName);
            }
            updateTenantDatas.profileImageName = uploadResult.fileName;
        }
        else {
            console.log("buraya girdi")
            return {
                message: "Güncelleme işlemi yapılamamıştır. Lütfen daha sonra tekrar deneyin",
                code: 400
            }
        }
    }
    else if (typeof args.deleteProfileImage !== "undefined" && args.deleteProfileImage === true) {
        await storeDeleteImage(updateTenantDatas.profileImageName);
        updateTenantDatas.profileImageName = "";
    }
    
    const id = args.tenantID;
    return await updateExistTenant({ updateTenantDatas, id })
}

const updateExistTenant = async ({ updateTenantDatas, id }) => {
    try {
        return await r.db("hifaKiraTakip").table("tenants").get(id).update(updateTenantDatas).then((res) => {
            if (res.replaced !== 0 || res.unchanged !== 0) {
                return {
                    message: "Kiracı bilgileri başarı ile güncellenmiştir",
                    code: 200
                }
            }
            else {
                return {
                    message: "Hata: kiracı güncellenememiştir. Lütfen daha sonra tekrar deneyiniz.",
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