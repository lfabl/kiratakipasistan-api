import {
    r
} from '../../../db';
import moment from 'moment';
import RRule from 'rrule';
import {
    asyncForEach
} from '../../../tools';
const Home = async (parent, args, context) => {
    const requestorID = context.userID;
    const contracts = await r
        .db("hifaKiraTakip")
        .table("contracts")
        .filter({
            "userID": requestorID
        })
    .run();
    let pastEstateData = [];
    let approaching = [];
    await asyncForEach(contracts, async contract => {
        let nextMinute = moment(new Date(contract.contractDate)).add(1, "minutes");
        nextMinute = new Date(nextMinute);
        const newRRule = new RRule({
            freq: RRule.YEARLY,
            dtstart: nextMinute,
            count: 2,
            interval: parseInt(contract.contractPeriod)
        });
        const allDates = newRRule.all();
        if(allDates.length) {
            const dateRange = Math.floor((new Date() - new Date(allDates[1])) / (1000 * 3600 * 24));
            const estate = await r
                .db("hifaKiraTakip")
                .table("realEstates")
                .get(contract.realEstateID)
            .run();
            let newData = JSON.parse(JSON.stringify(estate));
            newData.contract = contract;
            if(dateRange <= 15 && dateRange >= 0) {
                approaching.push(newData);
            } else if(dateRange < 0) {
                pastEstateData.push(newData);
            }
        }
    });
    const totalEstates = await r
        .db("hifaKiraTakip")
        .table("realEstates")
        .filter({
            "userID": requestorID
        })
    .run();
    let totalEstatesCount = [];
    let totalActiveEstates = [];
    let totalPassiveEstates = [];
    await asyncForEach(totalEstates, async estate => {
        totalEstatesCount.push(estate);
        const control = await r
            .db("hifaKiraTakip")
            .table("contracts")
            .filter({
                "realEstateID": estate.id
            })
        .run();
        if(control && control !== undefined && control !== null && control.length) {
            if(control[0].status === "continuation") {
                totalActiveEstates.push(estate);
            } else {
                totalPassiveEstates.push(estate);
            }
        }
    });
    const totalTenantCount = await r
        .db("hifaKiraTakip")
        .table("tenants")
        .filter({
            "userID": requestorID
        })
        .count()
    .run();
    return {
        message: "Verileri çekme başarılı.",
        code: 200,
        pastEstateData,
        approaching,
        totalEstatesCount: totalEstatesCount.length,
        totalActiveEstateCount: totalActiveEstates.length,
        totalPassiveEstateCount: totalPassiveEstates.length,
        totalTenantCount
    }
};
export default Home;