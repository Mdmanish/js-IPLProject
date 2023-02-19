// Find the bowler with the best economy in super overs

const fs = require('fs');
const deliveriesData = require('../data/deliveries.json');

function bestEconomicBowlerInSuperOver(deliveriesData){
    let economicBowler = {};
    for (line in deliveriesData){
        if (deliveriesData[line].is_super_over  != '0'){
            if (economicBowler[deliveriesData[line].bowler] === undefined){
                economicBowler[deliveriesData[line].bowler] = [parseInt(deliveriesData[line].total_runs), 1];
            }
            else{
                let prevRun = economicBowler[deliveriesData[line].bowler][0];
                let prevBowl = economicBowler[deliveriesData[line].bowler][1];
                economicBowler[deliveriesData[line].bowler] = [prevRun + parseInt(deliveriesData[line].total_runs), prevBowl + 1];
            }
        }
    }
    return economicBowler;
}


function findBestEcoBowler(economicBowler){
    let bestBowlerName = "";
    let bestBowlerRate = 1000;

    for (bowler in economicBowler){
        if ((economicBowler[bowler][0] * 6) / economicBowler[bowler][1] < bestBowlerRate){
            bestBowlerName = bowler;
            bestBowlerRate = (economicBowler[bowler][0] * 6) / economicBowler[bowler][1];
        }
    }
    return [bestBowlerName, bestBowlerRate];
}

let economicBowler = bestEconomicBowlerInSuperOver(deliveriesData);
bestBowler = findBestEcoBowler(economicBowler);

console.log(bestBowler[0], bestBowler[1]);

fs.writeFileSync("../public/output/best-eco-bowler.json", JSON.stringify(bestBowler), "utf-8");
