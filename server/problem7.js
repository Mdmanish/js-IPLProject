//Find the strike rate of a batsman for each season

const fs = require('fs');
const matchData = require('../data/matches.json');
const deliveriesData = require('../data/deliveries.json');

function findMatchIdAndSeasion(matchData) {
    let matchIdAndSeasion = {};
    for (line in matchData) {
        matchIdAndSeasion[matchData[line].id] = matchData[line].season;
    }

    return matchIdAndSeasion;
}

function findBatsmanSeasonRunsAndBalls(deliveriesData, matchIdAndSeasion) {
    let batsmanSeasonRunsAndBalls = {};

    for (line in deliveriesData) {
        if (deliveriesData[line].wide_runs == '0') {

            let seasion = matchIdAndSeasion[deliveriesData[line].match_id];
            let batsmanName = deliveriesData[line].batsman;
            let batsmanRun = parseInt(deliveriesData[line].batsman_runs);

            if (batsmanSeasonRunsAndBalls[seasion] === undefined) {
                batsmanSeasonRunsAndBalls[seasion] = {};
                batsmanSeasonRunsAndBalls[seasion][batsmanName] = [batsmanRun, 1];
            }
            else {
                if (batsmanSeasonRunsAndBalls[seasion][batsmanName] === undefined) {
                    batsmanSeasonRunsAndBalls[seasion][batsmanName] = [batsmanRun, 1];
                }
                else {
                    let prevRuns = batsmanSeasonRunsAndBalls[seasion][batsmanName][0];
                    let prevBalls = batsmanSeasonRunsAndBalls[seasion][batsmanName][1];
                    batsmanSeasonRunsAndBalls[seasion][batsmanName] = [prevRuns + batsmanRun, prevBalls + 1];
                }
            }
        }
    }

    return batsmanSeasonRunsAndBalls;
}


function findStrikeRateForEachSeasion(batsmanSeasonRunsAndBalls) {
    let eachSeasionStrikeRate = {};

    for (let seasion in batsmanSeasonRunsAndBalls) {
        eachSeasionStrikeRate[seasion] = {};
        for (let batsman in batsmanSeasonRunsAndBalls[seasion]) {
            let strikeRate = (batsmanSeasonRunsAndBalls[seasion][batsman][0] / batsmanSeasonRunsAndBalls[seasion][batsman][1]) * 100;
            eachSeasionStrikeRate[seasion][batsman] = strikeRate;
        }
    }

    return eachSeasionStrikeRate;
}


let matchIdAndSeasion = findMatchIdAndSeasion(matchData);
let batsmanSeasonRunsAndBalls = findBatsmanSeasonRunsAndBalls(deliveriesData, matchIdAndSeasion);
let eachSeasionStrikeRate = findStrikeRateForEachSeasion(batsmanSeasonRunsAndBalls);

console.log(eachSeasionStrikeRate);
fs.writeFileSync("../public/output/batsman-strike-rate-each-season.json", JSON.stringify(eachSeasionStrikeRate), "utf-8");
