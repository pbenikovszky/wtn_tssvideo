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

$document = JFactory::getDocument();

// Add CSS
$document->addStyleSheet("components/com_tssvideo/assets/css/tssvideo.css");
$document->addStyleSheet("components/com_tssvideo/assets/css/tssvideo_video.css");

?>

<div class="tss-page-container">

<div class="tss-sidebar">
        <div class="tss-sidebar-wrapper">
            <div class="tss-sidebar-header">
                <h2>Videók</h2>
            </div>
            <div class="menu-buttons">
                <div class="tssmenu-btn tss-menu-selectable" id="btn-videos"><span>Videók kezelése</span></div>
                <div class="tssmenu-btn tss-menu-selectable" id="btn-new-video"><span>Új videó</span></div>
                <div class="tssmenu-btn tss-menu-selectable" id="btn-manage-tags"><span>Címkék kezelése</span></div>
                <div class="tssmenu-btn tss-menu-selectable" id="btn-manage-categories"><span>Kategóriák kezelése</span></div>
            </div>
        </div>
    </div>

<div class="tss-new-video-container" data-item="<?php echo $this->id; ?>">

        <h2>Videó szerkesztése</h2>
        <div class="tss-newvideo-row">
            <span class="tss-newvideo-label">YouTube ID</span>
            <input class="tss-input-textfield" id="youtube_id" type="text" disabled>
        </div>

        <div class="tss-newvideo-row">
            <span class="tss-newvideo-label">Közzétéve</span>
            <div class="tss-checkbox" id="is-published-checkbox">
                <div class="tss-inner-checkbox" id="checkbox-inner-field"></div>
            </div>
        </div>

        <div class="tss-newvideo-row">
            <span class="tss-newvideo-label">Videó címe</span>
            <input class="tss-input-textfield" id="video_title" type="text" placeholder="Videó címe">
        </div>

        <div class="tss-newvideo-row">
            <span class="tss-newvideo-label"><?php echo JText::_('COM_TSSVIDEO_VIDEO_CREATED_ON'); ?></span>
            <input class="tss-input-textfield" id="creation_date" type="text">
        </div>

        <div class="tss-newvideo-row">
            <span class="tss-newvideo-label">Előnézet</span>
            <img id = "video_thumbnail" src="https://via.placeholder.com/320x180.png?text=320+X+180" alt="Video thumbnail" height="180" width="320">
        </div>

        <div class="tss-newvideo-row">
            <span class="tss-newvideo-label">Kategória</span>
            <input class="tss-input-textfield" id="video_category" type="text" placeholder="Írd be a kategóriát, majd nyomj entert">
            <ul class="autocomplete-categories-list" id="autocomplete-categories-result">
            </ul>
        </div>
        <div class="category-wrapper"></div>

        <div class="tss-newvideo-row">
            <span class="tss-newvideo-label">Címkék</span>
            <div class="tag-wrapper">
                <div class="tag-container">
                    <input id="tag-input" autocomplete="off"/>
                </div>
                <ul class="autocomplete-tags-list" id="autocomplete-tags-result">
                </ul>
            </div>
        </div>

        <div class="tss-newvideo-row">
            <span class="tss-newvideo-label">Rövid leírás</span>
            <textarea class="tss-input-textarea short-area" id="short_description"></textarea>
        </div>

        <div class="tss-newvideo-row">
            <span class="tss-newvideo-label">Videó tartalma</span>
            <?php
// IMPORT EDITOR CLASS
jimport('joomla.html.editor');

// GET EDITOR SELECTED IN GLOBAL SETTINGS
$config = JFactory::getConfig();
$global_editor = $config->get('editor');

// GET USER'S DEFAULT EDITOR
$user_editor = JFactory::getUser()->getParam("editor");

if ($user_editor && $user_editor !== 'JEditor') {
    $selected_editor = $user_editor;
} else {
    $selected_editor = $global_editor;
}

// INSTANTIATE THE EDITOR
$editor = JEditor::getInstance($selected_editor);

// SET EDITOR PARAMS
$params = array('smilies' => '0',
    'style' => '1',
    'layer' => '0',
    'table' => '0',
    'clear_entities' => '0',
);

// DISPLAY THE EDITOR (name, html, width, height, columns, rows, bottom buttons, id, asset, author, params)
echo $editor->display('ldescEditor', '', '450', '600', '20', '20', false, null, 'ldescEditor', null, $params);
?>
        </div>

        <div class="tss-newvideo-row">
            <div class="tss-newvideo-button" id="btn-modify"><span>Módosítás</span></div>
            <div class="tss-newvideo-button" id="btn-cancel"><span>Mégse</span></div>
        </div>

    </div>

</div>
<?php

$document = JFactory::getDocument();
$document->addScript("components/com_tssvideo/assets/js/tssvideo_video.js");

?>
