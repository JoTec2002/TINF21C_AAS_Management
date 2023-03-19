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
            print json_encode(GetAllSubmodels(), JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
            http_response_code(200);
            break;
        }else{

        }
        break;

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
