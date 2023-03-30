using MongoDB.Driver;
using MongoDB.Bson;
using AasCore.Aas3_0_RC02;
using MongoDB.Bson.Serialization;
using System;
using System.Collections.Generic;
using ScottPlot;
using Newtonsoft.Json;
using MongoDB.Bson.Serialization.Serializers;

public class MongoDBInterface
{
    private MongoClient _client;
    private IMongoDatabase _database;

    public void Initialize()
    {
        _client = new MongoClient("mongodb://AAS:SefuSWE63811!@192.168.0.22:27017/?authSource=AAS");
        /*var dbList = _client.ListDatabases().ToList();

        Console.WriteLine("The list of databases on this server is: ");
        foreach (var db in dbList)
        {
            Console.WriteLine(db);
        }*/
        _database = _client.GetDatabase("AAS");
        _database.DropCollection("Environment");
        var objectSerializer = new ObjectSerializer(type => ObjectSerializer.DefaultAllowedTypes(type) || type.FullName.StartsWith("AasCore.Aas3_0_RC02"));
        BsonSerializer.RegisterSerializer(objectSerializer);
    }

    public List<BsonDocument> readDB(String Collection, BsonDocument filter, BsonDocument options) {
        IMongoCollection<BsonDocument> collection = _database.GetCollection<BsonDocument>("Shells");

        return collection.Find(new BsonDocument("id", "AssetAdministrationShell---012F46AF")).ToList();     
    }

    public void writeDB(String collectionName, object data)
    {
        var collection = _database.GetCollection<object>(collectionName);
        try
        {
            collection.InsertOne(data);
        }catch (MongoWriteException ex)
        {

        }        
    }

    public void importAASCoreEnvironment(AasCore.Aas3_0_RC02.Environment environment)
    {
        writeDB("Environment", environment);
        environment.AssetAdministrationShells.ForEach(shell => {
            writeDB("Shells", shell);
            });

        environment.Submodels.ForEach(submodel =>
        {
            writeDB("Submodels", submodel);
        });

        environment.ConceptDescriptions.ForEach(conceptDescription =>
        {
            writeDB("ConceptDescription", conceptDescription);
        });
    }



}