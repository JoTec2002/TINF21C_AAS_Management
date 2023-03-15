<?php
//API for all requests starting with /shell
require_once '../DBController.php';
require_once '../globalFunktions.php';
//Detect Request method
$request = basename($_SERVER['REQUEST_URI']);
switch ($_SERVER['REQUEST_METHOD']){
    case "GET":
        //Handeles all GET API calls
        //get Type of GET request
        if($request == "shells"){
            //Get ALL request
            print json_encode(GetAllShells(), JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
            http_response_code(200);
            break;
        }else{
            //Spezilised GET request
            //option2: get by Shortid
            //option3: get by ByAssetId
            //option1: get by Id
            if(isset($_GET["idShort"])){
                $idShort = $_GET["idShort"];
                print json_encode(GetAllShellsByIdShort($idShort), JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
                http_response_code(200);
            }elseif (isset($_GET["assetIds"])){
                $assetIds = $_GET['assetIds'];
                print json_encode(GetAllShellsByAssetId($assetIds), JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
                http_response_code(200);
            }elseif (in_array("/".$request, array_keys($_GET))){
                $id = base64url_decode($request);
                print json_encode(GetAllShellsById($id), JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
                http_response_code(200);
            }else{
                //longer url request start specific request
                $longRequest = explode("/",$_SERVER['REQUEST_URI']);
                if($longRequest[3] == "asset-information"){
                    // /shells/{assetid}/asset-information
                    print json_encode(GetShellsAssetInfById(base64url_decode($longRequest[2])), JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
                    http_response_code(200);
                }elseif ($longRequest[3] == "submodels"){
                    if(!isset($longRequest[4])){
                        // /shells/{aasIdentifier}/submodels
                        print json_encode(GetShellsSubmodelsById(base64url_decode($longRequest[2])), JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
                        http_response_code(200);
                    }elseif (!isset($longRequest[6])){
                        // /shells/{aasIdentifier}/submodels/{submodelIdentifier}/submodel
                        //TODO continue when submodel funktions are present
                    }
                }

                print_r($longRequest);




                /*echo json_encode(["error" => "Specific Get Request not recognized"], JSON_NUMERIC_CHECK);
                http_response_code(400);*/
            }
        }
        break;

    case "POST":
        $Data = json_decode($_POST['aas']);
        createShell($Data);
        http_response_code(201);
        break;

    case "PUT":
        $requestBody = explode("=", urldecode(file_get_contents( 'php://input', 'r' )));
        if(count($requestBody) != 2){       //Error catching
            echo json_encode(["error" => "Unrecognized Request Body"], JSON_NUMERIC_CHECK);
            http_response_code(400);
            exit();
        }
        $requestData = json_decode($requestBody[1]);
        $requestId = base64url_decode($request);
        updateShell($requestId, $requestData);
        http_response_code(204);
        break;

    case "DELETE":
        $id = base64url_decode($request);
        deleteShell($id);
        http_response_code(200);
        break;

    default:
        http_response_code(400);
        exit();
}
