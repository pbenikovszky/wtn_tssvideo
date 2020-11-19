<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_generatedcoupons
 *
 * @copyright   Copyright (C) 2019 TSS, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
// No direct access to this file
defined('_JEXEC') or die('Restricted access');

// import Joomla modelitem library
jimport('joomla.application.component.modelitem');

/**
 * Generate Coupons Model
 *
 * @since  0.0.1
 */
class TSSVideoModelVideosite extends JModelItem
{

    public function getTags()
    {
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT vt.tag_id as tagid, count(tag_id) as tagcount, t.tag_name as tagname
                    FROM #__tssvideo_videotags vt
                    LEFT OUTER JOIN #__tssvideo_tags t on t.id=vt.tag_id
                    LEFT OUTER JOIN #__tssvideo_videos v on vt.video_id=v.id
                    WHERE v.published = 1
                    GROUP BY vt.tag_id
                    ORDER BY count(tag_id) DESC, t.tag_name
                    LIMIT 30";

        $db->setQuery($query);
        $result = $db->loadObjectList();
        return $result;
    }

    public function getCategories()
    {
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT vc.category_id as categoryid, c.category_name as categoryname, count(c.category_name) as categorycount
                    FROM #__tssvideo_videocategories vc
                    LEFT OUTER JOIN #__tssvideo_categories c on c.id=vc.category_id
                    LEFT OUTER JOIN #__tssvideo_videos v on vc.video_id=v.id
                    WHERE v.published = 1
                    GROUP BY vc.category_id
                    ORDER BY count(c.category_name) DESC, c.category_name";

        $db->setQuery($query);
        $result = $db->loadObjectList();
        return $result;
    }

    public function getVideos()
    {
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT * FROM #__tssvideo_videos
                    WHERE published=1
                    ORDER BY creation_date ASC
                    LIMIT 9";

        $db->setQuery($query);
        $result = $db->loadObjectList();

        foreach ($result as $line) {

            $query = "SELECT category_id FROM #__tssvideo_videocategories
                        WHERE video_id=" . $db->quote($line->id);

            $db->setQuery($query);
            $line->categories = $db->loadColumn();

            $query = "SELECT tag_id FROM #__tssvideo_videotags
                        WHERE video_id=" . $db->quote($line->id);

            $db->setQuery($query);
            $line->tags = $db->loadColumn();

        }

        return $result;
    }

    public function getAllVideos()
    {
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT * FROM #__tssvideo_videos
                    WHERE published=1
                    ORDER BY creation_date DESC";

        $db->setQuery($query);
        $result = $db->loadObjectList();

        foreach ($result as $line) {

            $query = "SELECT category_id FROM #__tssvideo_videocategories
                        WHERE video_id=" . $db->quote($line->id);

            $db->setQuery($query);
            $line->categories = $db->loadColumn();

            $query = "SELECT tag_id FROM #__tssvideo_videotags
                        WHERE video_id=" . $db->quote($line->id);

            $db->setQuery($query);
            $line->tags = $db->loadColumn();

        }

        return $result;
    }

    public function getVideoCount()
    {
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT COUNT(*) FROM #__tssvideo_videos WHERE published=1";

        $db->setQuery($query);
        $result = $db->loadResult();
        return $result;
    }

    public function getVideoByID($video_id)
    {
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT * FROM #__tssvideo_videos
                    WHERE id=" . $db->quote($video_id);

        $db->setQuery($query);
        $result = $db->loadObject();

        $query = "SELECT t.id as id, t.tag_name as tagname FROM #__tssvideo_videotags vt
                    JOIN #__tssvideo_tags t ON vt.tag_id = t.id
                    WHERE video_id=" . $db->quote($video_id);

        $db->setQuery($query);
        $result->tags = $db->loadObjectList();

        $query = "SELECT c.id as id, c.category_name as categoryname FROM #__tssvideo_videocategories vc
                    JOIN #__tssvideo_categories c ON vc.category_id = c.id
                    WHERE video_id=" . $db->quote($video_id);

        $db->setQuery($query);
        $result->categories = $db->loadObjectList();

        return $result;
    }

    // public function getVideoTags($video_id)
    // {
    //     $db = JFactory::getDbo();
    //     $query = $db->getQuery(true);

    //     $query = "SELECT * FROM #__tssvideo_videos
    //                 WHERE id=" . $db->quote($video_id);

    //     $db->setQuery($query);
    //     $result = $db->loadObjectList();

    //     $query = "SELECT t.tag_name FROM #__tssvideo_videotags vt
    //                 JOIN #__tssvideo_tags t ON vt.tag_id = t.id
    //                 WHERE video_id=" . $db->quote($video_id);

    //     $db->setQuery($query);
    //     $result->tags = $db->loadColumn();

    //     $query = "SELECT c.category_name FROM #__tssvideo_videocategories vc
    //                 JOIN #__tssvideo_categories c ON vc.category_id = c.id
    //                 WHERE video_id=" . $db->quote($video_id);

    //     $db->setQuery($query);
    //     $result->categories = $db->loadColumn();

    //     return $result;
    // }

    // public function getVideoCategories($video_id)
    // {

    // }

    public function getSimilarVideos($video_id)
    {
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT video_id FROM #__tssvideo_videocategories
                    WHERE category_id IN
                    (SELECT category_id FROM #__tssvideo_videocategories WHERE video_id=" . $db->quote($video_id)
        . ") AND video_id !=" . $db->quote($video_id);

        $db->setQuery($query);

        $result = $db->loadObjectList();

        foreach ($result as $line) {

            $query = "SELECT title, thumbnail FROM #__tssvideo_videos
                        WHERE id=" . $db->quote($line->video_id);

            $db->setQuery($query);
            $videoDetails = $db->loadObject();
            $line->title = $videoDetails->title;
            $line->thumbnail = $videoDetails->thumbnail;

        }

        return $result;
    }

}
