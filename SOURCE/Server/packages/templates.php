<?php
$shellsemplate = json_decode('{
    "assetAdministrationShells": [
      {
        "administration": {},
        "assetInformation": {
          "assetKind": ""
        },
        "category": "",
        "checksum": "",
        "derivedFrom": {
          "keys": [
            {
              "type": "",
              "value": ""
            }
          ],
          "type": ""
        },
        "description": [
          {
            "language": "",
            "text": ""
          }
        ],
        "displayName": [
          {
            "language": "",
            "text": ""
          }
        ],
        "embeddedDataSpecifications": [
          {
            "dataSpecification": {
              "keys": [
                {
                  "type": "",
                  "value": ""
                }
              ],
              "type": ""
            },
            "dataSpecificationContent": {
              "definition": [
                {
                  "language": "",
                  "text": ""
                }
              ],
              "modelType": "",
              "unitName": "",
              "unitSymbol": ""
            }
          }
        ],
        "extensions": [
          {
            "name": "",
            "valueType": ""
          }
        ],
        "id": "",
        "idShort": "",
        "modelType": "",
        "submodels": [
          {
            "keys": [
              {
                "type": "",
                "value": ""
              }
            ],
            "type": ""
          }
        ]
      }
    ]
  }',true);
$shellsemplate = $shellsemplate['assetAdministrationShells'][0];

function convertJsonAssetShell($importJson){
    global $shellsemplate;
    $exportJson = $shellsemplate;

    //Basic values transform
    $exportJson['idShort'] = $importJson["aas:idShort"];
    $exportJson['id'] = $importJson["aas:identification"]["@content"];
    $exportJson['category'] = $importJson["aas:category"];


    print_r(array_keys($shellsemplate));

}

//print_r($assetTemplate);
