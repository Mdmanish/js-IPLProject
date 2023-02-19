// let csvToJson = require('convert-csv-to-json');
// let deliveriesData = csvToJson.fieldDelimiter(',').getJsonFromCsv('../data/deliveries.csv');
// let matchData = csvToJson.fieldDelimiter(',').getJsonFromCsv('../data/matches.csv');

// module.exports = {deliveriesData: deliveriesData, matchData:matchData};

const fs = require("fs");
let data = fs.readFileSync("../data/matches.csv",{encoding:'utf-8'});

data = data.split("\n")
data = data.slice(0,-1)
header = data.shift().split(',');

let matches = []
data.forEach(eachRow => {
    line = {}
    let delivery = eachRow.split(',')
    for (let term in header){
        line[header[term]] = delivery[term];
    }
    matches.push(line);
});

fs.writeFileSync("../data/matches.json",JSON.stringify(matches), "utf-8");
