import { r } from "../db";
import { asyncForEach } from '../tools';
import { sendNotification as sendNativeNotification } from './index';
import { types } from './notificationTypes';
const controlMechine = {
    endContract: {
        redirect: false
    },
    upcomingPayment: {
        redirect: false
    }
};
const sendNotification = async ({
    objectID,
    message,
    userID,
    action,
    users,
    title,
    datas
}) => {
    const data = await types[action]({
        action,
        userID,
        objectID,
        title,
        message,
    });
    const newData = { ...data, ...datas };
    users.forEach(item => {
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
            newData
        );
    });
};
export default sendNotification;