var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteURL');
var bookmarkList = document.getElementById('bookMakerList');
var siteSubmit = document.getElementById('siteSubmit');
var siteDelete = document.getElementById('siteDelete');
var siteClear = document.getElementById('siteClear');
var nameAlert = document.getElementById('nameAlert');
var urlAlert = document.getElementById('urlAlert');


if (localStorage.getItem('urlLinks') == null) {
    var urlLinks = [];

}
else {
    var urlLinks = JSON.parse(localStorage.getItem('urlLinks'));

}

displayUrlLinks()

siteSubmit.addEventListener('click', function () {



    if (siteName.value == "" && siteUrl.value == "") {
        nameAlert.innerHTML = "Name is required";
        nameAlert.classList.add("alert", "alert-danger", "mt-2", "p-1");
        urlAlert.innerHTML = "Url Field is required";
        urlAlert.classList.add("alert", "alert-danger", "mt-2", "p-1");
        console.log("case1");
    }
    else if (siteName.value == "") {
        clearAlerts();
        nameAlert.innerHTML = "Name is required";
        nameAlert.classList.add("alert", "alert-danger", "mt-2", "p-1");
    }
    else if (siteUrl.value == "") {
        clearAlerts();
        urlAlert.innerHTML = "Url Field is required";
        urlAlert.classList.add("alert", "alert-danger", "mt-2", "p-1");
    }
    else if (siteUrl.value.toLowerCase().startsWith('https:') == false ||
        siteUrl.value.toLowerCase().includes('.com') == false ||
        siteUrl.value.toLowerCase().includes(" ")) {
        clearAlerts();
        nameAlert.innerHTML = "URL link is not correct";
        nameAlert.classList.add("alert");
        nameAlert.classList.add("alert-danger");
        nameAlert.classList.add("mt-2");
        nameAlert.classList.add("p-1");
    }

    else if (siteName.value != "" && siteUrl.value != "") {
        clearAlerts();
        for (var i = 0; i < urlLinks.length; i++) {
            if (siteUrl.value.toLowerCase() == urlLinks[i].websiteURL) {
                nameAlert.innerHTML = "this url already exist";
                nameAlert.classList.add("alert");
                nameAlert.classList.add("alert-danger");
                nameAlert.classList.add("mt-2");
                nameAlert.classList.add("p-1");
                console.log("case 2")
                break;
            }
            else if (siteName.value.toLowerCase() == urlLinks[i].bookmarkName) {
                nameAlert.innerHTML = "this name already exist";
                nameAlert.classList.add("alert");
                nameAlert.classList.add("alert-danger");
                nameAlert.classList.add("mt-2");
                nameAlert.classList.add("p-1");
                console.log("case 3");
                break;
            }


        }
        if (i == urlLinks.length) {
            var urlObject = {
                bookmarkName: siteName.value,
                websiteURL: siteUrl.value
            };

            urlLinks.push(urlObject);
            localStorage.setItem('urlLinks', JSON.stringify(urlLinks));
            console.log(urlObject);
            console.log("case4");
            displayUrlLinks()
            clearInputs();
            clearAlerts();
        }
    }

}

);


siteDelete.addEventListener('click', function () {
    deleteAllUrlLiks();
});

siteClear.addEventListener('click', function () {
    clearAlerts();
    clearInputs();
});

// function addUrlLinks() {
//     var urlObject = {
//         bookmarkName: siteName.value,
//         websiteURL: siteUrl.value
//     };

//     urlLinks.push(urlObject);
//     localStorage.setItem('urlLinks', JSON.stringify(urlLinks));
//     console.log(urlObject);
//     displayUrlLinks()

// }


function displayUrlLinks() {
    var divs = "";
    for (var i = 0; i < urlLinks.length; i++) {


        divs += `<div class="container pt-4 pb-1 px-4 mt-5 d-flex flex-wrap justify-content-between align-items-center ">
                 <div class=" w-50">
                 <h3 class="text-capitalize fs-5">${urlLinks[i].bookmarkName}</h3>
                 </div>
                 <div class=" w-50 text-end">
                 <a href="${urlLinks[i].websiteURL}" target="_blank" type="button" class="btn btn-primary px-3 me-3">Visit</a>
                 <a href="" type="button" class="btn btn-danger px-3" onClick = "deleteUrlLiks(${i})" >Delete</a>
                 </div> </div>`;
    }

    bookmarkList.innerHTML = divs;
}

function deleteUrlLiks(i) {
    urlLinks.splice(i, 1);
    localStorage.setItem('urlLinks', JSON.stringify(urlLinks));
    displayUrlLinks();
}
function deleteAllUrlLiks() {
    urlLinks.splice(0);
    localStorage.setItem('urlLinks', JSON.stringify(urlLinks));
    displayUrlLinks();
}


function clearInputs() {
    siteName.value = "";
    siteUrl.value = "";
}
function clearAlerts() {
    nameAlert.innerHTML = "";
    urlAlert.innerHTML = "";
    nameAlert.classList.remove("alert", "alert-danger", "mt-2", "p-1");
    urlAlert.classList.remove("alert", "alert-danger", "mt-2", "p-1");
}

