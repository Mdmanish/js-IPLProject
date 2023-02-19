// Number of matches won per team per year in IPL.

const fs = require('fs');
const matchData = require('../data/matches.json');

function findNoOfMatchWonPerTeamPerYear(matchData) {
    let noOfMatchWonEveryTeamByYear = {};

    for (var line in matchData) {
        if (noOfMatchWonEveryTeamByYear[matchData[line].season] === undefined) {
            noOfMatchWonEveryTeamByYear[matchData[line].season] = {};
            noOfMatchWonEveryTeamByYear[matchData[line].season][matchData[line].winner] = 1;
        }
        else {
            if (noOfMatchWonEveryTeamByYear[matchData[line].season][matchData[line].winner] === undefined) {
                noOfMatchWonEveryTeamByYear[matchData[line].season][matchData[line].winner] = 1;
            }
            else {
                noOfMatchWonEveryTeamByYear[matchData[line].season][matchData[line].winner] += 1;
            }
        }
    }
    return noOfMatchWonEveryTeamByYear;
}

let noOfMatchWonEveryTeamByYear = findNoOfMatchWonPerTeamPerYear(matchData);
console.log(noOfMatchWonEveryTeamByYear);

fs.writeFileSync("../public/output/matches-won-per-team-per-year.js", JSON.stringify(noOfMatchWonEveryTeamByYear), "utf-8")