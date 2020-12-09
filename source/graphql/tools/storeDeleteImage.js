import { unlink } from "fs";
import { join } from "path";

export const storeDeleteImage = async (fileName) => {
    return await new Promise(async (resolve, reject) => {
        const coolPath = join(__dirname + "../../../uploadedProfileImages/".concat(fileName));
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