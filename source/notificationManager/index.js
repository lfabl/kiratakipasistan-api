import OneSignal from 'onesignal-node';
export let myClient = new OneSignal.Client({});
myClient.userAuthKey = "N2UzNmE5YzItZTBiZi00NDE1LTlkOTktNWUzNGY3ZDk3NzUy";
myClient.setApp({
    appAuthKey: "YWVhNTk3MDAtYjRjZi00ZTJlLTkzZDUtZDc2MTEzNDI4NTNm",
    appId: "1d31bfb2-0b68-4283-90bc-8892ce855405"
});
let notification = new OneSignal.Notification({});
export const sendNotification = (users, headings, contents, data, include_player_ids, included_segments) => {
    notification.postBody["headings"] = headings;
    notification.postBody["contents"] = contents;
    notification.postBody["ios_badgeType"] = "SetTo";
    if(data) notification.postBody["data"] = data;
    if(include_player_ids) notification.postBody["include_player_ids"] = include_player_ids;
    if(included_segments) notification.postBody["included_segments"] = included_segments;
    notification.postBody["ios_badgeCount"] = 0;
    users.forEach(async item => {
        notification.postBody["filters"] = [{
            "field": "tag",
            "key": "user_id",
            "relation": "=",
            "value": item
        }];
        myClient.sendNotification(notification, function (err, httpResponse, data) {
            if (err) {
                console.log('Something went wrong...');
            } else {
                console.log(httpResponse.body);
            }
        });
    });
}