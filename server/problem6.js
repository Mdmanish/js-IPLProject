//Find a player who has won the highest number of Player of the Match awards for each season

const fs = require('fs');
const matchData = require('../data/matches.json');

function findPlayerOfTheMatch(matchData) {
    let playerOfTheMatch = {};

    for (var line in matchData) {
        if (playerOfTheMatch[matchData[line].season] === undefined) {
            playerOfTheMatch[matchData[line].season] = {};
            playerOfTheMatch[matchData[line].season][matchData[line].player_of_match] = 1;
        }
        else {
            if (playerOfTheMatch[matchData[line].season][matchData[line].player_of_match] === undefined) {
                playerOfTheMatch[matchData[line].season][matchData[line].player_of_match] = 1;
            }
            else {
                playerOfTheMatch[matchData[line].season][matchData[line].player_of_match] += 1;
            }
        }
    }
    return playerOfTheMatch;
}

function highestNoOfMatchOfThePlayer(playerOfTheMatch) {
    let highestPOTMName = []; // POTM: Player Of The Match

    for (let season in playerOfTheMatch) {

        //Storing the player name and their POTM count
        let playerAndCount = [];
        for (let player in playerOfTheMatch[season]) {
            playerAndCount.push([player, playerOfTheMatch[season][player]]);
        }

        // Sorting the array in descending order by value
        playerAndCount.sort((a, b) => {
            return b[1] - a[1];
        });

        // Storing the highest POTM in each seasion
        // highestPOTMName.push([season, playerAndCount[0][0], playerAndCount[0][1]]);
        for(let i in playerAndCount){
            if(playerAndCount[0][1] === playerAndCount[i][1]){
                highestPOTMName.push([season, playerAndCount[i][0], playerAndCount[i][1]]);
            }
        }
    }

    return highestPOTMName;
}

let playerOfTheMatch = findPlayerOfTheMatch(matchData);
let highestPOTMName = highestNoOfMatchOfThePlayer(playerOfTheMatch); // POTM: Player Of The Match

console.log(highestPOTMName);

fs.writeFileSync("../public/output/player-of-the-match.json", JSON.stringify(highestPOTMName), "utf-8");
