export const uploadFileTypeValidation = async (type) => {
    const imageTypes = [".png", ".jpg", ".jpeg"];
    return await validationFor(type, imageTypes);
}

const validationFor = (type, validType) => {
    return new Promise((resolve, reject) => {
        for (let index = 0; index < validType.length; index++) {
            const element = validType[index];
            if (element === type.toLowerCase()) {
                resolve(true)
            }
            else if (index + 1 === validType.length) {
                resolve(false)
            }
        }
    })
}