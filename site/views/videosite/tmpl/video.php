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
$document->setTitle($this->videoDetails->title);
$document->addStyleSheet("components/com_tssvideo/assets/css/tssvideo.video.css");
$document->addStyleSheet("components/com_tssvideo/assets/css/tssvideo.videonewsletter.css");

?>

<div class="video-page-container">

    <div class="video-content">
        <div class="video-title"><?php echo $this->videoDetails->title; ?></div>
        <div>Kategóriák: <span class="category-names"></span></div>
        <div>Címkék: <span class="tag-names"></span></div>

        <div class="video-player">
            <iframe width="848" height="477" src="https://www.youtube.com/embed/<?php echo $this->videoDetails->youtube_id; ?>" frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
        </div>

        <div class="video-short-description">
            <?php echo $this->videoDetails->short_desc; ?>
        </div>

        <div class="video-long-description">
            <div class="toggle-description" id="toggle-description">
                A videó teljes tartalma ide kattintva olvasható
                <i id="toggle-arrow" class="material-icons">arrow_drop_down</i>
            </div>
            <div class="video-description" id="video-description">
                <?php echo $this->videoDetails->long_desc; ?>
            </div>
        </div>

    </div>

    <div class="side-bar">
        <!-- <div class="vocabulary">
            <div class="video-sidepanel-header">Értelmező szótár</div>
            <div class="phrase">Fogalom lorem ipsum 1</div>
            <div class="phrase">Fogalom lorem ipsum 2</div>
            <div class="phrase">Fogalom lorem ipsum 3</div>
            <div class="phrase">Fogalom lorem ipsum 4</div>
            <div class="phrase">Fogalom lorem ipsum 5</div>
        </div> -->


        <div class="video-categories">
            <div class="video-sidepanel-header">Videó kategóriák</div>
            <div class="category-list"></div>
        </div>

        <div class="video-tags">
            <div class="video-sidepanel-header">Címkék</div>
            <div class="tag-list" id="tag-list"></div>
        </div>

        <div class="similar-videos">
            <div class="video-sidepanel-header">Kapcsolódó videók</div>
            <div class="similar-video-list"></div>
        </div>

    </div>

</div>


<script>

    var videoTags = <?php echo json_encode($this->videoDetails->tags); ?>;
    var videoCategories = <?php echo json_encode($this->videoDetails->categories); ?>;
    var tags = <?php echo json_encode($this->tagList); ?>;
    var categories = <?php echo json_encode($this->categoryList); ?>;
    var similarVideos = <?php echo json_encode($this->similarVideoList); ?>;

</script>

<?php

$document = JFactory::getDocument();
$document->addScript("components/com_tssvideo/assets/js/tssvideo.video.js");

?>