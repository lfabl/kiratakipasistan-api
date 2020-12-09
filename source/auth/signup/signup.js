import { r } from '../../db';
import { TOKEN_SECRET_KEY } from '../../constants';
import jwt from 'jsonwebtoken';
import validate from 'type-valid';

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
const signup = async (args) => {
    let validationTypes = {
        userName: {
            isEmptyString: true,
            isLength: {
                min: 3,
                max: 35
            }
        },
        mail: {
            isEmptyString: true,
            isMail: true,
            isLength: {
                min: 5,
                max: 80
            }
        },
        password: {
            isEmptyString: true,
            isMD5: true,
            isLength: {
                min: 5,
                max: 80
            }
        },
        fullName: {
            isEmptyString: true,
            isLength: {
                min: 4,
                max: 45
            }
        }
    };
    const validationControlResult = validationControl(args, validationTypes);
    if (!validationControlResult.result) {
        return {
            message: validationControlResult.error,
            code: 400
        };
    }
    const user = await r.db("hifaKiraTakip").table("users").filter({
        userName: args.userName
    }).run();
    const mail = await r.db("hifaKiraTakip").table("users").filter({
        mail: args.mail
    }).run();
    if (user && user.length) {
        return {
            message: "Kullanıcı adı mevcut",
            code: 409
        };
    } else if (mail && mail.length) {
        return {
            message: "Mail adresi mevcut",
            code: 409
        };
    } else {
        return await addUser({ args });
    }

}

const addUser = async ({ args }) => {
    const newUserData = {
        userName: args.userName,
        password: args.password,
        fullName: args.fullName,
        mail: args.mail,
        profileImageName: "",
        registerDate: new Date().toISOString(),
    };
    return await r.db("hifaKiraTakip").table("users").insert(newUserData, { returnChanges: true }).then(async (userData) => {
        const createdData = userData.changes[0].new_val;
        console.log(createdData);
        let tokenConfigs = {
            data: {
                userID: createdData.id
            }
        };
        if (args.configs) {
            if (args.configs.expireDate) tokenConfigs.exp = args.configs.expireDate;
        }
        const token = jwt.sign(tokenConfigs, TOKEN_SECRET_KEY);
        return await r.db("hifaKiraTakip").table("users").get(createdData.id).update({
            token: token
        }, { returnChanges: true }).then(() => {
            return {
                message: "Kayıt başarılı.",
                code: 200,
                token: token
            };
        });
    }).catch((e) => {
        return {
            message: e,
            code: 500
        };
    });
}
export default signup;
