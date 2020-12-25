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

const signin = async (args) => {
    let filterParams = {};
    let validationTypes = {
        password: {
            isEmptyString: true,
            isMD5: true
        }
    };
    if (args.userName) {
        filterParams = {
            userName: args.userName
        };
        validationTypes["userName"] = {
            isEmptyString: true,
            isLength: {
                min: 3,
                max: 35
            }
        };
    } else {
        return {
            code: 400,
            message: "Lütfen kullanıcı adı ile girişi sağlayınız."
        };
    }

    const validationControlResult = validationControl(args, validationTypes);
    if (!validationControlResult.result) {
        return {
            message: validationControlResult.error,
            code: 400
        };
    }

    const user = await r.db("hifaKiraTakip").table("users").filter(filterParams).run();
    if (user && user.length) {
        const userData = user[0];
        if (userData.password === args.password) {
            let tokenConfigs = {
                data: {
                    userID: userData.id
                }
            };
            if (args.configs) {
                if (args.configs.expireDate) tokenConfigs.exp = args.configs.expireDate;
            }
            const token = jwt.sign(tokenConfigs, TOKEN_SECRET_KEY);
            return await r.db("hifaKiraTakip").table("users").get(userData.id).update({
                token: token
            }).then(() => {
                return {
                    message: "Giriş başarılı.",
                    code: 200,
                    token: token
                };
            });
        } else {
            return {
                code: 500,
                message: "Parola veya kullanıcı adı hatalı."
            };
        }
    } else {
        return {
            code: 500,
            message: "Böyle bir kullanıcı bulunamadı."
        };
    }
}

export default signin;
