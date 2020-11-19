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
    protected $default_view = 'videoadmin';

    // Layouts

    public function display($cachable = false, $urlparams = array())
    {
        $view = $this->getView('videoadmin', 'html');
        $view->setLayout('videos');
        $view->display();

    }

    public function video()
    {
        $view = $this->getView('videoadmin', 'html');
        $view->setLayout('video');
        $view->id = JRequest::getVar('id');
        $view->display();
    }

    public function newvideo()
    {
        $view = $this->getView('videoadmin', 'html');
        $view->setLayout('newvideo');
        $view->display();
    }

    public function tags()
    {
        $view = $this->getView('videoadmin', 'html');
        $view->setLayout('tags');
        $view->display();
    }

    public function categories()
    {
        $view = $this->getView('videoadmin', 'html');
        $view->setLayout('categories');
        $view->display();
    }

    // APIs

    public function createvideo()
    {
        $view = $this->getView('videoadmin', 'json');
        $view->setLayout('createvideo');
        $view->yid = JRequest::getVar('yid');
        $view->title = JRequest::getVar('title');
        $view->imagesource = JRequest::getVar('imagesource');
        $view->tags = JRequest::getVar('tags');
        $view->categories = JRequest::getVar('categories');
        $view->sdesc = JRequest::getVar('sdesc');
        $view->ldesc = JRequest::getVar('ldesc', '', 'post', 'STRING', JREQUEST_ALLOWRAW);
        $view->display();
    }

    public function managevideos()
    {
        $view = $this->getView('videoadmin', 'json');
        $view->setLayout('managevideos');
        $view->job = JRequest::getVar('job');
        $view->id = JRequest::getVar('id');
        $view->published = JRequest::getVar('published');
        $view->yid = JRequest::getVar('yid');
        $view->title = JRequest::getVar('title');
        $view->creationdate = JRequest::getVar('creationdate');
        $view->imagesource = JRequest::getVar('imagesource');
        $view->tags = JRequest::getVar('tags');
        $view->categories = JRequest::getVar('categories');
        $view->sdesc = JRequest::getVar('sdesc');
        $view->ldesc = JRequest::getVar('ldesc', '', 'post', 'STRING', JREQUEST_ALLOWRAW);
        $view->display();
    }

    public function gettags()
    {
        $view = $this->getView('videoadmin', 'json');
        $view->setLayout('gettags');
        $view->display();
    }

    public function managetags()
    {
        $view = $this->getView('videoadmin', 'json');
        $view->setLayout('managetags');
        $view->job = JRequest::getVar('job');
        $view->tags = JRequest::getVar('tags');
        $view->newtagname = JRequest::getVar('newtagname');
        $view->tagname_to_delete = JRequest::getVar('tagnametodelete');
        $view->oldvalue = JRequest::getVar('oldvalue');
        $view->newvalue = JRequest::getVar('newvalue');
        $view->display();
    }

    public function managecategories()
    {
        $view = $this->getView('videoadmin', 'json');
        $view->setLayout('managecategories');
        $view->job = JRequest::getVar('job');
        $view->categoryname = JRequest::getVar('categoryname');
        $view->categories = JRequest::getVar('categories');
        $view->newcategoryname = JRequest::getVar('newcategoryname');
        $view->category_to_delete = JRequest::getVar('categorytodelete');
        $view->oldvalue = JRequest::getVar('oldvalue');
        $view->newvalue = JRequest::getVar('newvalue');
        $view->display();
    }

    public function gettagids()
    {
        $view = $this->getView('videoadmin', 'json');
        $view->setLayout('gettagids');
        $view->data = JRequest::getVar('data');
        $view->display();
    }

}
