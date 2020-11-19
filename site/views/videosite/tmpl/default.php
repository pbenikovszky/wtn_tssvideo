<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_helloworld
 *
 * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access to this file
defined('_JEXEC') or die('Restricted access');

// Add css
$document = JFactory::getDocument();
$document->setTitle("WTN Videók");
$document->addStyleSheet("components/com_tssvideo/assets/css/tssvideo.default.css");
$document->addStyleSheet("components/com_tssvideo/assets/css/tssvideo.defaultnewsletter.css");

?>

<section class="tss-video-content-wrapper">
    <div class="side-panel">

        <div class="video-categories">
            <div class="video-sidepanel-header">Videó kategóriák</div>
            <div class="category-list"></div>
        </div>

        <div class="video-tags">
            <div class="video-sidepanel-header">Címkék</div>
            <div class="tag-list" id="tag-list"></div>
        </div>

        <div class="video-subscribe">
            <form action="http://video.wtn.hu/t/sub" method="post" enctype="multipart/form-data" id="mssysform1806241562750927" class="mssysform mssysnsid180624" target="_top">
                <input name="nl_id" type="hidden" value="89195">
                <input name="ns_id" type="hidden" value="180624">

                <input type="hidden" name="character-encoding" id="mssys-character-encoding" value="">

                <div id="mmform-container1562750927" class="mmform-container">
                    <fieldset class="titlepart">
                        <h2>Feliratkozok a videó értesítőre</h2>
                        <div class="form-desc"><p>Kérjük töltsd ki az alábbi mezőket az új videóról érkező értesítéshez!</p>
                </div>
                    </fieldset>
                    <fieldset class="datafields">
                        <input type="hidden" name="mssys_submit_params" value="" />

                <div id="containeraddress_1544791146" class="formrowcontainer mezo863053">
                                        <label class="formlabel" >Address</label>
                                    <div class="fieldcontainer">
                                        <input id="address_1544791146" name="address_1544791146" type="text" value="">
                                        </div>
                        <div style="clear: both;"></div>
                                        </div>
                <div style="clear: both;"></div>
                <div id="containermssys_firstname" class="formrowcontainer">
                                        <label class="formlabel" >Keresztnév</label>
                                    <div class="fieldcontainer">
                                        <input id="mssys_firstname" name="mssys_firstname" type="text" value="">
                                        </div>
                        <div style="clear: both;"></div>
                                    <div class="error-container">Kérjük, ezt a mezőt is legyen szíves kitölteni!</div>
                            </div>
                <div style="clear: both;"></div>
                <div id="containeremail" class="formrowcontainer">
                                        <label class="formlabel" >E-mail</label>
                                    <div class="fieldcontainer">
                                        <input id="email" name="email" type="email" value="">
                                        </div>
                        <div style="clear: both;"></div>
                                    <div class="error-container">Kérjük, ezt a mezőt is legyen szíves kitölteni!</div>
                            </div>
                <div style="clear: both;"></div>
                <div id="containeradatkezelesi_nyilatkozat" class="formrowcontainer">
                    <div class="adatkezelesi_nyilatkozat_checkbox">
                        <div class="checkbox-container">
                            <input type="checkbox" id="adatkezelesi_nyilatkozat" name="adatkezelesi_nyilatkozat">
                        </div>
                        <label for="adatkezelesi_nyilatkozat" class="checkbox-formlabel" style="display:inline;">Az <a href="https://wisetreenaturals.hu/adatkezelesi-tajekoztato" target="_blank">adatkezelési tájékoztatót</a> elolvastam, annak tartalmát megismertem</label>
                    </div>
                    <div class="error-container">Kérjük, ezt a mezőt is legyen szíves kitölteni!</div>
                </div>
                <div style="clear: both;"></div>

            </fieldset>
                <fieldset class="submitpart">
                    <div class="submitcontainer">
                        <a href="javascript:;" class="submitbutton">Feliratkozok</a>
                    </div>
                <div class="belowsubmitcontainer"></div>
                    </fieldset>
                </div>
             </form>
        </div>

    </div>

    <div class="videos-panel">

        <div class="videos-panel-header">
            <div class="selected-category" id="selected-category">
                <?php
if (isset($this->catID)) {
    echo "Kategória: " . $this->categoryNameToFilter;
} else if (isset($this->tagID)) {
    echo "Címke: " . $this->tagNameToFilter;
} else {
    echo "Videók";
}
?>
            </div>
            <div class="video-sort-option">
                <span>Rendezés</span>
                <select class="sort-dropdown" id="sort-mode">
                    <option value="date_asc">Dátum szerint növekvő</option>
                    <option value="date_desc">Dátum szerint csökkenő</option>
                    <option value="title_asc">Név szerint növekvő</option>
                    <option value="title_desc">Név szerint csökkenő</option>
                    <!-- <option value="popularity">Népszerűség</option> -->
                </select>
            </div>
        </div>

        <div class="video-grid" id="video-grid"></div>

        <div class="more-videos-button" id="btn-more-videos">További videók</div>

    </div>
</section>

<script type="text/javascript" src="https://d1ursyhqs5x9h1.cloudfront.net/sw/scripts/mailmaster-scripts-1.0.js"></script>
<script type="text/javascript" src="https://d1ursyhqs5x9h1.cloudfront.net/sw/scripts/mmutils.min.js"></script>

<script>

    var tags = <?php echo json_encode($this->tagList); ?>;
    var categories = <?php echo json_encode($this->categoryList); ?>;
    var videos = <?php echo json_encode($this->videoList); ?>;
    var videoCount = <?php echo $this->videoCount; ?>;
    var filteredCategoryID = <?php echo $this->categoryToFilter; ?>;
    var filteredTagID = <?php echo $this->tagToFilter; ?>;
    // var filteredCategoryName = <?php echo $this->categoryNameToFilter; ?>;
    // var filteredTagName = <?php echo $this->tagNameToFilter; ?>;

</script>


<?php

$document = JFactory::getDocument();
$document->addScript("components/com_tssvideo/assets/js/tssvideo.defaultnewsletter.js");
$document->addScript("components/com_tssvideo/assets/js/tssvideo.default.js");

?>