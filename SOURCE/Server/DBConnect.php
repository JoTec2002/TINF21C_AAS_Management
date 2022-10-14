<?php
use MongoDB\Client

$client = new MongoDB\Client(
    'mongodb://192.168.0.40:27017/'
);

$collection = $client->test->test;

$result = $collection->find();

foreach ($result as $entry) {
    print_r($entry);
    print("<br>");
}
