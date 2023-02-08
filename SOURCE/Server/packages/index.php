<?php

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
        print ("POST request \n");
        //Check if request is ok
        if ($_FILES == array()){
            print json_encode(["error" => "No aasx file given"], JSON_NUMERIC_CHECK);
            http_response_code(400);
        }

        // move uploaded file to tmp directory
        /*$target_file = "tmp/" . basename($_FILES["fileName"]["name"]);
        if (!(move_uploaded_file($_FILES["fileName"]["tmp_name"], $target_file))) {
            echo json_encode(["error" => "File could not be moved to tmp directory"], JSON_NUMERIC_CHECK);
            http_response_code(500);
            exit();
        }
        print ($target_file);*/
        //unpack aasx file
        $zip = new ZipArchive;
        if ($zip->open($_FILES['fileName']['tmp_name']) === TRUE) {
            $zip->extractTo('/tmp/');
            $zip->close();
        } else {
            echo json_encode(["error" => "File could not be decompressed"], JSON_NUMERIC_CHECK);
            http_response_code(500);
        }

        //print ("file moved to tmp directory");
        break;

    default:
        http_response_code(400);        //TODO alternativ 501 'Not implemented'
        print ("Unsupported HTML Request Method");
}