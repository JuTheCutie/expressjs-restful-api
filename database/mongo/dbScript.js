//+--+------------------------------------+--+
//|++| ProjectCheck Mongo Database Script |++|
//+--+------------------------------------+--+

//Collections

//user
db.createCollection("user", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nickname","name","email","password","createdAt"],
            properties: {
                nickname: {
                    bsonType: "String"
                },
                name: {
                    bsonType: "String"
                },
                email: {
                    bsonType: "String"
                },
                password: {
                    bsonType: "String"
                },
                createdAt: {
                    bsonType: "Date"
                },
            }
        }
    },
    validationAction: "error"
});

//color
db.createCollection("color", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name","hexCode"],
            properties: {
                name: {
                    bsonType: "String"
                },
                hexCode: {
                    bsonType: "String"
                },
            }
        }
    },
    validationAction: "error"
});

//project
db.createCollection("project", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name","idColor","idUser","createdAt"],
            properties: {
                name: {
                    bsonType: "String"
                },
                idColor: {
                    bsonType: "String"
                },
                idUser: {
                    bsonType: "String"
                },
                createdAt: {
                    bsonType: "Date"
                },
            }
        }
    },
    validationAction: "error"
});

//task
db.createCollection("task", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["body","priority","schedule","idProject","createdAt"],
            properties: {
                body: {
                    bsonType: "String"
                },
                priority: {
                    bsonType: "String"
                },
                schedule: {
                    bsonType: "Date"
                },
                idProject: {
                    bsonType: "String"
                },
                createdAt: {
                    bsonType: "Date"
                },
            }
        }
    },
    validationAction: "error"
});

//comment
db.createCollection("comment", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["text","idUser","createdAt"],
            properties: {
                text: {
                    bsonType: "String"
                },
                idUser: {
                    bsonType: "String"
                },
                idTask: {
                    bsonType: "String"
                },
                idProject: {
                    bsonType: "String"
                },
                createdAt: {
                    bsonType: "Date"
                },
            }
        }
    },
    validationAction: "error"
});
