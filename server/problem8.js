// Find the highest number of times one player has been dismissed by another player

const fs = require('fs');
const deliveriesData = require('../data/deliveries.json');

function findPlayerDismissed(deliveriesData) {
    let dismissedPlayerInfo = {};
    for (line in deliveriesData) {
        if (deliveriesData[line].player_dismissed !== "" & deliveriesData[line].dismissal_kind !== "run out") {
            let dismissedPlayer = deliveriesData[line].player_dismissed;
            let dismissalPlayer = deliveriesData[line].bowler;

            if (dismissedPlayerInfo[dismissedPlayer] === undefined) {
                dismissedPlayerInfo[dismissedPlayer] = {};
                dismissedPlayerInfo[dismissedPlayer][dismissalPlayer] = 1;
            }
            else {
                if (dismissedPlayerInfo[dismissedPlayer][dismissalPlayer] === undefined) {
                    dismissedPlayerInfo[dismissedPlayer][dismissalPlayer] = 1;
                }
                else {
                    dismissedPlayerInfo[dismissedPlayer][dismissalPlayer] += 1;
                }
            }
        }
    }

    return dismissedPlayerInfo;
}


function findHeighestNoOfTimePlayerDismissed(dismissedPlayerInfo) {
    let finalAnswer = {};

    for (let dismissed in dismissedPlayerInfo) {
        finalAnswer[dismissed] = {};

        // Storing dismissal player and count in an array to sort them
        let dismissalPlayerAndCount = [];
        for (let dismissal in dismissedPlayerInfo[dismissed]) {
            let name = dismissal;
            let count = dismissedPlayerInfo[dismissed][dismissal];
            dismissalPlayerAndCount.push([name, count]);
        }

        dismissalPlayerAndCount.sort((a, b) => {
            return b[1] - a[1];
        });

        // Storing all the highest dismmisal player name and count.
        for (let index in dismissalPlayerAndCount) {
            let count = dismissalPlayerAndCount[index][1];
            let name = dismissalPlayerAndCount[index][0];

            if (dismissalPlayerAndCount[0][1] === dismissalPlayerAndCount[index][1]) {
                finalAnswer[dismissed][name] = count;
            }
        }
    }

    return finalAnswer;
}


let dismissedPlayerInfo = findPlayerDismissed(deliveriesData);
let finalAnswer = findHeighestNoOfTimePlayerDismissed(dismissedPlayerInfo)

console.log(finalAnswer);
fs.writeFileSync("../public/output/player-dismissed.json", JSON.stringify(finalAnswer), "utf-8");
