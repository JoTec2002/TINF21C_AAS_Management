<?php
//requirement: clean MongoDB
require_once "DBController.php";
function getAPIData($url){
    $ApiServer = "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/".$url;
    $curlH = curl_init($ApiServer);
    curl_setopt($curlH, CURLOPT_RETURNTRANSFER, true);
    return curl_exec($curlH);

}
print_r(getAPIData("submodels"));