<?php
require_once '../globalFunktions.php';
//Detect Request method
$request = basename($_SERVER['REQUEST_URI']);
switch ($_SERVER['REQUEST_METHOD']){
    case "POST":
        $Data = json_decode($_POST['conceptDescription']);
        createConceptDescription($Data);
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
        updateConceptDescription($requestId, $requestData);
        http_response_code(204);
        break;

    case "GET":
        //Handeles all GET /concept-description... API calls
        //get Type of GET request
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
                print json_encode(getAllConceptDescriptionsByIdShort($idShort), JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
                http_response_code(200);
            }elseif (isset($_GET["isCaseOf"])){
                $isCaseOf = $_GET['isCaseOf'];
                print json_encode(getAllConceptDescriptionsByIsCaseOf($isCaseOf), JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
                http_response_code(200);
            }elseif (isset($_GET["dataSpecificationRef"])){
                $dataSpecificationRef = $_GET["dataSpecificationRef"];
                print json_encode(getAllConceptDescriptionsByDataSpecificationReference($dataSpecificationRef), JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
                http_response_code(200);
            }elseif (in_array("/".$request, array_keys($_GET))){
                $id = base64url_decode($request);
                print json_encode(GetConceptDescriptionById($id), JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES);
                http_response_code(200);
            }else{
                echo json_encode(["error" => "Specific Get Request not recognized"], JSON_NUMERIC_CHECK);
                http_response_code(400);
            }
        }
        break;

    case "DELETE":
        $id = base64url_decode($request);
        deleteConceptDescription($id);
        http_response_code(200);
        break;

    default:
        http_response_code(400);
        print ("Unsupported HTML Request Method");
        exit();
}