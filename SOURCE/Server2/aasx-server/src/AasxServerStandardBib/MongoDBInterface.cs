using MongoDB.Driver;
using MongoDB.Bson;
using AasCore.Aas3_0_RC02;
using MongoDB.Bson.Serialization;
using System;
using System.Collections.Generic;

public class MongoDBInterface
{
    private MongoClient _client;
    private IMongoDatabase _database;

    public void Initialize()
    {
        _client = new MongoClient("mongodb://192.168.0.40:27017");
        _database = _client.GetDatabase("AAS");  
    }

    public List<BsonDocument> readDB(String Collection, BsonDocument filter, BsonDocument options) {
        IMongoCollection<BsonDocument> collection = _database.GetCollection<BsonDocument>("Shells");

        return collection.Find(new BsonDocument("id", "AssetAdministrationShell---012F46AF")).ToList();     
    }

    public void writeDB(String collectionName, BsonDocument data)
    {
        IMongoCollection<BsonDocument> collection = _database.GetCollection<BsonDocument>(collectionName);
        try
        {
            collection.InsertOneAsync(data);
        }catch (MongoWriteException ex)
        {

        }        
    }

    public void importAASCoreEnvironment(AasCore.Aas3_0_RC02.Environment environment)
    {
        List<AasCore.Aas3_0_RC02.AssetAdministrationShell> shells = environment.AssetAdministrationShells;

        shells.ForEach(shell => {
            var Document = shell.ToBsonDocument;
            writeDB("shells", new BsonDocument());
                Console.WriteLine(shell);
            });






        writeDB("shells", new BsonDocument());
    }



}