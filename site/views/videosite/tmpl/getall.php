<?php

$response = json_encode(
    array("result" => "SUCCESS",
        "videos" => json_encode($this->videoList),
        "code" => 200)
);

echo $response;
