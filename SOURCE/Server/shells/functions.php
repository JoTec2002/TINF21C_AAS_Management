<?php
function getShellIdFromAsset($assetRef){
    $DBresult = readDB("Shells",
        ['assetInformation.globalAssetId.keys.value' => $assetRef],
        ["projection" => ["id"=>1]]);
    return $DBresult[0];
}
function GetAllShells(){
    $DBresult = readDB("Shells", array(), array());
    array_walk($DBresult, "removeIDfromResult");
    return $DBresult;
}
function GetAllShellsById($Id){
    $DBresult = readDB("Shells", ['id' => $Id],
        array());
    array_walk($DBresult, "removeIDfromResult");
    return $DBresult;
}
function GetShellsAssetInfById($Id){
    $DBresult = readDB("Shells", ['id' => $Id], ["projection"=>['assetInformation'=>1]]);
    array_walk($DBresult, "removeIDfromResult");
    return $DBresult[0]['assetInformation'];
}
function GetShellsSubmodelsById($Id){
    $DBresult = readDB("Shells", ['id' => $Id], ["projection"=>["aas:submodelRefs"=>1]]);
    array_walk($DBresult, "removeIDfromResult");
    return $DBresult;
}
function GetAllShellsByAssetId($aId){
    $DBresult = readDB("Shells", ['assetInformation.globalAssetId.keys.value' => $aId],
        array());
    array_walk($DBresult, "removeIDfromResult");
    return $DBresult;
}
function GetAllShellsByIdShort ($IdShort){
    $DBresult = readDB("Shells", ['idShort' => $IdShort], array());
    array_walk($DBresult, "removeIDfromResult");
    return $DBresult;
}
function createShell($Data){
    return writeDB("Shells", $Data);
}
function updateShell($Id, $Data){
    $DBresult = updateDB("Shells", ['id'=>$Id], ['$set'=>$Data], array());
    if(!$DBresult){
        echo json_encode(["error" => "Concept Description could not be deleted"], JSON_NUMERIC_CHECK);
        http_response_code(500);
        exit();
    }
    return $DBresult;
}

function deleteShell($Id){
    //TODO should all referd objecte wich are exclusivly used be deleted?
    //get all dependent submodells
    /*$DBresults = readDB("Shells", array(),
        ["projection" => ["aas:submodelRefs"=>["aas:submodelRef"=>1]]])
        [0]["aas:submodelRefs"]["aas:submodelRef"];
    foreach ($DBresults as $submodel){
        //delete every dependent submodels
        deleteSubmodel($submodel["aas:keys"]["aas:key"]["@content"]);
    }*/
    $DBresult = deleteDB("Shells", ['id'=>$Id], array());
    if(!$DBresult){
        echo json_encode(["error" => "Concept Description could not be deleted"], JSON_NUMERIC_CHECK);
        http_response_code(500);
        exit();
    }
    return $DBresult;
}
