<?php
function getAllConceptDescriptions(){
    $DBresult = readDB("Concept Description", array(), array());
    array_walk($DBresult, "removeIDfromResult");
    return $DBresult;
}
function GetConceptDescriptionById($Id){
    $DBresult = readDB("Concept Description", ['aas:identification.@content' => $Id],
        array());
    array_walk($DBresult, "removeIDfromResult");
    return $DBresult;
}
function getAllConceptDescriptionsByIdShort($IdShort){
    $DBresult = readDB("Concept Description", ['aas:idShort' => $IdShort], array());
    array_walk($DBresult, "removeIDfromResult");
    return $DBresult;
}
function getAllConceptDescriptionsByIsCaseOf($isCaseOf){
    //TODO do when example found
    http_response_code(501);
    exit();
    return null;
}
function getAllConceptDescriptionsByDataSpecificationReference($dataSpecificationRef){
    //TODO do when example found
    http_response_code(501);
    exit;
    return null;
}
function deleteConceptDescription($Id){
    $DBresult = deleteDB("Concept Description", ['aas:identification.@content'=>$Id], array());
    if(!$DBresult){
        echo json_encode(["error" => "Concept Description could not be deleted"], JSON_NUMERIC_CHECK);
        http_response_code(500);
        exit();
    }
    return $DBresult;
}
function createConceptDescription($Data){
    return writeDB("Concept Description", $Data);
}

function updateConceptDescription($Id, $Data){
    $DBresult = updateDB("Concept Description", ['aas:identification.@content'=>$Id], ['$set'=>$Data], array());
    if(!$DBresult){
        echo json_encode(["error" => "Concept Description could not be deleted"], JSON_NUMERIC_CHECK);
        http_response_code(500);
        exit();
    }
    return $DBresult;
}
