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
$document->addStyleSheet("components/com_tssvideo/assets/css/tssvideo_tags.css");
$document->addStyleSheet("components/com_tssvideo/assets/css/tssvideo_modal.css");

?>

<div class="tss-modal-container">
    <div class="tss-modal">
        <input type="text" id="new-value">
        <div class="modal-buttons">
            <div class="tss-modal-button disabled-button" id="btn-save">Mentés</div>
            <div class="tss-modal-button" id="btn-cancel">Mégse</div>
        </div>
    </div>
</div>

<div class="tss-page-container">

    <div class="tss-sidebar">
        <div class="tss-sidebar-wrapper">
            <div class="tss-sidebar-header">
                <h2>Videók</h2>
            </div>
            <div class="menu-buttons">
                <div class="tssmenu-btn tss-menu-selectable" id="btn-videos"><span>Videók kezelése</span></div>
                <div class="tssmenu-btn tss-menu-selectable" id="btn-new-video"><span>Új videó</span></div>
                <div class="tssmenu-btn tss-menu-active" id="btn-manage-tags"><span>Címkék kezelése</span></div>
                <div class="tssmenu-btn tss-menu-selectable" id="btn-manage-categories"><span>Kategóriák kezelése</span></div>
            </div>
        </div>
    </div>

    <div class="tss-manage-tags-container">
        <h2>Címkék</h2>

        <div class="manage-tags-header">

            <div class="new-tag-wrapper">
                <i class="material-icons tags-header-icon" id="btn-add-new-tag">add</i>
                <input type="text" id="new-tag-field">
            </div>

            <div class="tag-filter-wrapper">
                <i class="material-icons tags-header-icon" id="btn-filter-tag">search</i>
                <input type="text" id="tag-filter-field">
            </div>

            <div class="sorting-options">
                <span>Rendezés: </span>
                <select name="select-sorting-option" id="select-sorting-option">
                    <option value="tag_name">Cím</option>
                    <option value="videocount">Darabszám</option>
                </select>
            </div>

        </div>

        <div class="manage-tags-wrapper"></div>
    </div>

</div>

<?php

$document = JFactory::getDocument();
$document->addScript("components/com_tssvideo/assets/js/tssvideo_tags.js");

?>
