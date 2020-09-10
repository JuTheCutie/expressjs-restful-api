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
                    bsonType: "string"
                },
                name: {
                    bsonType: "string"
                },
                email: {
                    bsonType: "string"
                },
                password: {
                    bsonType: "string"
                },
                createdAt: {
                    bsonType: "date"
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
                    bsonType: "string"
                },
                hexCode: {
                    bsonType: "string"
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
            required: ["name","idColor","idUsers","createdAt"],
            properties: {
                name: {
                    bsonType: "string"
                },
                idColor: {
                    bsonType: "string"
                },
                idUsers: {
                    bsonType: "array"
                },
                createdAt: {
                    bsonType: "date"
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
                    bsonType: "string"
                },
                priority: {
                    bsonType: "boolean"
                },
                schedule: {
                    bsonType: "date"
                },
                idProject: {
                    bsonType: "string"
                },
                createdAt: {
                    bsonType: "date"
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
                    bsonType: "string"
                },
                idUser: {
                    bsonType: "string"
                },
                idTask: {
                    bsonType: "string"
                },
                idProject: {
                    bsonType: "string"
                },
                createdAt: {
                    bsonType: "date"
                },
            }
        }
    },
    validationAction: "error"
});
