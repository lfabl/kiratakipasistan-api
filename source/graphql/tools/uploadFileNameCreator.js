import { r } from "../../db";
import { uploadFileTypeValidation } from "./uploadFileTypeValidation";

export const uploadFileNameCreator = async (filename) => {
    const uuidFileName = await r.uuid();
    const index = filename.indexOf(".");
    const length = filename.length;
    const type = filename.slice(index, length);
    const typeValid = await uploadFileTypeValidation(type);
    if (typeValid === true) {
        const newFileName = uuidFileName + type;
        return {
            fileName: newFileName,
            status: true
        }
    }
    else {
        return {
            fileName: "",
            status: false
        }
    }
}