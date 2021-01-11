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
const settingsControl = async ({
    objectID,
    action,
    users
}) => {
    if(controlMechine[action].redirect) {
        return users;
    } else {
        await asyncForEach(users, async user => {
            const objectData = await r
                .db("hifaKiraTakip")
                .table("realEstates")
                .get(objectID)
            .run();
            if(objectData.openNotifications) {
                return [user];
            } else {
                return [];
            }
        });
    }
}
const sendNotification = async ({
    objectID,
    message,
    userID,
    action,
    users,
    title
}) => {
    let userIDs = await settingsControl({
        objectID,
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