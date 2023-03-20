<?php
require_once 'vendor/autoload.php'; //xampp
use MongoDB\Client as Mongo;

//$client = new Mongo('mongodb://192.168.0.40:27017/');
$client = new Mongo('mongodb://localhost:27017/');
$client = $client->selectDatabase("AAS");

function writeDB($collection, $content){
    global $client;
    $collection = $client -> selectCollection($collection);
    try{
        $result = $collection -> insertOne($content);
        return $result->getInsertedId();
    }catch (MongoDB\Driver\Exception\BulkWriteException $e){
        echo($e);
        http_response_code(409);
        exit;
    }
}
function readDB($collection, $filter, $options){
    global $client;
    $collection = $client ->selectCollection($collection);
    $cursor = $collection->find($filter, $options);
    $cursor->setTypeMap(['root' => 'array', 'document' => 'array', 'array' => 'array']);
    $result = $cursor->toArray();
    array_walk($result, "extractIDfromResult");
    return $result;
}

function deleteDB($collection, $filter, $options){
    global $client;
    $collection = $client->selectCollection($collection);
    $cursor = $collection->deleteOne($filter, $options);
    return $cursor->isAcknowledged();
}

function updateDB($collection, $filter, $content, $options){
    global $client;
    $collection = $client->selectCollection($collection);
    $UpdateResult = $collection->updateOne($filter, $content, $options);
    return $UpdateResult->isAcknowledged();
}

function extractIDfromResult(&$item, $key){
    $item['_id'] = $item['_id']->jsonSerialize()['$oid'];
}
