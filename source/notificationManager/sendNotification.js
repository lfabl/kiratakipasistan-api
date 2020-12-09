import { sendNotification as sendNativeNotification } from './index';
import { types } from './notificationTypes';
const controlMechine = {
    test: {
        redirect: true
    }
};
const settingsControl = async ({ action, users }) => {
    if(controlMechine[action].redirect) {
        return users;
    } else {
        // Bu kısımda notification kısıtları uygulanıp yeni users değişkeni oluşturulup dönülecek.
    }
}
const sendNotification = async ({ userID, objectID, action, users, title, message }) => {
    let userIDs = await settingsControl({
        userID,
        action,
        users
    });
    const data = await types[action]({
        action,
        userID,
        objectID,
        title,
        message
    });
    userIDs.forEach(item => {
        console.log(item, data);
        sendNativeNotification(
            [item],
            {
                "tr": data.title,
                "en": data.title
            },
            {
                "tr": data.message,
                "en": data.message
            },
            data
        );
    });
};
export default sendNotification;