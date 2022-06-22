const API_URL = "https://62ab6beda62365888bdc2f11.mockapi.io/Hw13";
let apiTable = document.querySelector("#myTable tbody");
let tableHeader = document.querySelector("#myTable thead tr");
let table = document.querySelector('table');
let headerSet = new Set();
let rowSet = new Set();

function readURL() {
  apiTable.innerHTML = '';
  fetch(`${API_URL}`)
    .then((response) => response.json())
    .then((data) => {
        fillTable(data)
    });
}

function fillTable(data) {
    data.forEach(row => {
        headerSet.add(row.SiteId);
        rowSet.add(row.ProjectId);
    })
   let headerItems = Array.from(headerSet.keys());
   headerItems.sort();
   generateHeader(headerItems);
   generateRows(rowSet);
   data.forEach(row => addTarget(row));

}

function generateHeader(headers) {
    headers.forEach(function (siteId) {
        const siteIdCol = document.createElement('th');
        siteIdCol.dataset.id = siteId;
        siteIdCol.setAttribute('class', 'border-b-2 px-8 py-2');
        siteIdCol.innerHTML = siteId;
        tableHeader.appendChild(siteIdCol);
    })
}


function generateRows(rows) {
    rows.forEach(function(projectId) {
        const tableRow = document.createElement('tr');
        const projectRows = document.createElement('td');
        projectRows.setAttribute('class', 'border-r-2 px-4 py-4 text-center');
        tableRow.dataset.id = projectId;
        tableRow.setAttribute('class', 'border-b-2 px-8 py-4');
        projectRows.innerHTML = projectId;
        tableRow.appendChild(projectRows);
        for (let i = 0; i < headerSet.size; i++) {
            const tableCell = document.createElement('td');
            tableCell.setAttribute('class', 'px-8 py-4');
            tableCell.dataset.id = i+1;
            tableCell.innerHTML = ' ';
            tableRow.appendChild(tableCell);
        }
        apiTable.appendChild(tableRow);
    }) 
}

function addTarget(rows) {
    let sId = rows.SiteId;
    let pId = rows.ProjectId;
    let target = rows.Target;
    let targetRow = apiTable.querySelector(`[data-id="${pId}"]`);
    let targetCol = targetRow.querySelector(`[data-id="${sId}"]`);
    targetCol.innerHTML = target;
}

readURL();