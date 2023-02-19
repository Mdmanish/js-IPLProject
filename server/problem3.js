//Extra runs conceded per team in the year 2016

const fs = require('fs');
const matchData = require('../data/matches.json');
const deliveriesData = require('../data/deliveries.json');

function findMatchIdOf2016(matchData) {
    let idOf2016Match = new Set();
    for (var line in matchData) {
        if (matchData[line].season == 2016) {
            idOf2016Match.add(matchData[line].id);
        }
    }
    return idOf2016Match;
}

function findExtraRuns(deliveriesData, idOf2016Match) {
    let extraRunOfEveryTeam = {};

    for (var line in deliveriesData) {
        if (idOf2016Match.has(deliveriesData[line].match_id)) {
            if (extraRunOfEveryTeam[deliveriesData[line].bowling_team] === undefined) {
                extraRunOfEveryTeam[deliveriesData[line].bowling_team] = parseInt(deliveriesData[line].extra_runs);
            }
            else {
                extraRunOfEveryTeam[deliveriesData[line].bowling_team] += parseInt(deliveriesData[line].extra_runs);
            }
        }
    }
    return extraRunOfEveryTeam;
}

let idOf2016Match = findMatchIdOf2016(matchData);
let extraRunOfEveryTeam = findExtraRuns(deliveriesData, idOf2016Match);

console.log(extraRunOfEveryTeam);
fs.writeFileSync("../public/output/extra-run-by-every-team.json", JSON.stringify(extraRunOfEveryTeam), "utf-8")
