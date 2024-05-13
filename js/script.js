document.addEventListener("DOMContentLoaded", () => {
let spreadsheet_id = '1_p83tn3IUxvnLwZf_fmXo1zbEIOTS3TmeRG0r2V0Yr8';
let tab_name = 'Sheet1'
let api_key = 'AIzaSyCCSEN2cgB1g2Z3GjJYXqO9z1zghBwlf8s';
let url = 'https://sheets.googleapis.com/v4/spreadsheets/' +
           spreadsheet_id + '/values/' + tab_name +
           '?alt=json&key=' + api_key;
  
const employerDropdown = document.getElementById("employer");
const worksiteDropdown = document.getElementById("worksite");
const worksiteDropdownWrapper = document.getElementById("worksites");
const repName = document.getElementById("repName");
const repNumber = document.getElementById("repNumber");
const repEmail = document.getElementById("repEmail");

let dataVar;
fetch(url)
  .then(response => response.json())
  .then(data => {
    dataVar = data.values;
    console.log(data);
  })
.then(() => {
function getData() {
let employerList = [""];
employerDropdown.innerHTML = "";
    for (i = 0; i < dataVar.length; i++) {
      employerList[i] = (dataVar[i][0]);
    }
  let employerSet = new Set (employerList);
  employerList = Array.from(employerSet);
  for (j = 0; j < employerList.length; j++) {
    let opt = document.createElement('option');
    opt.value = employerList[j];
    opt.innerHTML = employerList[j];
    employerDropdown.appendChild(opt);
}
  filterWorksites();
}

getData();

function filterWorksites() {
  worksiteDropdown.innerHTML = "";
    let worksiteList = [];
    for (var i = 0; i < dataVar.length; i++) {
    if (dataVar[i][0] === employerDropdown.value) {
        worksiteList.push(dataVar[i][1]);
    }
}
    
      for (j = 0; j < worksiteList.length; j++) {
      let opt = document.createElement('option');
      opt.value = worksiteList[j];
      opt.innerHTML = worksiteList[j];
      worksiteDropdown.appendChild(opt);
      }
  displayRepInfo();
}

filterWorksites();

function displayRepInfo() {
  repName.innerHTML = "";
  repNumber.innerHTML = "";
  repEmail.innerHTML = "";
      console.log(worksiteDropdown.value)
  for (var k = 0; k < dataVar.length; k++) {
           console.log("Data Variable:" + dataVar[k][1]);
           console.log("Dropdown Variable:" + worksiteDropdown.value);
    if (dataVar[k][1] == worksiteDropdown.value) {
      repName.innerHTML = dataVar[k][2];       repNumber.innerHTML = dataVar[k][3];
      repEmail.innerHTML = dataVar[k][4];
    }
}
};
  
employerDropdown.addEventListener("change", filterWorksites);
worksiteDropdown.addEventListener("change", displayRepInfo);

getData();
  });
});
