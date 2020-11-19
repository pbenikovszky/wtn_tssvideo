window.addEventListener('load', function () {


    let tags = [];
    let visibleTags = [];
    const filterTagsField = document.getElementById("tag-filter-field");
    const newTagField = document.getElementById("new-tag-field");
    const changeModal = document.querySelector('.tss-modal-container')
    const txtNewValue = document.querySelector('#new-value')
    const cbSortMode = document.querySelector('#select-sorting-option')
    let selectedTag = ""


    const sortTagsByName = (a, b) => {
        nameA = a.tag_name.toLowerCase();
        nameB = b.tag_name.toLowerCase();
        if (nameA == nameB) return 0;
        if (nameA > nameB) return 1;
        return -1;
    }

    const sortTagsByVideocount = (a, b) => {
        countA = a.videocount
        countB = b.videocount
        if (countA == countB) return 0;
        if (countA > countB) return -1;
        return 1;
    }

    async function loadManagedTags() {
        let url =
            "index.php?option=com_tssvideo&task=managetags&job=gettags&format=json";

        const response = await fetch(url);
        const result = await response.json();
        tags = result.tags;
        visibleTags = tags;
        addTags(visibleTags);
    }

    function resetTags() {
        document
            .querySelectorAll(".manage-tags-wrapper .tag")
            .forEach(function (tag) {
                tag.parentElement.removeChild(tag);
            });
    }

    function addTags(tagList) {
        resetTags();

        if (cbSortMode.value == "tag_name") {
            tagList.sort(sortTagsByName)
        } else {
            tagList.sort(sortTagsByVideocount)
        }

        const managedTagsWrapper = this.document.querySelector(
            ".manage-tags-wrapper"
        );
        tagList
            .slice()
            .reverse()
            .forEach(function (tag) {
                const newTag = createTag(tag);
                managedTagsWrapper.prepend(newTag);
            });
    }

    function createTag(tag) {
        const div = document.createElement("div");
        div.classList.add("tag");

        const span = document.createElement("span");
        span.innerHTML = tag.tag_name + " (" + tag.videocount + " db)";

        const btnClose = document.createElement("i");
        btnClose.classList.add("material-icons");
        btnClose.innerHTML = "close";
        btnClose.setAttribute("data-item", tag.tag_name);

        const btnEdit = document.createElement("i");
        btnEdit.classList.add("material-icons");
        btnEdit.innerHTML = "create";
        btnEdit.setAttribute("data-item", tag.tag_name);

        btnEdit.addEventListener('click', function (e) {
            txtNewValue.value = e.target.getAttribute("data-item")
            changeModal.classList.add('visible')
            txtNewValue.focus()
            selectedTag = txtNewValue.value
        })

        btnClose.addEventListener("click", function (e) {
            deleteTag(e.target.getAttribute("data-item"));
        });

        div.appendChild(span);
        div.appendChild(btnEdit);
        div.appendChild(btnClose);

        return div;
    }

    filterTagsField.addEventListener("keyup", function (e) {
        // let tempArray = [];
        visibleTags = []
        tags.forEach(item => {
            if (item.tag_name.toLowerCase().indexOf(this.value.toLowerCase()) != -1) {
                visibleTags.push(item);
            }
        });
        addTags(visibleTags);
    });

    newTagField.addEventListener("keyup", function (e) {
        if (e.keyCode == 13 && this.value != "") {
            createNewTag(this.value.toLowerCase());
            this.value = ""
        }
    });

    async function createNewTag(label) {
        if (tags.includes(label)) {
            alert("Ezzel a névvel már szerepel címke az adatbázisban");
            return;
        }

        console.log(label)

        let url = "index.php?option=com_tssvideo&task=managetags&format=json";

        const data = "job=newtag&newtagname=" + label;

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data
        };

        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        tags.push(label);
        tags.sort();
        addTags(tags);
    }

    async function deleteTag(label) {

        let userAnswer = confirm("Biztos hogy törölni akarod a '" + label + "' címkét?");
        if (userAnswer == false) {
            return
        }

        let url = "index.php?option=com_tssvideo&task=managetags&format=json";

        const data = "job=deletetag&tagnametodelete=" + label;

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data
        };

        const response = await fetch(url, options);
        const result = await response.json();

        if (result.result == "SUCCESS") {
            const index = tags.indexOf(label);
            tags = [
                ...tags.slice(0, index),
                ...tags.slice(index + 1)
            ];
            addTags(tags);
            filterTagsField.value = "";
        } else {}
    }



    function addEventHandlers() {
        const btnVideos = document.querySelector("#btn-videos");
        const btnNewVideo = document.querySelector("#btn-new-video");
        const btnManageCategories = document.querySelector("#btn-manage-categories");

        btnVideos.addEventListener('click', function () {
            window.location.href = "index.php?option=com_tssvideo&view=videoadmin&task=videos"
        })

        btnNewVideo.addEventListener('click', function () {
            window.location.href = "index.php?option=com_tssvideo&view=videoadmin&task=newvideo"
        })

        btnManageCategories.addEventListener('click', function () {
            window.location.href = "index.php?option=com_tssvideo&view=videoadmin&task=categories"
        })

        // Handling the modal button events
        const btnSave = document.querySelector('#btn-save')
        const btnCancel = document.querySelector('#btn-cancel')

        const saveChange = async () => {

            const newTagname = txtNewValue.value.toLowerCase()

            if (tags.includes(newTagname)) {
                alert("Ezzel a névvel már szerepel címke az adatbázisban");
                return;
            }

            let userAnswer = confirm("A következő csere kerül rögzítésre:\n" + selectedTag + " => " + newTagname +
                "\nBiztosan folytatni akarod?");
            if (userAnswer == false) {
                return
            }

            let url = "index.php?option=com_tssvideo&task=managetags&format=json";

            const data = "job=updatetag&oldvalue=" + selectedTag + "&newvalue=" + newTagname;

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data
            };

            const response = await fetch(url, options);
            const result = await response.json();

            if (result.result == "SUCCESS") {
                alert("A kért változtatás sikeresen rögzítve lett.")
                txtNewValue.value = ""
                changeModal.classList.remove('visible')
                window.location.reload()
            }

        }

        txtNewValue.addEventListener('keyup', function (e) {
            if (e.keyCode == '13') {
                saveChange()
            }

            if (e.keyCode == '27') {
                txtNewValue.value = ""
                changeModal.classList.remove('visible')
            }

            if (selectedTag == txtNewValue.value.toLowerCase() || txtNewValue.value == "") {
                btnSave.classList.add('disabled-button')
            } else {
                btnSave.classList.remove('disabled-button')
            }
        })

        btnSave.addEventListener('click', saveChange)

        btnCancel.addEventListener('click', function () {
            txtNewValue.value = ""
            changeModal.classList.remove('visible')
        })

        cbSortMode.addEventListener('change', function () {
            addTags(visibleTags)
        })
    }

    addEventHandlers()
    loadManagedTags()
})