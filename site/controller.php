<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_tssvideo
 *
 * @copyright   Copyright (C) 2019 TSS All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access to this file
defined('_JEXEC') or die('Restricted access');

/**
 * General Controller of GeneratedCoupons component
 *
 * @package     Joomla.Administrator
 * @subpackage  com_tssvideo
 * @since       0.0.7
 */
class TSSVideoController extends JControllerLegacy
{

    /**
     * The default view for the display method.
     *
     * @var string
     * @since 12.2
     */
    protected $default_view = 'videosite';

    // Layouts

    public function display()
    {
        $view = $this->getView('videosite', 'html');
        $model = $this->getModel('Videosite');
        $view->setModel($model, true);
        $view->setLayout('default');
        $view->catID = JRequest::getVar('catid');
        $view->tagID = JRequest::getVar('tagid');
        $view->catName = JRequest::getVar('catname');
        $view->tagName = JRequest::getVar('tagname');
        $view->display();
    }

    public function video()
    {
        $view = $this->getView('videosite', 'html');
        $view->id = JRequest::getVar('id');
        $model = $this->getModel('Videosite');
        $view->setModel($model, true);
        $view->setLayout('video');
        $view->display();
    }

    public function getall()
    {
        $view = $this->getView('videosite', 'json');
        $model = $this->getModel('Videosite');
        $view->setModel($model, true);
        $view->setLayout('getall');
        $view->display();
    }

}
