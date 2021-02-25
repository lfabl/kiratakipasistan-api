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
            "userID": requestorID,
            status: "continuation"
        })
        .run();
    let pastEstateData = [];
    let approaching = [];
    await asyncForEach(contracts, async contract => {
        const estate = await r
                .db("hifaKiraTakip")
                .table("realEstates")
                .get(contract.realEstateID)
                .run();
        let newData = JSON.parse(JSON.stringify(estate));
        newData.contract = contract;
        if(contract.contractPeriod !== "0") {
            let lastDate = new Date(moment(new Date(contract.rentalDate)).add(parseInt(contract.contractPeriod), "years"));
            console.log(lastDate);
            console.log(new Date());
            console.log(lastDate - new Date());
            console.log(moment(lastDate).diff(new Date()));
            console.log(moment(lastDate).diff(new Date()) / (1000 * 3600 * 24));
            if(lastDate - new Date() < 1296000000 && lastDate - new Date() > 0) {
                approaching.push(newData);
            } else if(lastDate - new Date() < 0) {
                pastEstateData.push(newData);
            }
        }
    });
    const totalEstates = await r
        .db("hifaKiraTakip")
        .table("realEstates")
        .filter({
            "userID": requestorID,
            visible: true
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
                "realEstateID": estate.id,
            })
            .run();
        if (control && control !== undefined && control !== null && control.length) {
            const controlFilter = control.findIndex((e) => e.status === "continuation");
            if (controlFilter !== -1) {
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
            "userID": requestorID,
            visible: true
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