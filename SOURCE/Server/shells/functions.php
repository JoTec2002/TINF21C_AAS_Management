<?php
function getShellIdFromAsset($assetRef){
    $DBresult = readDB("Shells",
        ['aas:assetRef.aas:keys.aas:key.@content' => $assetRef],
        ["projection" => ["aas:identification"=>["@content"=>1]]]);
    return $DBresult[0]["aas:identification"]["@content"];
}
function GetAllShells(){
    $DBresult = readDB("Shells", array(), array());
    array_walk($DBresult, "removeIDfromResult");
    return $DBresult;
}
function GetAllShellsById($Id){
    $DBresult = readDB("Shells", ['aas:identification.@content' => $Id],
        array());
    array_walk($DBresult, "removeIDfromResult");
    return $DBresult;
}
function GetAllShellsByAssetId($aId){
    http_response_code(501);
    exit();
}
function GetAllShellsByIdShort ($IdShort){
    $DBresult = readDB("Shells", ['aas:idShort' => $IdShort], array());
    array_walk($DBresult, "removeIDfromResult");
    return $DBresult;
}


function deleteshell($identification){
    //get all dependent submodells
    $DBresults = readDB("Shells", array(),
        ["projection" => ["aas:submodelRefs"=>["aas:submodelRef"=>1]]])
        [0]["aas:submodelRefs"]["aas:submodelRef"];
    foreach ($DBresults as $submodel){
        //delete every dependent submodels
        deleteSubmodel($submodel["aas:keys"]["aas:key"]["@content"]);
    }
    //TODO further testing when delete Submodel fully implemented
    //TODO @Jonas Graubner
}
