<?php
//Disable API
http_response_code(501);
exit;

require_once '../DBController.php';
require_once '../globalFunktions.php';
//AASX FileServerApi
//Detect Request method
switch ($_SERVER['REQUEST_METHOD']){
    case "DELETE":
        $requestId = basename($_SERVER['REQUEST_URI']);
        $requestId = base64url_decode($requestId);          //Asset _id
        //get asset identification
        $assetIdent = getAssetIdentification($requestId);

        //get Shell ID from AssetRef
        $ShellID = getShellIdFromAsset($assetIdent);

        //delete Shell and all Dependencies
        deleteShell($ShellID);
        http_response_code(200);
        exit;

    case "GET":
        $request = basename($_SERVER['REQUEST_URI']);
        //select between general and specific Get request
        if($request == "packages"){
            //general request
            $DBresults = readDB("Shells", array(), ["projection" => ["id"=>1]]);
            $result = array();
            foreach ($DBresults as $DBresult){
                $result[] = array("aasIds"=>array($DBresult['aas:identification']['@content']), "packageId"=>$DBresult['_id']);
            }
            print json_encode($result, JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
            http_response_code(200);

        }else{
            $request = base64url_decode($request);
            $DBresult = readDB("Shells", ['_id' => new MongoDB\BSON\ObjectId('63eb54a0f7553852f90e927f')], array());

            //TODO generate .assx file

        }
        break;

    case "PUT":
        //Check if request is ok
        /*$request = file_get_contents( 'php://input', 'r' );
        print_r($request);


        rrmdir("tmp");*/
        // TODO PUT request
        http_response_code(501);
        exit;
        break;

    case "POST":
        require_once "templates.php";
        //Check if request is ok
        if ($_FILES == array()){
            print json_encode(["error" => "No aasx file given"], JSON_NUMERIC_CHECK);
            http_response_code(400);
            exit;
        }
        //TODO extended Checks for $_POST

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
        $aasID = preg_replace("/[^a-z 0-9]/", "_", $_POST['aasIds']);

        //read xml file
        $filepath = "tmp/aasx/".$aasID."/".$aasID.".aas.xml";
        $file = Mtownsend\XmlToArray\XmlToArray::convert(file_get_contents($filepath));

        //write file to db
        //shells
        $shells = $file['aas:assetAdministrationShells']['aas:assetAdministrationShell'];
        $shells = convertJsonAssetShell($shells);
        //print_r($shells);
        //$shellIds = writeDB("Shells", $shells);

        $assets = $file['aas:assets']['aas:asset'];
        //$assetIds = writeDB("Assets", $assets);

        $submodels = $file['aas:submodels']['aas:submodel'];
        $submodelIds = array();
        /*foreach ($submodels as $submodel){
            $submodelIds[] = writeDB("Submodels", $submodel);
        }*/

        $conceptDescriptions = $file['aas:conceptDescriptions']['aas:conceptDescription'];
        $conceptDescriptionIds = array();
        /*foreach ($conceptDescriptions as $conceptDescription){
            $conceptDescriptionIds[] = writeDB("Concept Description", $conceptDescription);
        }*/
        //cleanup + status code
        //rrmdir("tmp");
        http_response_code(200);
        exit;

    default:
        http_response_code(400);
        print ("Unsupported HTML Request Method");
}