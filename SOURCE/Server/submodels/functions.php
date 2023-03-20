<?php
// TODO @Paul Brenner
function deleteSubmodel($ShellIdent)
{
    http_response_code(501);
    exit;
}
function getSubmodelIdFromAsset($assetRef)
{
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

function GetAllSubmodelsByIdShort($IdShort)
{
    $DBresult = readDB("Submodels", ['idShort' => $IdShort], array());
    array_walk($DBresult, "removeIDfromResult");
    return $DBresult;
}

