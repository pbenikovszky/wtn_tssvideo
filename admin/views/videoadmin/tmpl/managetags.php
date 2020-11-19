<?php

switch ($this->job) {
    case 'gettags':
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT t.id, t.tag_name, COUNT(vt.video_id) as videocount
                FROM #__tssvideo_tags t
                LEFT OUTER JOIN #__tssvideo_videotags vt ON vt.tag_id = t.id
                GROUP BY t.id ORDER BY t.tag_name";

        $db->setQuery($query);
        $result = $db->loadAssocList();

        $response = json_encode(
            array("result" => "SUCCESS",
                "tags" => $result,
                "code" => 200)
        );
        break;

    case 'gettagids':

        $tagList = explode(",", $this->tags);
        $result = array();
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        foreach ($tagList as $tag) {

            $query = "SELECT id FROM #__tssvideo_tags
                        WHERE tag_name=" . $db->quote($tag);
            $db->setQuery($query);
            $tag_count = $db->query();
            $tag_count = $db->getNumRows();

            if ($tag_count > 0) {

                $tagid = $db->loadResult();

            } else {

                $query = "INSERT INTO #__tssvideo_tags (tag_name)
                             VALUES (" . $db->quote($tag) . ")";
                $db->setQuery($query);
                $db->query();
                $tagid = $db->insertid();
            }

            array_push($result, $tagid);
        }

        $response = json_encode(
            array("result" => "SUCCESS",
                "tags" => $result,
                "code" => 200)
        );
        break;

    case 'newtag':
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "INSERT INTO #__tssvideo_tags (tag_name)
                        VALUES (" . $db->quote($this->newtagname) . ")";
        $db->setQuery($query);
        $db->query();
        $newTagID = $db->insertid();
        $response = json_encode(
            array("result" => "SUCCESS",
                "newid" => $newTagID,
                "newtagname" => $this->newtagname,
                "code" => 200)
        );
        break;

    case 'deletetag':
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT id from #__tssvideo_tags
                    WHERE tag_name = " . $db->quote($this->tagname_to_delete);

        $db->setQuery($query);
        $tag_id = $db->loadResult();

        // -------------------
        $query = $db->getQuery(true);
        $query->clear();

        $conditions = array(
            $db->quoteName('tag_id') . ' = ' . $db->quote($tag_id),
        );

        $query->delete($db->quoteName('#__tssvideo_videotags'));
        $query->where($conditions);

        $db->setQuery($query);
        $result = $db->execute();

        // -------------------
        $query = $db->getQuery(true);
        $query->clear();

        $conditions = array(
            $db->quoteName('tag_name') . ' = ' . $db->quote($this->tagname_to_delete),
        );

        $query->delete($db->quoteName('#__tssvideo_tags'));
        $query->where($conditions);

        $db->setQuery($query);
        $result = $db->execute();

        if ($result) {
            $response = json_encode(
                array("result" => "SUCCESS",
                    "message" => "Tag deleted",
                    "code" => 200)
            );
        } else {
            $response = json_encode(
                array("result" => "FAIL",
                    "message" => "Tag was not deleted",
                    "code" => 500)
            );
        }
        break;

    case 'updatetag':
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $fields = array(
            $db->quoteName('tag_name') . ' = ' . $db->quote($this->newvalue),
        );

        // Conditions for which records should be updated.
        $conditions = array(
            $db->quoteName('tag_name') . ' = ' . $db->quote($this->oldvalue),
        );

        $query->update($db->quoteName('#__tssvideo_tags'))->set($fields)->where($conditions);
        $db->setQuery($query);
        $result = $db->execute();
        if ($result) {
            $response = json_encode(
                array("result" => "SUCCESS",
                    "message" => "Tag was altered",
                    "code" => 200)
            );
        } else {
            $response = json_encode(
                array("result" => "FAIL",
                    "message" => "Tag was not altered",
                    "code" => 500)
            );
        }

        break;

    default:
        $response = json_encode(
            array("result" => "SUCCESS",
                "data" => "No action was performed",
                "code" => 200)
        );
        break;
}

echo $response;
