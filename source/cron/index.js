import {
    r
} from '../db';
import moment from 'moment';
import cron from 'cron';
import {
    asyncForEach
} from '../tools';
import sendNotification from '../notificationManager/sendNotification';
import rrule, { RRule } from 'rrule';

const PAYMENT_PERIODS = {
    "monthly": "months",
    "yearly": "years"
};

const notificationContractJob = async () => {
    const continueContracts = await r
        .db("hifaKiraTakip")
        .table('contracts')
        .filter(
            r.row("status").eq("continuation")
                .and(
                    r.not(r.row.hasFields("wasReminded"))
                )
        )
        .run();
    await asyncForEach(continueContracts, async contract => {
        const now = new Date();
        const period = new Date(contract.contractDate);
        const lastDay = new Date(moment(period).add(contract.contractPeriod == "0" ? "1" : contract.contractPeriod, "years"));
        if (lastDay - now > 0) {
            const oneMonthAgo = new Date(moment(lastDay).subtract("1", "months"));
            if (moment(oneMonthAgo).format("DD/MM/YYYY") === moment(now).format("DD/MM/YYYY")) {
                const realEstateData = await r
                    .db("hifaKiraTakip")
                    .table("realEstates")
                    .get(contract.realEstateID)
                    .run();
                sendNotification({
                    action: "endContract",
                    message: `"${realEstateData.title}" adlı emlağınızın kontrat sonuna 1 ay kaldı.`,
                    objectID: contract.realEstateID,
                    title: "Sözleşme Sonuna 1 Ay.",
                    userID: realEstateData.userID,
                    users: [realEstateData.userID],
                    datas: {
                        pageName: "RealEstateInformation",
                        pageID: contract.realEstateID
                    }
                });
                await r
                    .db("hifaKiraTakip")
                    .table("contracts")
                    .get(contract.id)
                    .update({
                        wasReminded: true
                    })
                    .run();
            }
        }
    });
};

const notificationPayJob = async () => {
    const continueContracts = await r
        .db("hifaKiraTakip")
        .table('contracts')
        .filter(
            r.row("status").eq("continuation")
        )
        .run();
    await asyncForEach(continueContracts, async contract => {
        const now = new Date();
        const period = new Date(contract.paymentPeriod.date);
        const lastDay = new Date(moment(period).add(contract.contractPeriod == "0" ? "1" : contract.contractPeriod, PAYMENT_PERIODS[contract.paymentPeriod.type]));
        if (lastDay - now > 0) {
            const rule = new RRule({
                freq: contract.paymentPeriod.type === "monthly" ? RRule.MONTHLY : RRule.YEARLY,
                dtstart: period,
                until: lastDay,
                wkst: RRule.MO,
                interval: 1
            });
            const rruleExists = rule.all().findIndex(rr => {
                const dateRR = moment(new Date(rr)).format("DD/MM/YYYY");
                const controlFormat = moment(new Date(moment(now).subtract("3", "days"))).format("DD/MM/YYYY");
                return controlFormat === dateRR;
            });
            if (rruleExists !== -1) {
                const realEstateData = await r
                    .db("hifaKiraTakip")
                    .table("realEstates")
                    .get(contract.realEstateID)
                    .run();
                sendNotification({
                    action: "endContract",
                    message: `"${realEstateData.title}" adlı emlağınızın kontrat sonuna 1 ay kaldı.`,
                    objectID: contract.realEstateID,
                    title: "Sözleşme Sonuna 1 Ay.",
                    userID: realEstateData.userID,
                    users: [realEstateData.userID],
                    datas: {
                        pageName: "RealEstateInformation",
                        pageID: contract.realEstateID
                    }
                });
            }
        }
    });
};

const notificationContractJob1 = new cron.CronJob('0 8 * * *', notificationContractJob, null, true, 'Europe/Istanbul');
const notificationContractJob2 = new cron.CronJob('0 20 * * *', notificationContractJob, null, true, 'Europe/Istanbul');
const notificationPayJob1 = new cron.CronJob('0 12 * * *', notificationPayJob, null, true, 'Europe/Istanbul');

notificationContractJob1.start();
notificationContractJob2.start();
notificationPayJob1.start();