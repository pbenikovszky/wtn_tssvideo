window.addEventListener('load', function () {


    let categories = [];
    let filterCategoriesField = document.getElementById("category-filter-field");
    let newCategoryField = document.getElementById("new-category-field");
    const changeModal = document.querySelector('.tss-modal-container')
    const txtNewValue = document.querySelector('#new-value')
    let selectedCategory = ""

    async function loadCategories() {
        let url =
            "index.php?option=com_tssvideo&task=managecategories&job=getcategories&format=json";

        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        categories = result.categories;
        renderCategoryTable(categories);
    }

    function resetCategoryTable() {
        document.querySelector("#category-table-body").innerHTML = "";
    }

    function renderCategoryTable(categoryList) {
        resetCategoryTable();
        const categoryTableBody = this.document.querySelector(
            "#category-table-body"
        );
        categoryList
            .slice()
            .reverse()
            .forEach(function (tag) {
                const newCategory = createCategoryRow(tag);
                categoryTableBody.prepend(newCategory);
            });
    }

    function createCategoryRow(label) {
        const tableRow = document.createElement("tr");

        const categoryNameColumn = document.createElement("td");
        categoryNameColumn.innerHTML = label;

        const editColumn = document.createElement("td");
        editColumn.classList.add("category-table-button");
        editColumn.innerHTML = "Szerkesztés";
        editColumn.setAttribute("data-item", label);

        const deleteColumn = document.createElement("td");
        deleteColumn.classList.add("category-table-button");
        deleteColumn.innerHTML = "Törlés";
        deleteColumn.setAttribute("data-item", label);

        editColumn.addEventListener('click', function (e) {
            txtNewValue.value = e.target.getAttribute("data-item")
            changeModal.classList.add('visible')
            txtNewValue.focus()
            selectedCategory = txtNewValue.value
        })

        deleteColumn.addEventListener("click", function (e) {
            deleteCategory(e.target.getAttribute("data-item"));
        });

        tableRow.appendChild(categoryNameColumn);
        tableRow.appendChild(editColumn);
        tableRow.appendChild(deleteColumn);

        return tableRow;
    }

    filterCategoriesField.addEventListener("keyup", function (e) {
        let tempArray = [];
        categories.forEach(item => {
            if (item.toLowerCase().indexOf(this.value.toLowerCase()) != -1) {
                tempArray.push(item);
            }
        });
        renderCategoryTable(tempArray);
    });

    newCategoryField.addEventListener("keyup", function (e) {
        if (e.keyCode == 13 && this.value != "") {
            createNewCategory(this.value);
        }
    });

    async function createNewCategory(category) {
        if (categories.includes(category)) {
            alert("Ezzel a névvel már szerepel címke az adatbázisban");
            return;
        }

        let url = "index.php?option=com_tssvideo&task=managecategories&format=json";

        const data = "job=newcategory&newcategoryname=" + category;

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

        categories.push(category);
        categories.sort(function (a, b) {
            a = a.toLowerCase();
            b = b.toLowerCase();
            if (a == b) return 0;
            if (a > b) return 1;
            return -1;
        });
        renderCategoryTable(categories);
        newCategoryField.value = "";
    }

    async function deleteCategory(category) {

        let userAnswer = confirm("Biztos hogy törölni akarod a '" + category + "' kategóriát?");
        if (userAnswer == false) {
            return
        }

        let url = "index.php?option=com_tssvideo&task=managecategories&format=json";

        const data = "job=deletecategory&categorytodelete=" + category;

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
            const index = categories.indexOf(category);
            categories = [
                ...categories.slice(0, index),
                ...categories.slice(index + 1)
            ];
            renderCategoryTable(categories);
            filterCategoriesField.value = "";
        }
    }


    function addEventHandlers() {
        const btnVideos = document.querySelector("#btn-videos");
        const btnNewVideo = document.querySelector("#btn-new-video");
        const btnManageTags = document.querySelector("#btn-manage-tags");

        btnVideos.addEventListener('click', function () {
            window.location.href = "index.php?option=com_tssvideo&view=videoadmin&task=videos"
        })

        btnNewVideo.addEventListener('click', function () {
            window.location.href = "index.php?option=com_tssvideo&view=videoadmin&task=newvideo"
        })

        btnManageTags.addEventListener('click', function () {
            window.location.href = "index.php?option=com_tssvideo&view=videoadmin&task=tags"
        })

        // Handling the modal button events
        const btnSave = document.querySelector('#btn-save')
        const btnCancel = document.querySelector('#btn-cancel')
        const txtNewValue = document.querySelector('#new-value')

        const saveChange = async () => {

            if (categories.includes(txtNewValue.value)) {
                alert("Ezzel a névvel már szerepel címke az adatbázisban");
                return;
            }

            let userAnswer = confirm("A következő csere kerül rögzítésre:\n" + selectedCategory + " => " + txtNewValue.value +
                "\nBiztosan folytatni akarod?");
            if (userAnswer == false) {
                return
            }

            let url = "index.php?option=com_tssvideo&task=managecategories&format=json";

            const data = "job=updatecategory&oldvalue=" + selectedCategory + "&newvalue=" + txtNewValue.value;

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

            if (selectedCategory == txtNewValue.value || txtNewValue.value == "") {
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


    }

    addEventHandlers()
    loadCategories()
})