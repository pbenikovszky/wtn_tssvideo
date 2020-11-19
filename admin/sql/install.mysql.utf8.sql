DROP TABLE IF EXISTS `#__tssvideo_videocategories`;
DROP TABLE IF EXISTS `#__tssvideo_videotags`;
DROP TABLE IF EXISTS `#__tssvideo_categories`;
DROP TABLE IF EXISTS `#__tssvideo_tags`;
DROP TABLE IF EXISTS `#__tssvideo_videos`;
CREATE TABLE `#__tssvideo_videos`
( `id` int
(4) NOT NULL AUTO_INCREMENT,
         `youtube_id` varchar
(12) NOT NULL,
         `title` varchar
(100) NOT NULL,
         `short_desc` text NOT NULL,
         `long_desc` text NOT NULL,
         `thumbnail` varchar
(100) NOT NULL,
         `published` boolean NOT NULL,
         `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
         primary key
(`id`) ) DEFAULT CHARSET=utf8;
CREATE TABLE `#__tssvideo_categories`
( `id` int
(4) NOT NULL AUTO_INCREMENT,
         `category_name` varchar
(50) NOT NULL,
         primary key
(`id`) ) DEFAULT CHARSET=utf8;
CREATE TABLE `#__tssvideo_tags`
( `id` int
(4) NOT NULL AUTO_INCREMENT,
         `tag_name` varchar
(50) NOT NULL,
         primary key
(`id`) ) DEFAULT CHARSET=utf8;
CREATE TABLE `#__tssvideo_videocategories`
( `id` int
(4) NOT NULL AUTO_INCREMENT,
         `video_id` int
(4) NOT NULL,
         `category_id` int
(4) NOT NULL,
         primary key
(`id`),
         foreign key
(`video_id`) references `#__tssvideo_videos`
(`id`),
         foreign key
(`category_id`) references `#__tssvideo_categories`
(`id`) ) DEFAULT CHARSET=utf8;
CREATE TABLE `#__tssvideo_videotags`
( `id` int
(4) NOT NULL AUTO_INCREMENT,
         `video_id` int
(4) NOT NULL,
         `tag_id` int
(4) NOT NULL,
         primary key
(`id`),
         foreign key
(`video_id`) references `#__tssvideo_videos`
(`id`),
         foreign key
(`tag_id`) references `#__tssvideo_tags`
(`id`) ) DEFAULT CHARSET=utf8; 