// get all needed elements from DOM
let SiteName = document.getElementById("SiteName");
let SiteURL = document.getElementById("SiteURL");
let strong = document.getElementsByTagName("strong")[0];
let tBody = document.getElementById("tableRow");
let date = document.getElementById("date");
let errorContainer = document.getElementById("alertNameInput");
let content = [];
// first we will create a function to check if the url is valid we cauld we rgx too.
const isUrlValid = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
// function to display data from local storage
let data;
const display = () => {
  data = "";
  for (let i = 0; i < content.length; i++) {
    data += `
     <tr class="d-flex flex-column col-12 col-md-6 mb-2  ">
            <td >${content[i].name}</td>
            <td class="handleLongUrl w-100 " >${content[i].url}</td>
          <td><button onclick="vistLink(${i})"  class="btn w-25 vis btn-primary">Visit</button></td>
          <td><button onclick="deleteBtn(${i});" class="btn w-25 del btn-danger">Delete</button></td>
          <td><div class="border border-danger"></div></td>
          </tr>
          `;
  }
  tBody.innerHTML = data;
};
// check is exist local storage already
if (window.localStorage.getItem("content") !== null) {
  content = JSON.parse(localStorage.getItem("content"));
  display();
}
const setError = (feild, msg) => {
  strong.innerHTML = `${msg}`;
  errorContainer.classList.remove("hidden");
  errorContainer.classList.add("failed");
  errorContainer.classList.add("alert");
  feild.classList.add("red-border");
};
const setSuccess = (feild) => {
  strong.innerHTML = ``;
  errorContainer.classList.add("hidden");
  errorContainer.classList.remove("failed");
  feild.classList.remove("red-border");
  errorContainer.classList.remove("alert");
};
// create function to validate the feild
const feildValidation = (feild, urlValidation) => {
  if (feild.value.trim() === "") {
    setError(feild, "You can't leave the feild empty");
  } else if (urlValidation && !urlValidation(feild.value.trim())) {
    console.log("url is  not valid");
    setError(feild, "Please enter valid URL");
  } else {
    setSuccess(feild);
    return true;
  }
};
SiteName.addEventListener("blur", () => {
  feildValidation(SiteName, null);
});
SiteURL.addEventListener("blur", () => {
  feildValidation(SiteURL, isUrlValid);
});

const validateInputs = () => {
  let validName = feildValidation(SiteName, null);
  let validUrl = feildValidation(SiteURL, isUrlValid);
  if (validName && validUrl) {
    return true;
  }
};
// function to add new url
function add() {
  let result = validateInputs();
  // check if every Thing is OK
  if (result) {
    // add this data to local storage
    content.push({ name: SiteName.value.trim(), url: SiteURL.value.trim() });
    window.localStorage.setItem("content", JSON.stringify(content));
    display();
  }
  SiteName.value = "";
  SiteURL.value = "";
}
function deleteBtn(index) {
  let element = document.getElementsByClassName("del")[index];
  let step = element.parentElement;
  let target = step.parentElement;
  if (target) target.remove();
  content.splice(index, 1);
  localStorage.setItem("content", JSON.stringify(content));
  if (content.length === 0) localStorage.clear();
  // to upDate new indexes
  display();
}
function vistLink(index) {
  window.open(content[index].url, "_blank");
}
// update the year automatic
const upDateDate = () => {
  let dateYear = new Date();
  date.innerHTML = `© ${dateYear.getFullYear()} Bookmarker Inc.`;
};
upDateDate();
