using MongoDB.Driver;
using MongoDB.Bson;
using AasCore.Aas3_0_RC02;
using MongoDB.Bson.Serialization;
using System;
using System.Collections.Generic;
using ScottPlot;
using Newtonsoft.Json;
using MongoDB.Bson.Serialization.Serializers;

//Author: Jonas Graubner
//contact: jogithub@graubner-bayern.de
public class MongoDBInterface
{
    private MongoClient _client;
    private IMongoDatabase _database;

    public void Initialize(String connectionString)
    {
        //_client = new MongoClient("mongodb://AAS:SefuSWE63811!@192.168.0.22:27017/?authSource=AAS");
        _client = new MongoClient(connectionString);
        try
        {
            _client.StartSession();
        }catch (System.TimeoutException ex) {
            System.Console.WriteLine(ex.Message);
            System.Environment.Exit(1);
        }
        
        _database = _client.GetDatabase("AAS");
        _database.DropCollection("Environment");
        var objectSerializer = new ObjectSerializer(type => ObjectSerializer.DefaultAllowedTypes(type) || type.FullName.StartsWith("AasCore.Aas3_0_RC02"));
        BsonSerializer.RegisterSerializer(objectSerializer);
    }
    public List<AssetAdministrationShell> readDBShells(BsonDocument filter, FindOptions options = null)
    {
        var collection = _database.GetCollection<AssetAdministrationShell>("Shells");

        return collection.Find<AssetAdministrationShell>(filter, options).ToList<AssetAdministrationShell>();
    }
    public List<Submodel> readDBSubmodels(BsonDocument filter, FindOptions options = null)
    {
        var collection = _database.GetCollection<Submodel>("Submodels");

        return collection.Find<Submodel>(filter, options).ToList<Submodel>();
    }
    public List<ConceptDescription> readDBConceptDescription(BsonDocument filter, FindOptions options = null)
    {
        var collection = _database.GetCollection<ConceptDescription>("ConceptDescription");

        return collection.Find<ConceptDescription>(filter, options).ToList<ConceptDescription>();
    }

    /*public List<BsonDocument> readDB(String Collection, BsonDocument filter, BsonDocument options) {
        IMongoCollection<BsonDocument> collection = _database.GetCollection<BsonDocument>("Shells");

        return collection.Find(new BsonDocument("id", "AssetAdministrationShell---012F46AF")).ToList();     
    }*/

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
        //writeDB("Environment", environment);
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