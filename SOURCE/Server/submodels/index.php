<?php
//API for all requests starting with /submodels
require_once '../DBController.php';
require_once '../globalFunktions.php';
//Detect Request method
$request = basename($_SERVER['REQUEST_URI']);
switch ($_SERVER['REQUEST_METHOD']){
    case "GET":
        //Handeles all GET API calls
        //get Type of GET request
        if($request == "submodels"){
            //Get ALL request
            print_r("Test");
            print json_encode(GetAllSubmodels(), JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
            http_response_code(200);
            break;
        }else {
            if (isset($_GET["idShort"])) {
                $idShort = $_GET["idShort"];
                print json_encode(GetAllSubmodelsByIdShort($idShort), JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES);
                http_response_code(200);
                break;
            }
        }


    case "POST":
        break;

    case "PUT":

        break;

    case "DELETE":

        break;

    default:
        http_response_code(501);
        exit();
}
