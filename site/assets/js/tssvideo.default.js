window.addEventListener("load", function () {
  const tagContainer = document.querySelector(".tag-list");
  const categoryContainer = document.querySelector(".category-list");
  const videoContainer = document.querySelector(".video-grid");
  const videoGridHeader = document.querySelector("#selected-category");

  const cbSortMode = document.querySelector("#sort-mode");

  const btnMoreVideos = document.querySelector("#btn-more-videos");

  let visible_videos = [];

  console.log("Starting the video page");

  // * Init function

  function init() {
    if (filteredCategoryID != -1) {
      visible_videos = videos.filter(video =>
        video.categories.contains(filteredCategoryID.toString())
      );
    } else if (filteredTagID != -1) {
      visible_videos = videos.filter(video =>
        video.tags.contains(filteredTagID.toString())
      );
    } else {
      visible_videos = videos;
    }
  }

  // * the Create functions

  function createTag(tag, isCommaNeeded = true) {
    const div = document.createElement("div");

    div.classList.add("tag");
    div.innerHTML = tag.tagname;
    div.setAttribute("data-item", tag.tagid);
    div.setAttribute("data-tag", tag.tagname)

    div.addEventListener("click", function (e) {
      const tagID = e.currentTarget.getAttribute("data-item");
      if (filteredTagID == tagID) {
        visible_videos = videos;
        videoGridHeader.innerHTML = "Videók";
        filteredTagID = -1;
        filteredCategoryID = -1;
      } else {
        filteredTagID = tagID;
        videoGridHeader.innerHTML = "Címke: " + e.currentTarget.getAttribute("data-tag");
        visible_videos = videos.filter(video => video.tags.contains(tagID));
        filteredCategoryID = -1;
      }
      addVideos();
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
      if (filteredCategoryID == categoryID) {
        visible_videos = videos;
        videoGridHeader.innerHTML = "Videók";
        filteredCategoryID = -1;
      } else {
        filteredCategoryID = categoryID;
        videoGridHeader.innerHTML = "Kategória: " + categoryName;
        visible_videos = videos.filter(video =>
          video.categories.contains(categoryID)
        );
        filteredTagID = -1;
      }
      addVideos();
    });

    return div;
  }

  function createVideo(video) {
    const div = document.createElement("div");
    div.classList.add("video");

    const divWrapper = document.createElement("div")
    divWrapper.classList.add("video-wrapper")

    const img = document.createElement("img");
    img.classList.add("video-thumbnail");
    img.setAttribute("src", video.thumbnail);
    img.setAttribute("alt", "Videó kép");
    img.setAttribute("width", "320");
    img.setAttribute("height", "180");
    img.setAttribute("data-item", video.id);

    const divTitle = document.createElement("div");
    divTitle.classList.add("video-title");
    divTitle.innerHTML = video.title;
    divTitle.setAttribute("data-item", video.id);

    const divDate = document.createElement("div");
    divDate.classList.add("video-date");
    divDate.innerHTML = formatDate(new Date(video.creation_date));

    divWrapper.addEventListener("click", function (e) {
      const videoID = e.target.getAttribute("data-item");
      let baseURL = window.location.origin + "/joomla/";
      const url =
        baseURL +
        "video-cikk/index.php?option=com_tssvideo&view=videosite&task=video&id=" +
        videoID;
      window.location.href = url;
    });

    divWrapper.appendChild(img);
    divWrapper.appendChild(divTitle);
    div.appendChild(divWrapper)
    div.appendChild(divDate);

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

  function resetVideos() {
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

  function addVideos() {
    resetVideos();

    switch (cbSortMode.value) {
      case "date_asc":
        visible_videos.sort(sortVideosByDateAsc);
        break;

      case "date_desc":
        visible_videos.sort(sortVideosByDateDesc);
        break;

      case "title_asc":
        visible_videos.sort(sortVideosByTitleAsc);
        break;

      case "title_desc":
        visible_videos.sort(sortVideosByTitleDesc);
        break;

      case "date_popularity":
        break;
    }

    visible_videos.forEach(function (video) {
      const newVideo = createVideo(video);
      videoContainer.appendChild(newVideo);
    });
  }

  // * Sorting functions
  const sortVideosByDateAsc = (a, b) => {
    dateA = new Date(a.creation_date);
    dateB = new Date(b.creation_date);
    if (dateA == dateB) return 0;
    if (dateA > dateB) return 1;
    return -1;
  };

  const sortVideosByTitleAsc = (a, b) => {
    if (a.title == b.title) return 0;
    if (a.title > b.title) return 1;
    return -1;
  }

  const sortVideosByDateDesc = (a, b) => -sortVideosByDateAsc(a, b);
  const sortVideosByTitleDesc = (a, b) => -sortVideosByTitleAsc(a, b);

  // Event Listeners
  cbSortMode.addEventListener("change", addVideos);

  function addButtonHandler() {
    if (videoCount > videos.length) {
      btnMoreVideos.addEventListener("click", async function () {
        const url =
          "index.php?option=com_tssvideo&view=videosite&task=getall&format=json";
        const response = await fetch(url);
        const result = await response.json();
        if (result.result == "SUCCESS") {
          videos = JSON.parse(result.videos);
          visible_videos = videos;
          filteredCategoryID = -1;
          filteredTagID = -1;
          videoGridHeader.textContent = "Videók";
          addVideos();
          btnMoreVideos.style.display = "none";
        } else {
          alert("Hiba történt a videók lekérése közben");
        }
      });
    } else {
      btnMoreVideos.style.display = "none";
    }
  }

  // * Helper functions
  function formatDate(date) {
    var monthNames = [
      "január",
      "február",
      "március",
      "április",
      "május",
      "június",
      "július",
      "augusztus",
      "szeptember",
      "október",
      "november",
      "december"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return year + ". " + monthNames[monthIndex] + " " + day + ".";
  }

  init();
  addTags();
  addCategories();
  addVideos();
  addButtonHandler();
});