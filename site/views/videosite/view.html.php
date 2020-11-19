<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_generatedcoupons
 *
 * @copyright   Copyright (C) 2019 TSS All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access to this file
defined('_JEXEC') or die('Restricted access');

jimport('joomla.application.component.view');

class TSSVideoViewVideosite extends JViewLegacy
{
    public function display($tpl = null)
    {

        // Assign data to the view

        $this->tagList = $this->get('Tags');
        $this->categoryList = $this->get('Categories');
        $this->videoList = $this->get('Videos');
        $this->videoCount = $this->get('VideoCount');

        if (isset($this->catID)) {
            $this->categoryToFilter = $this->catID;
            $this->categoryNameToFilter = $this->catName;
            $this->videoList = $this->get('AllVideos');
        } else {
            $this->categoryToFilter = -1;
            $this->categoryNameToFilter = "NA";
        }

        if (isset($this->tagID)) {
            $this->tagToFilter = $this->tagID;
            $this->tagNameToFilter = $this->tagName;
            $this->videoList = $this->get('AllVideos');
        } else {
            $this->tagToFilter = -1;
            $this->tagNameToFilter = "NA";
        }

        if (isset($this->id)) {
            $this->videoDetails = $this->getModel()->getVideoByID($this->id);
            $this->similarVideoList = $this->getModel()->getSimilarVideos($this->id);
        }

        // Check for errors.
        if (count($errors = $this->get('Errors'))) {
            JLog::add(implode('<br />', $errors), JLog::WARNING, 'jerror');

            return false;
        }

        parent::display($tpl);
    }
}
