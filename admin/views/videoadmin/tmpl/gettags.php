<?php

$db = JFactory::getDbo();
$query = $db->getQuery(true);

$query = "SELECT tag_name FROM #__tssvideo_tags
            ORDER BY tag_name";
$db->setQuery($query);
$result = $db->loadColumn();

$response = json_encode(
    array("result" => "SUCCESS",
        "tags" => $result,
        "code" => 200)
);

echo $response;
