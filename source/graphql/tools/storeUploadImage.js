import { createWriteStream, rename } from "fs";
import { uploadFileNameCreator } from "./uploadFileNameCreator";
import { join } from "path";
export const storeUploadImage = (args) => {
    return new Promise(async function (resolve, reject) {
        const { createReadStream, filename } = await args;
        const newFileName = await uploadFileNameCreator(filename);
        console.log(newFileName)
        if (newFileName.status === true) {
            const coolPath = join(__dirname + "../../../uploadedProfileImages/".concat(newFileName.fileName));
            return createReadStream().pipe(createWriteStream(coolPath)).on("finish", () => {
                return resolve({
                    status: true,
                    fileName: newFileName.fileName
                });
            }).on("error", (err) => {
                console.log(err)
                return reject({
                    status: false,
                    fileName: ""
                });
            });
        }
        else {
            resolve({
                status: false,
                fileName: ""
            })
        }
    });
};