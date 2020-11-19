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
$document->addStyleSheet("components/com_tssvideo/assets/css/tssvideo_categories.css");
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
                <div class="tssmenu-btn tss-menu-selectable" id="btn-manage-tags"><span>Címkék kezelése</span></div>
                <div class="tssmenu-btn tss-menu-active" id="btn-manage-categories"><span>Kategóriák kezelése</span></div>
            </div>
        </div>
    </div>

    <div class="tss-manage-categories-container">
        <h2>Kategóriák kezelése</h2>
        <div class="manage-categories-header">
            <div class="new-category-wrapper">
                <i class="material-icons categories-header-icon" id="btn-add-new-category">add</i>
                <input type="text" id="new-category-field">
            </div>
            <div class="category-filter-wrapper">
                <i class="material-icons categories-header-icon" id="btn-filter-categories">search</i>
                <input type="text" id="category-filter-field">
            </div>
        </div>
        <table class="category-table">
            <col width="60%">
            <col width="20%">
            <col width="20%">
            <thead>
                <th>Kategória</th>
                <th></th>
                <th></th>
            </thead>
            <tbody id="category-table-body"></tbody>
        </table>

    </div>

</div>

<?php

$document = JFactory::getDocument();
$document->addScript("components/com_tssvideo/assets/js/tssvideo_categories.js");

?>
