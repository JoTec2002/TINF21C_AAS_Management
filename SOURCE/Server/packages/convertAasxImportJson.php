<?php
function renameAasArrayKeys($importArray){
    $exportArray = array();
    foreach ($importArray as $key => $innerValue){
        if ($key == "@attributes") {
            if(isset($innerValue["type"])){
                $exportArray['type'] = $innerValue["type"];
            }else{
                $exportArray["@attributes"] = $innerValue;
            }
        }elseif(gettype($innerValue) == "array"){
            $exportArray[changeKeyName($key)] = renameAasArrayKeys($innerValue);
        }else{
            $exportArray[changeKeyName($key)] = $innerValue;
        }
    }
    return $exportArray;
}
function slimArray($importArray){
    if(gettype($importArray) == "array"){
        foreach ($importArray as $key=>$value){
            if(isset($importArray[$key][substr($key,0, -1)])){
                $importArray[$key] = $importArray[$key][substr($key,0, -1)];
            }
            $importArray[$key] = slimArray($importArray[$key]);
        }
    }
    return $importArray;
}
function changeKeyName($keyName){
    if(substr($keyName, 0, 4) == "aas:"){
       return substr($keyName, 4);
    }elseif ($keyName == "@content"){
        return "value";
    }else{
        return $keyName;
    }
}
function ExtractIdlocation($Import){
    $Import['id'] = $Import["identification"]["value"];
    unset($Import["identification"]);
    return $Import;
}
function ExtractSubmodelsLocation($import){
    $import['submodels'] = $import['submodelRefs'];
    foreach ($import['submodels'] as $key=>$value){
        $import['submodels'][$key]["type"] = "ModelReference";
    }
    unset($import['submodelRefs']);
    return $import;
}
function ExtractAssetRefLocation($import){
    $import['assetInformation'] = array("assetKind"=>"Instance", "globalAssetId"=>
        array("type"=>"GlobalReference", "keys"=>
            array(0=>
                array("tpye"=>"GlobalReference", "value"=>$import['assetRef']['keys']['value']))));
    unset($import['assetRef']);
    return $import;
}