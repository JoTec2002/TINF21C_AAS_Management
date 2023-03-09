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
            }elseif (isset($_GET["AssetId"])){
                $isCaseOf = $_GET['AssetId'];
                print json_encode(GetAllShellsByAssetId($isCaseOf), JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
                http_response_code(200);
            }elseif (in_array("/".$request, array_keys($_GET))){
                $id = base64url_decode($request);
                print json_encode(GetAllShellsById($id), JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
                http_response_code(200);
            }else{
                echo json_encode(["error" => "Specific Get Request not recognized"], JSON_NUMERIC_CHECK);
                http_response_code(400);
            }
        }
        break;

    case "POST":
        http_response_code(501);
        exit();
        break;

    case "PUT":
        http_response_code(501);
        exit();
        break;

    case "DELETE":
        http_response_code(501);
        exit();
        break;

    default:
        http_response_code(400);
        exit();
}
