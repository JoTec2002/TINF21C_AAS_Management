<?php
require_once "packages/functions.php";
require_once "shells/functions.php";
require_once "submodels/functions.php";
require_once "concept-descriptions/functions.php";

function rrmdir($dir) {
    if (is_dir($dir)) {
        $objects = scandir($dir);
        foreach ($objects as $object) {
            if ($object != "." && $object != "..") {
                if (filetype($dir."/".$object) == "dir") rrmdir($dir."/".$object); else unlink($dir."/".$object);
            }
        }
        reset($objects);
        rmdir($dir);
    }
}
function base64url_decode($data, $strict = false)
{
    // Convert Base64URL to Base64 by replacing “-” with “+” and “_” with “/”
    $b64 = strtr($data, '-_', '+/');

    // Decode Base64 string and return the original data
    return base64_decode($b64, $strict);
}
function removeIDfromResult(&$item, $key){
    unset($item['_id']);
}
