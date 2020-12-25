import { createWriteStream } from "fs";
import { uploadFileNameCreator } from "./uploadFileNameCreator";
import { join } from "path";

export const storeUploadFixtureDatasImage = async (args) => {
    return await new Promise(async function (resolve, reject) {
        
        const { createReadStream, filename } = await args;
        const newFileName = await uploadFileNameCreator(filename);
        if (newFileName.status === true) {
            const coolPath = join(__dirname + "../../../uploadedFixtureDatasImages/".concat(newFileName.fileName));
            return createReadStream().pipe(createWriteStream(coolPath)).on("finish", () => {
                return resolve({
                    status: true,
                    fileName: newFileName.fileName
                });
            }).on("error", (err) => {
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
