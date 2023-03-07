<?php
function getAssetIdentification($id){
    $DBresults = readDB("Assets", ['_id' => new MongoDB\BSON\ObjectId($id)], array());
    return $DBresults[0]['aas:identification']['@content'];
}