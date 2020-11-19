<?php

switch ($this->job) {
    case 'getvideos':
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT id, title, thumbnail, published, creation_date FROM #__tssvideo_videos";

        $db->setQuery($query);
        $result = $db->loadAssocList();

        $response = json_encode(
            array("result" => "SUCCESS",
                "videos" => $result,
                "code" => 200)
        );
        echo $response;
        break;

    case 'getvideo':
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT id, youtube_id, title, short_desc, long_desc, thumbnail, creation_date, published FROM #__tssvideo_videos
                    WHERE id=" . $db->quote($this->id);

        $db->setQuery($query);
        $videoDetails = $db->loadAssoc();

        $query = "SELECT t.tag_name FROM #__tssvideo_videotags vt
                    JOIN #__tssvideo_tags t ON vt.tag_id = t.id
                    WHERE video_id=" . $db->quote($this->id);

        $db->setQuery($query);
        $tagList = $db->loadColumn();

        $query = "SELECT c.category_name FROM #__tssvideo_videocategories vc
                    JOIN #__tssvideo_categories c ON vc.category_id = c.id
                    WHERE video_id=" . $db->quote($this->id);

        $db->setQuery($query);
        $categoryList = $db->loadColumn();

        $response = json_encode(
            array("result" => "SUCCESS",
                "id" => $this->id,
                "video" => $videoDetails,
                "tags" => $tagList,
                "categories" => $categoryList,
                "code" => 200)
        );
        echo $response;
        break;

    case 'editvideo':
        $db = JFactory::getDbo();
        try {

            $db->transactionStart();
            $query = $db->getQuery(true);

            // Delete the current tags

            $conditions = array(
                $db->quoteName('video_id') . ' = ' . $db->quote($this->id),
            );

            $query->delete($db->quoteName('#__tssvideo_videotags'));
            $query->where($conditions);
            $db->setQuery($query);
            $result = $db->execute();

            // Add the new tags
            $query = $db->getQuery(true);
            $query->clear();

            $tagList = explode(",", $this->tags);
            foreach ($tagList as $tag) {
                $query = "INSERT INTO #__tssvideo_videotags (video_id, tag_id)
                            VALUES (" . $db->quote($this->id) . ", " . $db->quote($tag) . ")";
                $db->setQuery($query);
                $db->query();
            }

            // Delete the current categories

            $query = $db->getQuery(true);
            $query->clear();

            $query->delete($db->quoteName('#__tssvideo_videocategories'));
            $query->where($conditions);
            $db->setQuery($query);
            $result = $db->execute();

            $query = $db->getQuery(true);
            $query->clear();

            // Add the new categories
            $query = $db->getQuery(true);
            $query->clear();

            $categoryList = explode(",", $this->categories);
            foreach ($categoryList as $category) {
                $query = "INSERT INTO #__tssvideo_videocategories (video_id, category_id)
                            VALUES (" . $db->quote($this->id) . ", " . $db->quote($category) . ")";
                $db->setQuery($query);
                $db->query();
            }

            // Modify the video details in the videos table

            $query = $db->getQuery(true);
            $query->clear();

            $fields = array(
                $db->quoteName('title') . ' = ' . $db->quote($this->title),
                $db->quoteName('creation_date') . ' = ' . $db->quote($this->creationdate),
                $db->quoteName('short_desc') . ' = ' . $db->quote($this->sdesc),
                $db->quoteName('long_desc') . ' = ' . $db->quote($this->ldesc),
                $db->quoteName('published') . ' = ' . $db->quote($this->published),
            );

            $conditions = array(
                $db->quoteName('id') . ' = ' . $db->quote($this->id),
            );

            $query->update($db->quoteName('#__tssvideo_videos'))->set($fields)->where($conditions);

            $db->setQuery($query);

            $result = $db->execute();

            // Commit the transactions
            $db->transactionCommit();

            $response = json_encode(
                array("result" => "SUCCESS",
                    "id" => $this->id,
                    "title" => $this->title,
                    "creationdate" => $this->creationdate,
                    "taglist" => $this->tags,
                    "categorylist" => $this->categories,
                    "shorddescription" => $this->sdesc,
                    "longdescription" => $this->ldesc,
                    "published" => $this->published,
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
        break;

    case 'deletevideo':

        $db = JFactory::getDbo();
        try {

            $db->transactionStart();
            $query = $db->getQuery(true);

            $conditions = array(
                $db->quoteName('video_id') . ' = ' . $db->quote($this->id),
            );

            $query->delete($db->quoteName('#__tssvideo_videotags'));
            $query->where($conditions);
            $db->setQuery($query);
            $result = $db->execute();

            $query = $db->getQuery(true);
            $query->clear();

            $query->delete($db->quoteName('#__tssvideo_videocategories'));
            $query->where($conditions);
            $db->setQuery($query);
            $result = $db->execute();

            $query = $db->getQuery(true);
            $query->clear();
            $conditions = array(
                $db->quoteName('id') . ' = ' . $db->quote($this->id),
            );

            $query->delete($db->quoteName('#__tssvideo_videos'));
            $query->where($conditions);
            $db->setQuery($query);
            $result = $db->execute();

            $db->transactionCommit();

            $response = json_encode(
                array("result" => "SUCCESS",
                    "data" => "Video deleted",
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

        break;

    case 'doesexist':

        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT * FROM #__tssvideo_videos
                WHERE youtube_id=" . $db->quote($this->yid);

        $db->setQuery($query);
        $db->query();
        $numberOfResults = $db->getNumRows();

        if ($numberOfResults > 0) {
            $result = "YES";
        } else {
            $result = "NO";
        }

        $response = json_encode(
            array("result" => "SUCCESS",
                "youtube_id" => $this->yid,
                "data" => $result,
                "code" => 200)
        );

        echo $response;
        break;

    case 'setpublished':
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $fields = array(
            $db->quoteName('published') . ' = ' . $db->quote($this->published),
        );

        $conditions = array(
            $db->quoteName('id') . ' = ' . $db->quote($this->id),
        );

        $query->update($db->quoteName('#__tssvideo_videos'))->set($fields)->where($conditions);

        $db->setQuery($query);

        $result = $db->execute();
        $response = json_encode(
            array("result" => "SUCCESS",
                "data" => "Published",
                "code" => 200)
        );
        echo $response;
        break;

    default:
        $response = json_encode(
            array("result" => "SUCCESS",
                "data" => "No action was performed",
                "code" => 200)
        );
        echo $response;
        break;
}
