const fs = require("fs");
let data = fs.readFileSync("../data/deliveries.csv",{encoding:'utf-8'});

data = data.split("\n")
data = data.slice(0,-1)
heading = data.shift().split(',');

let deliveries = []
data.forEach(eachRow => {
    line = {}
    let delivery = eachRow.split(',')
    for (let term in heading){
        line[heading[term]] = delivery[term];
    }
    deliveries.push(line);
});

fs.writeFileSync("../data/deliveries.json",JSON.stringify(deliveries), "utf-8");
