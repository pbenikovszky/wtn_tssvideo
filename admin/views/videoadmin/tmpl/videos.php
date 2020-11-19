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
$document->addStyleSheet("components/com_tssvideo/assets/css/tssvideo_videos.css");

?>

<div class="tss-page-container">

    <div class="tss-sidebar">
        <div class="tss-sidebar-wrapper">
            <div class="tss-sidebar-header">
                <h2>Videók</h2>
            </div>
            <div class="menu-buttons">
                <div class="tssmenu-btn tss-menu-active" id="btn-videos"><span>Videók kezelése</span></div>
                <div class="tssmenu-btn tss-menu-selectable" id="btn-new-video"><span>Új videó</span></div>
                <div class="tssmenu-btn tss-menu-selectable" id="btn-manage-tags"><span>Címkék kezelése</span></div>
                <div class="tssmenu-btn tss-menu-selectable" id="btn-manage-categories"><span>Kategóriák kezelése</span></div>
            </div>
        </div>
    </div>

    <div class="tss-videos-container">
        <h2>Videók</h2>
        <div class="header-row">
            <div class="sorting-options tss-header-column">
                <span>Rendezés: </span>
                <select name="select-sorting-option" id="select-sorting-option">
                    <option value="title">Cím</option>
                    <option value="creation_date">Dátum</option>
                </select>
            </div>

            <div class="display-options tss-header-column">
                <span>Megjelenítés: </span>
                <select name="select-sorting-option" id="select-display-option">
                    <option value="all">Összes videó</option>
                    <option value="published">Csak a közzétett videók</option>
                    <option value="unpublished">Csak a visszavont videók</option>
                </select>
            </div>

            <div class="pagination-buttons tss-header-column">
                <div class="tss-pagination-button disabled-button" id="btn-previous-page">Előző</div>
                <div class="tss-pagination-button" id="btn-next-page">Következő</div>
                <span id="txt-page"></span>
            </div>

        </div>
        <ul class="tss-contextmenu">
            <li id="btn-edit-video">Szerkesztés</li>
            <li id="btn-togglepublish-video">Visszavonás</li>
            <li id="btn-delete-video">Törlés</li>
        </ul>
        <div class="videos-wrapper">
        </div>

        <div class="bottom-row">

            <div class="pagination-buttons tss-bottom-row">
                <div class="tss-pagination-button disabled-button" id="btn-previous-page-bottom">Előző</div>
                <div class="tss-pagination-button" id="btn-next-page-bottom">Következő</div>
                <span id="txt-page-bottom"></span>
            </div>

        </div>

    </div>

</div>

<?php

$document = JFactory::getDocument();
$document->addScript("components/com_tssvideo/assets/js/tssvideo_videos.js");

?>
