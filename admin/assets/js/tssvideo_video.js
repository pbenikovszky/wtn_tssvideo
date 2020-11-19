window.addEventListener("load", function () {
  const btnModify = document.querySelector("#btn-modify");
  const btnCancel = document.querySelector("#btn-cancel");

  const cbIsPublished = document.querySelector("#is-published-checkbox");
  const cbInner = this.document.querySelector("#checkbox-inner-field");

  const txtYoutubeID = document.querySelector("#youtube_id");
  const txtTitle = document.querySelector("#video_title");
  const txtCreationDate = document.querySelector("#creation_date");
  const txtShortDescription = document.querySelector("#short_description");
  const txtVideoCategory = document.querySelector("#video_category");
  const imgThumnbail = document.querySelector("#video_thumbnail");

  const tagContainer = document.querySelector(".tag-container");
  const categoryContainer = document.querySelector(".category-wrapper");

  const tagInput = document.querySelector("#tag-input");

  const autocompleteTagsResults = document.querySelector(
    "#autocomplete-tags-result"
  );
  let autoCompleteTags = [];

  const autocompleteCategoriesResults = document.querySelector(
    "#autocomplete-categories-result"
  );
  let autoCompleteCategories = [];

  let currentCursorTags = 0;
  let matchesTags = [];

  let currentCursorCategories = 0;
  let matchesCategories = [];

  let tags = [];
  let categories = [];

  const videoID = document
    .querySelector(".tss-new-video-container")
    .getAttribute("data-item");

  // * Using ajax to get the data for the page

  async function loadDataForAutocomplete() {
    let url =
      "index.php?option=com_tssvideo&task=managetags&job=gettags&format=json";
    let response = await fetch(url);
    let result = await response.json();
    autoCompleteTags = result.tags.map(tag => tag.tag_name.toLowerCase());

    url =
      "index.php?option=com_tssvideo&task=managecategories&job=getcategories&format=json";
    response = await fetch(url);
    result = await response.json();
    autoCompleteCategories = result.categories;
  }

  async function loadVideoDetails() {
    const url = "index.php?option=com_tssvideo&task=managevideos&format=json";
    const data = "job=getvideo&id=" + videoID;
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    };

    const response = await fetch(url, options);
    const result = await response.json();
    txtYoutubeID.value = result.video.youtube_id;

    if (result.video.published == "1") {
      cbInner.classList.add("checked");
    }

    txtTitle.value = result.video.title;
    txtShortDescription.value = result.video.short_desc;
    txtCreationDate.value = result.video.creation_date;
    imgThumnbail.setAttribute("src", result.video.thumbnail);
    tags = result.tags;
    categories = result.categories;

    const iframeLongDescription = document.querySelector("#ldescEditor_ifr");
    const innerDoc =
      iframeLongDescription.contentDocument ||
      iframeLongDescription.contentWindow.document;
    innerDoc.body.innerHTML = result.video.long_desc;

    addTags();
    addCategories();
  }

  // * Functions to handle tags

  function createTag(label) {
    const div = document.createElement("div");
    div.classList.add("tag");

    const span = document.createElement("span");
    span.innerHTML = label;

    const btnClose = document.createElement("i");
    btnClose.classList.add("material-icons");
    btnClose.innerHTML = "close";
    btnClose.setAttribute("data-item", label);

    btnClose.addEventListener("click", function (e) {
      const value = e.target.getAttribute("data-item");
      const index = tags.indexOf(value);
      tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
      addTags();
    });

    div.appendChild(span);
    div.appendChild(btnClose);

    return div;
  }

  // * display video tags
  function resetTags() {
    document.querySelectorAll(".tag").forEach(function (tag) {
      tag.parentElement.removeChild(tag);
    });
  }

  function addTags() {
    resetTags();
    tags
      .slice()
      .reverse()
      .forEach(function (tag) {
        const newTag = createTag(tag);
        tagContainer.prepend(newTag);
      });
  }

  // * Functions to handle categories

  function resetCategories() {
    document.querySelectorAll(".category").forEach(function (tag) {
      tag.parentElement.removeChild(tag);
    });
    categoryContainer.style.display = "none";
  }

  function addCategories() {
    resetCategories();
    categories.forEach(function (category) {
      const newCategory = createCategory(category);
      categoryContainer.append(newCategory);
    });
    if (categories.length > 0) {
      categoryContainer.style.display = "block";
    }
  }

  function createCategory(label) {
    const div = document.createElement("div");
    div.classList.add("category");

    const span = document.createElement("span");
    span.innerHTML = label;

    const btnClose = document.createElement("i");
    btnClose.classList.add("material-icons");
    btnClose.innerHTML = "close";
    btnClose.setAttribute("data-item", label);

    btnClose.addEventListener("click", function (e) {
      const value = e.target.getAttribute("data-item");
      const index = categories.indexOf(value);
      categories = [
        ...categories.slice(0, index),
        ...categories.slice(index + 1)
      ];
      addCategories();
    });

    div.appendChild(span);
    div.appendChild(btnClose);

    return div;
  }

  // * Functions to handle the autocomplete mechanism

  function getMatchesForTags(inputText) {
    let matchList = autoCompleteTags.filter(tag => {
      const regex = new RegExp(`^${inputText}`, "gi");
      return tag.match(regex);
    });

    return matchList;
  }

  function getMatchesForCategories(inputText) {
    let matchList = autoCompleteCategories.filter(category => {
      const regex = new RegExp(`^${inputText}`, "gi");
      return category.match(regex);
    });

    return matchList;
  }

  function displayMatchesForTags(matchList) {
    if (matchList.length > 0) {
      const html = matchList
        .map(
          match => `
                <li class="result tagresult" data-item="${match}">${match}</li>
            `
        )
        .join("");
      autocompleteTagsResults.innerHTML = html;
      const newLeftPosition = tagInput.offsetLeft;
      autocompleteTagsResults.style.left = newLeftPosition + "px";
      moveCursorForTags(currentCursorTags);
      toggleResultsForTags("show");
    }
  }

  function displayMatchesForCategories(matchList) {
    if (matchList.length > 0) {
      const html = matchList
        .map(
          match => `
                <li class="result categoryresult" data-item="${match}">${match}</li>
            `
        )
        .join("");
      autocompleteCategoriesResults.innerHTML = html;
      const newLeftPosition = txtVideoCategory.offsetLeft;
      autocompleteCategoriesResults.style.left = newLeftPosition + "px";
      moveCursorForCategories(currentCursorCategories);
      toggleResultsForCategories("show");
    }
  }

  function toggleResultsForTags(action) {
    if (action == "show") {
      autocompleteTagsResults.classList.add("visible");
    } else if (action == "hide") {
      autocompleteTagsResults.classList.remove("visible");
    }
  }

  function toggleResultsForCategories(action) {
    if (action == "show") {
      autocompleteCategoriesResults.classList.add("visible");
    } else if (action == "hide") {
      autocompleteCategoriesResults.classList.remove("visible");
    }
  }

  function moveCursorForTags(pos) {
    autocompleteTagsResults.children[currentCursorTags].classList.remove(
      "highlighted"
    );
    autocompleteTagsResults.children[pos].classList.add("highlighted");
    currentCursorTags = pos;
  }

  function moveCursorForCategories(pos) {
    autocompleteCategoriesResults.children[
      currentCursorCategories
    ].classList.remove("highlighted");
    autocompleteCategoriesResults.children[pos].classList.add("highlighted");
    currentCursorCategories = pos;
  }

  // * Function to add a new tag to the tag list

  function addTagToList(tag) {
    let newTag = tag.toLowerCase();
    if (!tags.includes(newTag)) {
      tags.push(newTag);
      addTags();
    }
    tagInput.value = "";
    matchesTags = [];
    toggleResultsForTags("hide");
    currentCursorTags = 0;
  }

  // * Function to add a new category to the category list

  function addCategoryToList(category) {
    if (!categories.includes(category)) {
      categories.push(category);
      addCategories();
    }
    txtVideoCategory.value = "";
    matchesCategories = [];
    toggleResultsForCategories("hide");
    currentCursorCategories = 0;
  }

  // * Handling the mousedown event for the document
  // * to add a new tag/category the proper list
  document.addEventListener("mousedown", function (e) {
    if (e.target.classList.contains("tagresult")) {
      e.preventDefault();
      addTagToList(e.target.getAttribute("data-item"));
    }

    if (e.target.classList.contains("categoryresult")) {
      e.preventDefault();
      addCategoryToList(e.target.getAttribute("data-item"));
    }
  });

  // * Handle the mouseover and mouseout events for the autocompletelist
  autocompleteTagsResults.addEventListener("mouseover", function (e) {
    autocompleteTagsResults.children[currentCursorTags].classList.remove(
      "highlighted"
    );
    if (e.target.classList.contains("tagresult")) {
      currentCursorTags = Array.from(e.target.parentNode.children).indexOf(
        e.target
      );
    }
  });

  autocompleteTagsResults.addEventListener("mouseout", function () {
    autocompleteTagsResults.children[currentCursorTags].classList.add(
      "highlighted"
    );
  });

  autocompleteCategoriesResults.addEventListener("mouseover", function (e) {
    autocompleteCategoriesResults.children[
      currentCursorCategories
    ].classList.remove("highlighted");
    if (e.target.classList.contains("categoryresult")) {
      currentCursorCategories = Array.from(
        e.target.parentNode.children
      ).indexOf(e.target);
    }
  });

  autocompleteCategoriesResults.addEventListener("mouseout", function () {
    autocompleteCategoriesResults.children[
      currentCursorCategories
    ].classList.add("highlighted");
  });

  // * Handle the input fields
  // * Tags and categories

  tagInput.addEventListener("focus", function () {
    if (matchesTags.length > 0) {
      toggleResultsForTags("show");
    }
  });

  tagInput.addEventListener("focusout", function () {
    toggleResultsForTags("hide");
  });

  tagInput.addEventListener("keyup", function (e) {
    autocompleteTagsResults.innerHTML = "";
    matchesTags = [];
    toggleResultsForTags("hide");

    if (this.value.length > 0) {
      matchesTags = getMatchesForTags(this.value);

      if (matchesTags.length > 0) {
        displayMatchesForTags(matchesTags);
      } else {
        currentCursorTags = 0;
      }
    }

    switch (e.keyCode) {
      case 13:
        if (autocompleteTagsResults.classList.contains("visible")) {
          this.value = autocompleteTagsResults.children[
            currentCursorTags
          ].innerText.toLowerCase();
        }
        if (this.value.trim() != "") {
          addTagToList(this.value.trim().toLowerCase());
        } else {
          this.value = "";
        }
        break;

      case 38: // up arrow
        if (currentCursorTags > 0) {
          moveCursorForTags(currentCursorTags - 1);
        }
        break;

      case 40: // down arrow
        if (currentCursorTags < matchesTags.length - 1) {
          moveCursorForTags(currentCursorTags + 1);
        }
        break;
    }
  });

  txtVideoCategory.addEventListener("focus", function () {
    if (matchesCategories.length > 0) {
      toggleResultsForCategories("show");
    }
  });

  txtVideoCategory.addEventListener("focusout", function () {
    toggleResultsForCategories("hide");
  });

  txtVideoCategory.addEventListener("keyup", function (e) {
    autocompleteCategoriesResults.innerHTML = "";
    matchesCategories = [];
    toggleResultsForCategories("hide");

    if (this.value.length > 0) {
      matchesCategories = getMatchesForCategories(this.value);

      if (matchesCategories.length > 0) {
        displayMatchesForCategories(matchesCategories);
      } else {
        currentCursorCategories = 0;
      }
    }

    switch (e.keyCode) {
      case 13:
        if (autocompleteCategoriesResults.classList.contains("visible")) {
          this.value =
            autocompleteCategoriesResults.children[
              currentCursorCategories
            ].innerText;
        }
        if (this.value.trim() != "") {
          const newCategory = this.value.trim();
          addCategoryToList(newCategory);
        } else {
          this.value = "";
        }
        break;

      case 38: // up arrow
        if (currentCursorCategories > 0) {
          moveCursorForCategories(currentCursorCategories - 1);
        }
        break;

      case 40: // down arrow
        if (currentCursorCategories < matchesCategories.length - 1) {
          moveCursorForCategories(currentCursorCategories + 1);
        }
        break;
    }
  });

  function addEventHandlers() {
    const btnVideos = document.querySelector("#btn-videos");
    const btnNewVideo = document.querySelector("#btn-new-video");
    const btnManageTags = document.querySelector("#btn-manage-tags");
    const btnManageCategories = document.querySelector(
      "#btn-manage-categories"
    );

    btnVideos.addEventListener("click", function () {
      window.location.href =
        "index.php?option=com_tssvideo&view=videoadmin&task=videos";
    });

    btnNewVideo.addEventListener("click", function () {
      window.location.href =
        "index.php?option=com_tssvideo&view=videoadmin&task=newvideo";
    });

    btnManageTags.addEventListener("click", function () {
      window.location.href =
        "index.php?option=com_tssvideo&view=videoadmin&task=tags";
    });

    btnManageCategories.addEventListener("click", function () {
      window.location.href =
        "index.php?option=com_tssvideo&view=videoadmin&task=categories";
    });

    // The cancel button
    btnCancel.addEventListener("click", function () {
      window.location.href =
        "index.php?option=com_tssvideo&view=videoadmin&task=videos";
    });

    // Event handler for the checkbox
    cbIsPublished.addEventListener("click", function () {
      cbInner.classList.toggle("checked");
    });
  }

  // * Modify the video

  /**
   *
   * function to convert the html entities to html tags
   * in the passed parameter
   *
   * @param String html
   */

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  btnModify.addEventListener("click", function () {
    if (txtTitle.value == "") {
      alert("A videó címe mező kitöltése kötelező");
      return;
    }

    if (txtCreationDate.value == "") {
      alert("A Hozzáadva mező kitöltése kötelező");
      return;
    }

    if (categories.length == 0) {
      alert("A Kategóriák mező kitöltése kötelező");
      return;
    }

    if (tags.length == 0) {
      alert("A Címkék mező kitöltése kötelező");
      return;
    }

    if (txtShortDescription.value == "") {
      alert("A Rövid leírás mező kitöltése kötelező");
      return;
    }
    modifyVideo();
  });

  async function modifyVideo() {
    const iframeLongDescription = document.querySelector("#ldescEditor_ifr");
    const innerDoc =
      iframeLongDescription.contentDocument ||
      iframeLongDescription.contentWindow.document;
    const longDescription = innerDoc.body.innerHTML;

    let url = "index.php?option=com_tssvideo&task=managetags&format=json";

    let data = "job=gettagids&tags=" + tags.join(",");

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    };

    let response = await fetch(url, options);
    let result = await response.json();
    let tagList = result.tags.join(",");

    url = "index.php?option=com_tssvideo&task=managecategories&format=json";

    data = "job=getcategoryids&categories=" + categories.join(",");

    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    };

    response = await fetch(url, options);
    result = await response.json();
    let categoryList = result.categories.join(",");

    const isPublished = cbInner.classList.contains("checked") ? "1" : "0";

    data = "job=editvideo";
    data += "&id=" + videoID;
    data += "&title=" + txtTitle.value;
    data += "&creationdate=" + txtCreationDate.value;
    data += "&published=" + isPublished;
    data += "&tags=" + tagList;
    data += "&categories=" + categoryList;
    data += "&sdesc=" + txtShortDescription.value;
    data += "&ldesc=" + decodeHtml(longDescription);

    url = "index.php?option=com_tssvideo&task=managevideos&format=json";

    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    };
    response = await fetch(url, options);
    result = await response.json();

    if (result.result == "SUCCESS") {
      alert("A bejegyzés sikeresen módosítva lett.");
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    } else {
      alert("HIBA: " + result.reason);
    }
  }

  addEventHandlers();
  loadVideoDetails();
  loadDataForAutocomplete();
});