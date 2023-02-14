<?php
require_once '../DBController.php';
//AASX FileServerApi
//Detect Request method
switch ($_SERVER['REQUEST_METHOD']){
    case "DELETE":
        // TODO Delete request
        http_response_code(501);
        break;

    case "GET":
        // TODO Get request
        http_response_code(501);
        break;

    case "PUT":
        //TODO Put request
        http_response_code(501);
        break;

    case "POST":
        // TODO POST request
        //Check if request is ok
        if ($_FILES == array()){
            print json_encode(["error" => "No aasx file given"], JSON_NUMERIC_CHECK);
            http_response_code(400);
        }

        //unpack aasx file
        $zip = new ZipArchive;
        if ($zip->open($_FILES['file']['tmp_name']) === TRUE) {
            $zip->extractTo('tmp/');
            $zip->close();
        } else {
            echo json_encode(["error" => "File could not be decompressed"], JSON_NUMERIC_CHECK);
            http_response_code(500);
        }

        //generate filename of xml
        $aasID = preg_replace("/[^a-z 1-9]/", "_", $_POST['aasIds']);

        //read xml file
        $filepath = "tmp/aasx/".$aasID."/".$aasID.".aas.xml";
        $file = Mtownsend\XmlToArray\XmlToArray::convert(file_get_contents($filepath));


        //write file to db
        //shells
        $shells = $file['aas:assetAdministrationShells']['aas:assetAdministrationShell'];
        $shellIds = writeDB("Shells", $shells);

        $assets = $file['aas:assets']['aas:asset'];
        $assetIds = writeDB("Assets", $assets);

        $submodels = $file['aas:submodels']['aas:submodel'];
        $submodelIds = array();
        foreach ($submodels as $submodel){
            $submodelIds[] = writeDB("Submodels", $submodel);
        }

        $conceptDescriptions = $file['aas:conceptDescriptions']['aas:conceptDescription'];
        $conceptDescriptionIds = array();
        foreach ($conceptDescriptions as $conceptDescription){
            $conceptDescriptionIds[] = writeDB("Concept Description", $conceptDescription);
        }
        break;

    default:
        http_response_code(400);        //TODO alternativ 501 'Not implemented'
        print ("Unsupported HTML Request Method");
}