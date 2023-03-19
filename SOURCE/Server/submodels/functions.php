<?php
function deleteSubmodel($ShellIdent){
    // TODO @Paul Brenner
    function getSubmodelIdFromAsset($assetRef){
        $DBresult = readDB("Submodels",
            ['assetInformation.globalAssetId.keys.value' => $assetRef],
            ["projection" => ["id"=>1]]);
        return $DBresult[0];
    }

    function GetAllSubmodels()
    {
        $DBresult = readDB("Submodels", array(), array());
        array_walk($DBresult, "removeIDfromResult");
        return $DBresult;
    }

    http_response_code(501);
    exit;
}
