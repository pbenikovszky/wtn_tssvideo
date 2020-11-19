window.addEventListener('load', function () {

    const videosContainer = document.querySelector(".videos-wrapper");
    const contextMenu = this.document.querySelector('.tss-contextmenu')
    const btnTogglePublishVideo = document.querySelector("#btn-togglepublish-video");

    const btnNextPage = document.querySelector('#btn-next-page')
    const btnPreviousPage = document.querySelector('#btn-previous-page')
    const btnNextPageBottom = document.querySelector('#btn-next-page-bottom')
    const btnPreviousPageBottom = document.querySelector('#btn-previous-page-bottom')

    const cbDisplayMode = document.querySelector('#select-display-option')
    const cbSortMode = document.querySelector('#select-sorting-option')
    const txtPage = document.querySelector('#txt-page')
    const txtPageBottom = document.querySelector('#txt-page-bottom')

    let selectedVideoID = 0
    let videos = []
    let visibleVideos = []
    const videosPerPage = 30
    let currentPage = 1
    let numberOfPages = 1

    const page = {
        NEXT: 1,
        PREVIOUS: -1
    }

    async function loadVideos() {
        const url =
            "index.php?option=com_tssvideo&task=managevideos&job=getvideos&format=json";

        const response = await fetch(url);
        const result = await response.json();
        videos = result.videos;
        visibleVideos = videos
        numberOfPages = Math.ceil(visibleVideos.length / videosPerPage)
        if (numberOfPages < 2) {
            btnNextPage.classList.add('disabled-button')
            btnNextPageBottom.classList.add('disabled-button')
        }
        addVideos();
    }

    function resetVideos() {
        document.querySelectorAll(".video").forEach(function (video) {
            video.parentElement.removeChild(video);
        });
    }

    function addVideos() {
        resetVideos();

        if (cbSortMode.value == "title") {
            visibleVideos.sort(sortVideosByTitle)
        } else {
            visibleVideos.sort(sortVideosByDate)
        }

        const videosOnPage = visibleVideos.slice((currentPage - 1) * videosPerPage, currentPage * videosPerPage)

        videosOnPage.forEach(function (video) {
            const newVideo = createVideo(video);
            videosContainer.append(newVideo);
        });
        txtPage.textContent = ('Oldal: ' + currentPage + ' / ' + numberOfPages)
        txtPageBottom.textContent = ('Oldal: ' + currentPage + ' / ' + numberOfPages)

    }

    function createVideo(video) {
        const div = document.createElement("div");
        div.classList.add("video");
        if (video.published == '0') {
            div.classList.add("unpublished");
        }
        div.setAttribute("data-item", video.id);

        const img = document.createElement("img");
        img.setAttribute("src", video.thumbnail);

        const divTitle = document.createElement("div");
        divTitle.classList.add("video-title");
        divTitle.innerHTML = video.title;

        div.appendChild(img);
        div.appendChild(divTitle);

        div.addEventListener('click', function (e) {
            const videoID = e.target.getAttribute("data-item")
            const url = "index.php?option=com_tssvideo&view=videoadmin&task=video&id=" + videoID
            window.location.href = url
        })

        div.addEventListener('contextmenu', function (e) {
            e.preventDefault()
            contextMenu.classList.remove('visible')
            contextMenu.style.top = `${e.clientY - 20}px`
            contextMenu.style.left = `${e.clientX - 20}px`
            console.log(video.published)
            if (video.published == "0") {
                btnTogglePublishVideo.textContent = 'Közzététel'
            } else {
                btnTogglePublishVideo.textContent = 'Visszavonás'
            }
            contextMenu.classList.add('visible')
            selectedVideoID = video.id
        })

        return div;
    }



    function addEventHandlers() {

        // sidebar menu
        const btnNewVideo = document.querySelector("#btn-new-video");
        const btnManageTags = document.querySelector("#btn-manage-tags");
        const btnManageCategories = document.querySelector("#btn-manage-categories");

        btnNewVideo.addEventListener('click', function () {
            window.location.href = "index.php?option=com_tssvideo&view=videoadmin&task=newvideo"
        })

        btnManageTags.addEventListener('click', function () {
            window.location.href = "index.php?option=com_tssvideo&view=videoadmin&task=tags"
        })

        btnManageCategories.addEventListener('click', function () {
            window.location.href = "index.php?option=com_tssvideo&view=videoadmin&task=categories"
        })

        // context menu
        const btnEditVideo = document.querySelector("#btn-edit-video");
        const btnDeleteVideo = document.querySelector("#btn-delete-video");

        btnEditVideo.addEventListener('click', function (e) {
            contextMenu.classList.remove('visible')
            const url = "index.php?option=com_tssvideo&view=videoadmin&task=video&id=" + selectedVideoID
            window.location.href = url
        })

        btnDeleteVideo.addEventListener('click', async function (e) {

            if (selectedVideoID == 0) {
                alert("Hiba a video ID betöltésekor")
                return
            }

            contextMenu.classList.remove('visible')

            let userResponse = confirm('Tényleg törölni szeretnéd ezt a videót?')
            if (!userResponse) {
                return
            }

            let url = "index.php?option=com_tssvideo&task=managevideos&format=json";

            let data = "job=deletevideo&id=" + selectedVideoID

            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data
            };

            let response = await fetch(url, options);
            let result = await response.json();
            if (result.result == "SUCCESS") {
                window.location.reload()
            } else {
                alert("Hiba történt: " + result.reason)
            }
        })

        btnTogglePublishVideo.addEventListener('click', async function (e) {
            if (selectedVideoID == 0) {
                alert("Hiba a video ID betöltésekor")
                return
            }

            contextMenu.classList.remove('visible')

            const url = "index.php?option=com_tssvideo&task=managevideos&format=json";

            const isPublished = (btnTogglePublishVideo.textContent == "Közzététel") ? "1" : "0"

            const data = "job=setpublished&id=" + selectedVideoID + "&published=" + isPublished

            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data
            };

            let response = await fetch(url, options);
            let result = await response.json();
            if (result.result == "SUCCESS") {
                window.location.reload()
            } else {
                alert("Hiba történt: " + result.reason)
            }
        })

        // Disable right click event for the context menu items
        btnEditVideo.addEventListener('contextmenu', function (e) {
            e.preventDefault()
        })

        btnDeleteVideo.addEventListener('contextmenu', function (e) {
            e.preventDefault()
        })

        btnTogglePublishVideo.addEventListener('contextmenu', function (e) {
            e.preventDefault()
        })

        // set click event for document to hide the context menu
        document.addEventListener('click', e => hideContextMenu(e))
        document.addEventListener('contextmenu', e => hideContextMenu(e))

        const hideContextMenu = e => {
            if (!e.target.classList.contains('video')) {
                contextMenu.classList.remove('visible')
            }
        }

        // Handle the change events for the comboboxes

        cbSortMode.addEventListener('change', addVideos)

        cbDisplayMode.addEventListener('change', function () {
            switch (this.value) {
                case 'all':
                    visibleVideos = videos
                    break;

                case 'published':
                    visibleVideos = videos.filter(video => video.published == '1')
                    break;

                case 'unpublished':
                    visibleVideos = videos.filter(video => video.published == '0')
                    break;
            }

            numberOfPages = Math.ceil(visibleVideos.length / videosPerPage)

            currentPage = 1
            btnPreviousPage.classList.add('disabled-button')
            btnPreviousPageBottom.classList.add('disabled-button')

            if (numberOfPages < 2) {
                btnNextPage.classList.add('disabled-button')
                btnNextPageBottom.classList.add('disabled-button')
            } else {
                btnNextPage.classList.remove('disabled-button')
                btnNextPageBottom.classList.remove('disabled-button')
            }

            addVideos()
        })

        // Handle the page navigation buttons

        function changeToPage(newPage) {

            currentPage += newPage

            if (currentPage == 1) {
                btnPreviousPage.classList.add('disabled-button')
                btnPreviousPageBottom.classList.add('disabled-button')
            } else {
                btnPreviousPage.classList.remove('disabled-button')
                btnPreviousPageBottom.classList.remove('disabled-button')

            }

            if (currentPage == numberOfPages) {
                btnNextPage.classList.add('disabled-button')
                btnNextPageBottom.classList.add('disabled-button')
            } else {
                btnNextPage.classList.remove('disabled-button')
                btnNextPageBottom.classList.remove('disabled-button')
            }

            addVideos()
        }

        btnNextPage.addEventListener('click', () => changeToPage(page.NEXT))
        btnNextPageBottom.addEventListener('click', () => changeToPage(page.NEXT))
        btnPreviousPage.addEventListener('click', () => changeToPage(page.PREVIOUS))
        btnPreviousPageBottom.addEventListener('click', () => changeToPage(page.PREVIOUS))


    }

    const sortVideosByTitle = (a, b) => {
        titleA = a.title.toLowerCase();
        titleB = b.title.toLowerCase();
        if (titleA == titleB) return 0;
        if (titleA > titleB) return 1;
        return -1;
    }

    const sortVideosByDate = (a, b) => {
        dateA = new Date(a.creation_date)
        dateB = new Date(b.creation_date)
        if (dateA == dateB) return 0;
        if (dateA > dateB) return 1;
        return -1;
    }

    addEventHandlers()
    loadVideos()

})