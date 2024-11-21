
let siteName = document.getElementById("bookmarkName");
let siteURL = document.getElementById("bookmarkURL");
let bookmarks=[];

let submitBtn = document.getElementById("submitBtn");


let tableContent = document.getElementById("tableContent");


let deleteBtns;
let visitBtns;

let closeBtn = document.getElementById("closeBtn");
let box = document.querySelector(".box-info");



if (localStorage.getItem("bookmarksList")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
    for (let x = 0; x < bookmarks.length; x++) {
    displayBookmark(x);
    }
  }




function displayBookmark(index)
{
    let userURL = bookmarks[index].siteURL;
    let httpsRegex = /^https?:\/\//g;
    if (httpsRegex.test(userURL)) {
    validURL = userURL;
    fixedURL = validURL
        .split("")
        .splice(validURL.match(httpsRegex)[0].length)
        .join("");
    } else {
    let fixedURL = userURL;
    validURL = `https://${userURL}`;
    }
    let newBookmark = `
                <tr>
                <td>${index + 1}</td>
                <td>${bookmarks[index].siteName}</td>
                <td>
                    <button class=" btn-visit" data-index="${index}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                </td>
                <td>
                    <button class=" btn-delete pe-2" data-index="${index}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                    </button>
                </td>
            </tr>
            `;
    tableContent.innerHTML +=newBookmark;

    

    deleteBtns = document.querySelectorAll(".btn-delete");
    if (deleteBtns) {
    for (let j = 0; j < deleteBtns.length; j++) {
        deleteBtns[j].addEventListener("click", function (e) {
        deleteBookmark(e);
        });
    }
    }


    visitBtns = document.querySelectorAll(".btn-visit");
    if (visitBtns) {
    for (var l = 0; l < visitBtns.length; l++) {
        visitBtns[l].addEventListener("click", function (e) {
        visitWebsite(e);
        });
    }
    }
}




function clear()
{
    siteName.value="";
    siteURL.value="";
}



function deleteBookmark(e) {
    tableContent.innerHTML = "";
    let deletedIndex = e.target.dataset.index;
    bookmarks.splice(deletedIndex, 1);
    for (let k = 0; k < bookmarks.length; k++) {
    displayBookmark(k);
    }
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}





function visitWebsite(e) {
    let websiteIndex = e.target.dataset.index;
    let httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarks[websiteIndex].siteURL)) {
    open(bookmarks[websiteIndex].siteURL);
    } else {
    open(`https://${bookmarks[websiteIndex].siteURL}`);
    }
}







submitBtn.addEventListener("click", function () {
    if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
    ) {
        let bookmark = {
        siteName: siteName.value,
        siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);
    clear();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
    } else {
    box.classList.remove("d-none");
    }
});






let nameRegex = /^\w{3,}(\s+\w+)*$/;
let urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
    validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
    validate(siteURL, urlRegex);
});

function validate(element, regex) {
    let testRegex = regex;
    if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    }
}







function closeModal() {
    box.classList.add("d-none");
}


closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
    closeModal();
    }
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("box-info")) {
    closeModal();
    }
});





















// let siteName = document.getElementById("bookmarkName");
// let siteURL = document.getElementById("bookmarkURL");
// let bookmarks=[];


// function add()
// {
//     let bookmark = 
//     {
//         siteName: siteName.value,
//         siteURL: siteURL.value,
//     };
//     bookmarks.push(bookmark);

// }

// function displayBookmark()
// {

// }











