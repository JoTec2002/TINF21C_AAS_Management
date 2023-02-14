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