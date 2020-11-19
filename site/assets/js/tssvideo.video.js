window.addEventListener("load", function () {
  let toggleDescription = jQuery("#toggle-description");
  let longDescription = jQuery("#video-description");

  toggleDescription.click(function () {
    longDescription.slideToggle(400);
  });

  const tagContainer = document.querySelector(".tag-list");
  const categoryContainer = document.querySelector(".category-list");
  const videoTagContainer = document.querySelector(".tag-names");
  const videoCategoryContainer = document.querySelector(".category-names");
  const similarVideoContainer = document.querySelector(".similar-video-list");

  // * the Create functions

  function createTag(tag, isCommaNeeded = true) {
    const div = document.createElement("div");

    div.classList.add("tag");
    div.innerHTML = tag.tagname;
    div.setAttribute("data-item", tag.tagid);
    div.setAttribute("data-tag", tag.tagname)

    div.addEventListener("click", function (e) {
      const tagID = e.currentTarget.getAttribute("data-item");
      const tagName = e.currentTarget.getAttribute("data-tag");
      let baseURL = window.location.origin + "/joomla/";
      const url =
        baseURL +
        "video/index.php?option=com_tssvideo&tagid=" +
        tagID +
        "&tagname=" +
        tagName;
      window.location.href = url;
    });

    if (isCommaNeeded) {
      const spanComma = document.createElement("span");
      spanComma.innerHTML = ", ";
      div.appendChild(spanComma);
    }

    return div;
  }

  function createCategory(category) {
    const div = document.createElement("div");

    div.classList.add("category");
    div.innerHTML =
      category.categoryname + " (" + category.categorycount + " db)";
    div.setAttribute("data-item", category.categoryid);
    div.setAttribute("data-categoryname", category.categoryname);

    div.addEventListener("click", function (e) {
      const categoryID = e.target.getAttribute("data-item");
      const categoryName = e.target.getAttribute("data-categoryname");
      let baseURL = window.location.origin + "/joomla/";
      const url =
        baseURL +
        "video/index.php?option=com_tssvideo&catid=" +
        categoryID +
        "&catname=" +
        categoryName;
      window.location.href = url;
    });

    return div;
  }

  function createVideoTag(tag, isCommaNeeded = true) {
    const span = document.createElement("span");

    const spanTag = document.createElement("span");
    spanTag.classList.add("video-tag");
    spanTag.setAttribute("data-item", tag.id);
    spanTag.innerHTML = tag.tagname;

    spanTag.addEventListener("click", function videoTagClickHandler(e) {
      const tagID = e.target.getAttribute("data-item");
      const tagName = e.target.textContent;
      let baseURL = window.location.origin + "/joomla/";
      const url =
        baseURL +
        "video/index.php?option=com_tssvideo&tagid=" +
        tagID +
        "&tagname=" +
        tagName;
      window.location.href = url;
    });

    span.appendChild(spanTag);
    if (isCommaNeeded) {
      const spanComma = document.createElement("span");
      spanComma.innerHTML = ", ";
      span.appendChild(spanComma);
    }
    return span;
  }

  function createVideoCategory(category, isCommaNeeded = true) {
    const span = document.createElement("span");

    const spanCategory = document.createElement("span");
    spanCategory.classList.add("video-category");
    spanCategory.setAttribute("data-item", category.id);
    spanCategory.innerHTML = category.categoryname;

    spanCategory.addEventListener("click", function videoCategoryClickHandler(
      e
    ) {
      const categoryID = e.target.getAttribute("data-item");
      const categoryName = e.target.textContent;

      let baseURL = window.location.origin + "/joomla/";
      const url =
        baseURL +
        "video/index.php?option=com_tssvideo&catid=" +
        categoryID +
        "&catname=" +
        categoryName;
      window.location.href = url;
    });

    span.appendChild(spanCategory);
    if (isCommaNeeded) {
      const spanComma = document.createElement("span");
      spanComma.innerHTML = ", ";
      span.appendChild(spanComma);
    }

    return span;
  }

  function createSimilarVideo(video) {
    const div = document.createElement("div");
    div.classList.add("similar-video");

    const img = document.createElement("img");
    img.classList.add("similar-video-thumbnail");
    img.setAttribute("src", video.thumbnail);
    img.setAttribute("alt", "Videó kép");
    img.setAttribute("data-item", video.video_id);

    const divTitle = document.createElement("div");
    divTitle.classList.add("similar-video-title");
    divTitle.innerHTML = video.title;

    img.addEventListener("click", function (e) {
      const videoID = e.target.getAttribute("data-item");
      const url =
        "video-cikk/index.php?option=com_tssvideo&view=videosite&task=video&id=" +
        videoID;
      window.location.href = url;
    });

    div.appendChild(img);
    div.appendChild(divTitle);

    return div;
  }

  // * the Reset functions

  function resetTags() {
    document.querySelectorAll(".tag").forEach(function (tag) {
      tag.parentElement.removeChild(tag);
    });
  }

  function resetCategories() {
    document.querySelectorAll(".category").forEach(function (category) {
      category.parentElement.removeChild(category);
    });
  }

  function resetSimilarVideos() {
    document.querySelectorAll(".video").forEach(function (video) {
      video.parentElement.removeChild(video);
    });
  }

  // * the Add functions

  function addTags() {
    resetTags();
    tags.forEach(function (tag, index, tagsArray) {
      let newTag
      if (index == tagsArray.length - 1) {
        newTag = createTag(tag, false);
      } else {
        newTag = createTag(tag);
      }
      tagContainer.appendChild(newTag);
    });
  }

  function addCategories() {
    resetCategories();
    categories.forEach(function (category) {
      const newCategory = createCategory(category);
      categoryContainer.appendChild(newCategory);
    });
  }

  function addVideoTags() {
    videoTags.forEach(function (tag, index, videoTagsArray) {
      let newTag;

      if (index == videoTagsArray.length - 1) {
        newTag = createVideoTag(tag, false);
      } else {
        newTag = createVideoTag(tag);
      }

      videoTagContainer.appendChild(newTag);
    });
  }

  function addVideoCategories() {
    videoCategories.forEach(function (category, index, videoCategoriesArray) {
      let newCategory;

      if (index == videoCategoriesArray.length - 1) {
        newCategory = createVideoCategory(category, false);
      } else {
        newCategory = createVideoCategory(category);
      }

      videoCategoryContainer.appendChild(newCategory);
    });
  }

  function addSimilarVideos() {
    resetSimilarVideos();

    if (similarVideos.length == 0) {
      similarVideoContainer.innerHTML = "Nincs kapcsolódó videó";
      return;
    }

    if (similarVideos.length <= 2) {
      similarVideos.forEach(function (video) {
        const newVideo = createSimilarVideo(video);
        similarVideoContainer.appendChild(newVideo);
      });
      return;
    }

    let firstVideoIndex = Math.floor(Math.random() * similarVideos.length);
    let secondVideoIndex = Math.floor(Math.random() * similarVideos.length);
    if (firstVideoIndex == secondVideoIndex) {
      if (firstVideoIndex == 0) {
        firstVideoIndex++;
      } else {
        firstVideoIndex--;
      }
    }

    const newVideo1 = createSimilarVideo(similarVideos[firstVideoIndex]);
    const newVideo2 = createSimilarVideo(similarVideos[secondVideoIndex]);
    similarVideoContainer.appendChild(newVideo1);
    similarVideoContainer.appendChild(newVideo2);
  }

  addTags();
  addCategories();
  addVideoTags();
  addVideoCategories();
  addSimilarVideos();
});