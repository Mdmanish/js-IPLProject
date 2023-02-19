//Find the number of times each team won the toss and also won the match

const fs = require('fs');
const matchData = require('../data/matches.json');

function noOfTimesWonTossAndMatch(matchData) {
    let teamWonTossAndMatch = {};

    for (var line in matchData) {
        if (matchData[line].toss_winner === matchData[line].winner) {
            if (teamWonTossAndMatch[matchData[line].toss_winner] === undefined) {
                teamWonTossAndMatch[matchData[line].toss_winner] = 1;
            }
            else {
                teamWonTossAndMatch[matchData[line].toss_winner] += 1;
            }
        }
    }
    return teamWonTossAndMatch;
}

let teamWonTossAndMatch = noOfTimesWonTossAndMatch(matchData);

console.log(teamWonTossAndMatch);
fs.writeFileSync("../public/output/team-won-toss-and-match.json", JSON.stringify(teamWonTossAndMatch), "utf-8");
