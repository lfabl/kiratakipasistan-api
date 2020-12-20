import { r } from "../../db";
import { storeUploadFixtureDatasImage } from "./storeUploadFixtureDatasImage";
import { unlink } from "fs";
import { join, resolve } from "path";
export const fixtureDatasConverter = async (datas, id) => {
    return await new Promise(async (resolve, reject) => {
        const returnData = [];
        for (let index = 0; index < datas.length; index++) {
            const element = datas[index];
            const imageResult = [];
            if (typeof element.images !== "undefined" && element.images.length !== 0) {
                if (element.images.length > 8) {
                    resolve({
                        message: "Demirbaş resimi için maksimum sınıra ulaştığınızdan dolayı ekleme yapılamamaktadır",
                        status: false
                    })
                }
                else {

                    for (let index = 0; index < element.images.length; index++) {
                        const image = element.images[index];
                        if (typeof image["newImage"] !== "undefined") {
                            const uploadResult = await storeUploadFixtureDatasImage(image.newImage.promise);
                            if (uploadResult.status === true) {
                                imageResult.push({
                                    image: uploadResult.fileName
                                })
                            }
                            else {
                                resolve({
                                    status: false,
                                    data: []
                                })
                            }
                        }
                        else {
                            imageResult.push({
                                image: image.image
                            })
                        }

                        if (element.images.length - 1 === index) {
                            returnData.push({
                                name: element.name,
                                images: imageResult
                            })
                        }
                    }
                }

            }
            else {
                returnData.push({
                    name: element.name,
                    image: []
                })
            }

            if (datas.length - 1 === index) {
                const oldImages = await SpecifyingImages(id);
                const newImages = await SpecifyingNewImages(returnData);
                const difference = await oldImages.filter(x => !newImages.includes(x));
                if (difference.length !== 0) {
                    const deleteStatus = await deleteImages(difference);
                }
                resolve({
                    status: true,
                    data: returnData
                })
            }
        }

    })
}


const SpecifyingImages = async (id) => {
    return await new Promise(async (resolve, reject) => {
        const oldDatas = await r.db("hifaKiraTakip").table("realEstates").filter({ id: id, visible: true });
        const oldImages = [];
        if (oldDatas.length !== 0) {
            const oldFixtureDatas = oldDatas[0].fixtureDatas;
            if (oldFixtureDatas.length !== 0) {
                for (let index = 0; index < oldFixtureDatas.length; index++) {
                    const element = oldFixtureDatas[index];
                    if (element.images && element.images.length !== 0) {
                        for (let index = 0; index < element.images.length; index++) {
                            const images = element.images[index];
                            oldImages.push(images.image)
                        }
                    }

                    if (oldFixtureDatas.length - 1 === index) {
                        resolve(oldImages)
                    }
                }
            }
            else {
                resolve([])
            }
        } else {
            resolve([])
        }
    })
}

const SpecifyingNewImages = async (newDatas) => {
    return await new Promise(async (resolve, reject) => {
        const newImages = [];
        if (newDatas.length !== 0) {
            for (let index = 0; index < newDatas.length; index++) {
                const element = newDatas[index];
                if (element.images && element.images.length !== 0) {
                    for (let index = 0; index < element.images.length; index++) {
                        const images = element.images[index];
                        newImages.push(images.image)
                    }
                }

                if (newDatas.length - 1 === index) {
                    resolve(newImages)
                }
            }
        }
        else {
            resolve([])
        }
    })
}

const deleteImages = async (deleteFilest) => {
    return await new Promise(async (resolve, reject) => {
        for (let index = 0; index < deleteFilest.length; index++) {
            const element = deleteFilest[index];
            const datas = deleteImage(element)
            if (deleteFilest.length - 1 === index) {
                resolve(true)
            }
        }
    })
}

const deleteImage = async (fileName) => {
    return await new Promise(async (resolve, reject) => {
        const coolPath = join(__dirname + "../../../uploadedFixtureDatasImages/".concat(fileName));
        if (coolPath !== "") {
            return await unlink(coolPath, (err => {
                if (err) resolve(false);
                else {
                    resolve(true)
                }
            }))
        }
    })
}