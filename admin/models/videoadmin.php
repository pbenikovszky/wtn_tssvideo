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

// jimport('joomla.application.component.model');

/**
 * Generate Coupons Model
 *
 * @since  0.0.1
 */
class TSSVideoModelVideoadmin extends JModelList
{

    public function getTags()
    {

        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT tag_name FROM #__tssvideo_tags
                    ORDER BY tag_name";
        $db->setQuery($query);
        $result = $db->loadColumn();
        return $result;

    }

    public function getCategories()
    {

        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT category_name FROM #__tssvideo_categories";
        $db->setQuery($query);
        $result = $db->loadColumn();
        return $result;

    }

    public function getMessage()
    {
        return "Teszt message";
    }

    protected function getListQuery()
    {
        // Initialize variables.
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        // Create the base select statement.
        $query->select('*')
            ->from($db->quoteName('#__helloworld'));

        return $query;
    }
}
