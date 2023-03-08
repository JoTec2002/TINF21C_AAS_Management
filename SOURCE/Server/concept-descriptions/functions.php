<?php
function getAllConceptDescriptions(){
    $DBresult = readDB("Concept Description", array(), array());
    array_walk($DBresult, "removeIDfromResult");
    return $DBresult;
}
function GetConceptDescriptionById($Id){
    http_response_code(501);
    exit;
}
function GetAllConceptDescriptionsByIdShort($IdShort){
    $DBresult = readDB("Concept Description", ['aas:idShort' => $IdShort], array());
    array_walk($DBresult, "removeIDfromResult");
    return $DBresult;
}