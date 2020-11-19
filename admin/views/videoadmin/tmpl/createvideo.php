<?php

$db = JFactory::getDbo();

try {

    $db->transactionStart();

    $query = $db->getQuery(true);

    $query = "INSERT INTO #__tssvideo_videos (youtube_id, title, short_desc, long_desc, thumbnail, published)
                    VALUES (" . $db->quote($this->yid) . ",
                            " . $db->quote($this->title) . ",
                            " . $db->quote($this->sdesc) . ",
                            " . $db->quote($this->ldesc) . ",
                            " . $db->quote($this->imagesource) . ", 1)";

    $db->setQuery($query);
    $db->query();
    $newVideoID = $db->insertid();

    $tagList = explode(",", $this->tags);
    foreach ($tagList as $tag) {
        $query = "INSERT INTO #__tssvideo_videotags (video_id, tag_id)
                    VALUES (" . $db->quote($newVideoID) . ", " . $db->quote($tag) . ")";
        $db->setQuery($query);
        $db->query();
    }

    $categoryList = explode(",", $this->categories);
    foreach ($categoryList as $category) {
        $query = "INSERT INTO #__tssvideo_videocategories (video_id, category_id)
                    VALUES (" . $db->quote($newVideoID) . ", " . $db->quote($category) . ")";
        $db->setQuery($query);
        $db->query();
    }

    $db->transactionCommit();

    $response = json_encode(
        array("result" => "SUCCESS",
            "yid" => $this->yid,
            "title" => $this->title,
            "image" => $this->imagesource,
            "taglist" => $this->tags,
            "categorylist" => $this->categories,
            "shorddescription" => $this->sdesc,
            "longdescription" => $this->ldesc,
            "code" => 200)
    );

    echo $response;

} catch (Exception $e) {
    $db->transactionRollback();
    $response = json_encode(
        array("result" => "FAIL",
            "reason" => $e->getMessage(),
            "code" => 500)
    );

    echo $response;
}
