<?php
require_once __DIR__ . '/var/www/html/vendor/autoload.php';

use MongoDB\Client as Mongo;

$client = new Mongo('mongodb://192.168.0.40:27017/');

$collection = $client->test->test;

$result = $collection->find();

foreach ($result as $entry) {
    print_r($entry);
    print("<br>");
}
