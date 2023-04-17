using MongoDB.Driver;
using MongoDB.Bson;
using AasCore.Aas3_0_RC02;
using MongoDB.Bson.Serialization;
using System;
using System.Collections.Generic;
using ScottPlot;
using Newtonsoft.Json;
using MongoDB.Bson.Serialization.Serializers;
using AasxServerStandardBib.Exceptions;
using System.Collections;
using System.Linq;

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
        _database.DropCollection("Filenames");
        var objectSerializer = new ObjectSerializer(type => ObjectSerializer.DefaultAllowedTypes(type) || type.FullName.StartsWith("AasCore.Aas3_0_RC02") || type.FullName.StartsWith("MongoDB"));
        BsonSerializer.RegisterSerializer(objectSerializer);
    }
    public List<AssetAdministrationShell> readDBShells(BsonDocument filter, FindOptions options = null)
    {
        var collection = _database.GetCollection<AssetAdministrationShell>("Shells");

        return collection.Find<AssetAdministrationShell>(filter, options).ToList<AssetAdministrationShell>();
    }
    public string readDBFilename(string aasIdentifier)
    {
        var collection = _database.GetCollection<BsonDocument>("Filenames");

        var result = collection.Find<BsonDocument>(new BsonDocument("_id", aasIdentifier)).ToList<BsonDocument>();

        if(result.Count == 0)
        {
            throw new Exception("File not found in DB");
        }
        return result[0].Elements.ToList()[1].Value.ToString();
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

    public void updateDBShells(string aasIdentifier, AssetAdministrationShell newShell)
    {
        deleteDB("Shells", aasIdentifier);
        writeDB("Shells", newShell);
    }
    public void updateDBSubmodels(string submodelIdentifier, Submodel newSubmodel)
    {
        deleteDB("Submodels", submodelIdentifier);
        writeDB("Submodels", newSubmodel);
    }
    public void updateDBConceptDescription(string cdIdentifier, ConceptDescription newConceptDescription)
    {
        deleteDB("ConceptDescription", cdIdentifier);
        writeDB("ConceptDescription", newConceptDescription);
    }

    public void deleteDB(string collectionName, string Identifier)
    {
        var collection = _database.GetCollection<AssetAdministrationShell>(collectionName);
        collection.DeleteOne(new BsonDocument("_id", Identifier));
    }

    public void writeDB(String collectionName, object data, bool throwError=false)
    {
        var collection = _database.GetCollection<object>(collectionName);
        try
        {
            collection.InsertOne(data);
        }catch (MongoWriteException ex)
        {
            if (throwError)
            {
                throw new DuplicateException($"{collectionName} with id {data} already exists.");
            }            
        }        
    }
    public void writeDBFilenames(BsonDocument document)
    {
        var collection = _database.GetCollection<BsonDocument>("Filenames");
        try
        {
            collection.InsertOne(document);
        }
        catch (MongoWriteException ex)
        {
            
        }
    }

    public void importAASCoreEnvironment(AasCore.Aas3_0_RC02.Environment environment, string filename)
    {
        //writeDB("Environment", environment);  
        environment.AssetAdministrationShells.ForEach(shell => {
            writeDB("Shells", shell);
            writeDBFilenames(new BsonDocument { { "_id", shell.Id }, { "filename", filename } });
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