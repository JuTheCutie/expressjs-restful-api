//Insert Colors
db.color.insertMany([
    { name: "AliceBlue", hexCode: "#F0F8FF" },
    { name: "Aqua", hexCode: "#00FFFF" },
    { name: "BlueViolet", hexCode: "#8A2BE2" },
    { name: "Brown", hexCode: "#A52A2A" },
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