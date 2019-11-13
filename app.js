//define Constants (const) for the application, requiring the express, body parser, and mongo modules, as well as defining the connection URI and name for the database cluster
const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://admin:2e1Cuh1yX4NAHF3D@testcluster0-bdrzu.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "TestCluster0";

//defines the app variable as an Express function for API calls
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));

var database, collection;

app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, {useNewUrlParser:true},(error, client) => {
        if(error){
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("people");
        console.log("Connected to '" + DATABASE_NAME + "'!");
    });
});

app.post("/person", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.get("/people",(request,response) => {
    collection.find({}).toArray((error,result) => {
        if(error){
            return response.status(500).send(error);
        }
        response.send(result);
    });
});