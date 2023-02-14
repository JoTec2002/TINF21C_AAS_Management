<?php
require_once 'vendor/autoload.php'; //xampp
use MongoDB\Client as Mongo;

$client = new Mongo('mongodb://192.168.0.40:27017/');
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

function extractIDfromResult(&$item, $key){
    $item['_id'] = $item['_id']->jsonSerialize()['$oid'];
}