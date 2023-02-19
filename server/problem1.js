//Number of matches played per year for all the years in IPL.

const fs = require('fs');
const matchData = require('../data/matches.json');

function findNoOfMacthPlayedEveryYear(matchData){
    let noOfMatchPlayedEveryYear = {};
    for (var line in matchData) {
        if (noOfMatchPlayedEveryYear[matchData[line].season] !== undefined) {
            noOfMatchPlayedEveryYear[matchData[line].season] += 1;
        }
        else {
            noOfMatchPlayedEveryYear[matchData[line].season] = 1;
        }
    }
    return noOfMatchPlayedEveryYear;
}

let noOfMatchPlayedEveryYear = findNoOfMacthPlayedEveryYear(matchData);
console.log(noOfMatchPlayedEveryYear);

fs.writeFileSync("../public/output/matches-per-year.json", JSON.stringify(noOfMatchPlayedEveryYear), "utf-8");
