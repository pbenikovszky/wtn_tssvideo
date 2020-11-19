<?php

$response = json_encode(
    array("result" => "SUCCESS",
        "tags" => array(1, 2, 3, 4, 5),
        "code" => 200)
);

echo $response;
