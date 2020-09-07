const db = require("../../api/bin/dbConn");

//Insert Colors
db.color.insertMany([
    { name: "AliceBlue", hexCode: "#F0F8FF" },
    { name: "Aqua", hexCode: "#00FFFF" },
    { name: "Black", hexCode: "#000000" },
    { name: "BlueViolet", hexCode: "#8A2BE2" },
    { name: "Brown", hexCode: "#A52A2A" },
    { name: "DarkViolet", hexCode: "#9400D3" },
    { name: "DeepPink", hexCode: "#FF1493" },
]);

//Insert User
db.user.insert({
    nickname: "juthecutie",
    name: "Joana Fernandes Figueira",
    email: "joana@email.com",
    password: "pass12345",
    createdAt: new Date()
});