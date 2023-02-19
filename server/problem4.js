//Top 10 economical bowlers in the year 2015

const fs = require('fs');
const matchData = require('../data/matches.json');
const deliveriesData = require('../data/deliveries.json');

//Stores the match id of 2015 matches in a set.
function findIdOf2015Match(matchData) {
    let idOf2015Match = new Set();

    for (var line in matchData) {
        if (matchData[line].season == 2015) {
            idOf2015Match.add(matchData[line].id);
        }
    }
    return idOf2015Match;
}

function findTop10EcoBowler(deliveriesData, idOf2015Match) {
    let bowlerRunBall = {};

    // Calculates every players total balls and total runs.
    for (var line in deliveriesData) {
        // Checks if the match id is of 2015 match and over is not a super over.
        if (idOf2015Match.has(deliveriesData[line].match_id) & deliveriesData[line].is_super_over == '0') {
            if (bowlerRunBall[deliveriesData[line].bowler] === undefined) {
                bowlerRunBall[deliveriesData[line].bowler] = [parseInt(deliveriesData[line].total_runs), 1];
            }
            else {
                let prev_runs = bowlerRunBall[deliveriesData[line].bowler][0];
                let prev_balls = bowlerRunBall[deliveriesData[line].bowler][1];
                bowlerRunBall[deliveriesData[line].bowler] = [prev_runs + parseInt(deliveriesData[line].total_runs), prev_balls + 1];
            }
        }
    }

    //Calculates economic rate of every player.
    let economicRate = [];
    for (obj in bowlerRunBall) {
        let totalRuns = bowlerRunBall[obj][0];
        let totalBalls = bowlerRunBall[obj][1];
        economicRate.push([obj, (totalRuns * 6) / totalBalls]);    //economicRate = totalRuns / (totalBalls / 6)
    }

    // Sorting  the array in desc order.
    economicRate.sort((a, b) => {
        return a[1] - b[1];
    });

    // Storing top 10 economic bowler.
    let top10EconomicBowler = [];
    for (let index = 0; index < 10; index++) {
        top10EconomicBowler.push([economicRate[index][0], economicRate[index][1]]);
    }

    return top10EconomicBowler;
}

let idOf2015Match = findIdOf2015Match(matchData);
let top10EconomicBowler = findTop10EcoBowler(deliveriesData, idOf2015Match);

console.log(top10EconomicBowler);
fs.writeFileSync("../public/output/top-10-economic-bowler-2015.json", JSON.stringify(top10EconomicBowler), "utf-8");
