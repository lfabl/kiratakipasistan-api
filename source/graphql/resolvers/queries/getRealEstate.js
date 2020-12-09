import { r } from '../../../db';
import { readFileSync } from "fs";
import { join } from "path";
import sendNotification from '../../../notificationManager/sendNotification';

const getRealEstate = async (obj, args, context) => {
    try {
        sendNotification({
            action: "test",
            message: "Merhaba deneme mesajı tamamdır.",
            objectID: args.realEstateID,
            title: "Bu da başlıktır.",
            userID: context.userID,
            users: ["585d7840-49cb-4036-b36d-8bc537adfebf"]
        });
        const realEstateID = args.realEstateID;
        return await r.db("hifaKiraTakip").table("realEstates").filter({
            id: realEstateID,
            visible: true
        }).merge(function (realEstate) {
            return {
                rentalType: r.db("hifaKiraTakip").table("contracts")
                    .filter({
                        realEstateID: realEstate("id"),
                        status: "continuation"
                    })
                    .coerceTo("array").pluck("status")
            }
        }).then(async (res) => {
            const newRes = await resConverter(res);
            return {
                data: newRes,
                response: {
                    message: "Success",
                    code: 200
                }
            }
        }).catch((err) => {
            return {
                data: [],
                response: {
                    message: "Failed: " + err,
                    code: 400
                }
            }
        })
    } catch (error) {
        return {
            data: [],
            response: {
                message: "Failed: " + error.message,
                code: error.code
            }
        }
    }
}

const resConverter = async (args) => {
    return await new Promise(async (resolve, reject) => {
        if (args.length !== 0) {
            let newRest = args[0];
            if (typeof newRest.fixtureDatas !== "undefined" && newRest.fixtureDatas.length !== 0) {
                const newFixtureDatas = [];
                for (let index = 0; index < newRest.fixtureDatas.length; index++) {
                    const element = newRest.fixtureDatas[index];
                    if (typeof element.images !== "undefined" && element.images.length !== 0) {
                        const newFixtureDatasImages = [];
                        for (let index = 0; index < element.images.length; index++) {
                            const fixTureDatas = element.images[index];
                            let imageResult = "";
                            if (typeof fixTureDatas.image !== "undefined") {
                                imageResult = await readFileSync(join(__dirname + "../../../../uploadedFixtureDatasImages/" + fixTureDatas.image), { encoding: "base64" }, (err, data) => {
                                    if (err) {
                                        return "";
                                    }
                                    else {
                                        return data
                                    }
                                })
                            }
                            newFixtureDatasImages.push({
                                image: fixTureDatas.image,
                                imageBase64: imageResult
                            })
                            if (element.images.length - 1 === index) {
                                newFixtureDatas.push({
                                    name: element.name,
                                    images: newFixtureDatasImages
                                })
                            }
                        }
                    }
                    else {
                        newFixtureDatas.push({
                            name: element.name,
                            images: []
                        })
                    }
                    if (newRest.fixtureDatas.length - 1 === index) {
                        newRest.fixtureDatas = await newFixtureDatas;
                        resolve(newRest)
                    }
                }
            }
            else {
                resolve(newRest)
            }
        }
    })
}
export default getRealEstate;
