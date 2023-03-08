<?php
require_once '../DBController.php';
require_once '../globalFunktions.php';
//AASX FileServerApi
//Detect Request method
switch ($_SERVER['REQUEST_METHOD']){
    case "POST":
        http_response_code(501);
        exit;

    case "PUT":
        http_response_code(501);
        exit;

    case "GET":
        //Handeles all GET /concept-description... API calls

        //get Type of GET request
        $request = basename($_SERVER['REQUEST_URI']);
        if($request == "concept-descriptions"){
            //Get ALL request
            print json_encode(getAllConceptDescriptions(), JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
            http_response_code(200);
        }else{
            //Spezilised GET request
            //option2: get by Shortid
            //option3: get by IsCaseOf
            //option4: get by dataSpecificationRef
            //option1: get by Id
            if(isset($_GET["idShort"])){
                $idShort = $_GET["idShort"];
                print json_encode(GetAllConceptDescriptionsByIdShort($idShort), JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
                http_response_code(200);
            }elseif ($_GET["isCaseOf"]){
                print "isCaseOf";
                http_response_code(501);
                //TODO do when example found
            }elseif ($_GET["dataSpecificationRef"]){
                print "dataSpecificationRef";

            }
            //print_r($_GET);




        }
        http_response_code(501);
        exit;

    case "DELETE":
        http_response_code(501);
        exit;

    default:
        http_response_code(400);
        print ("Unsupported HTML Request Method");
}