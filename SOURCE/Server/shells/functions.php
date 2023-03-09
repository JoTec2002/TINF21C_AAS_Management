<?php
function getShellIdentFromAsset($assetRef){
    $DBresults = readDB("Shells",
        ['aas:assetRef.aas:keys.aas:key.@content' => $assetRef],
        ["projection" => ["aas:identification"=>["@content"=>1]]]);
    return $DBresults[0]["aas:identification"]["@content"];
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
