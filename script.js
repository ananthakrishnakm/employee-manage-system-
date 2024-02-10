// add employee button
let addEmployeeBtn = document.getElementById('addEmployee');
let addEmployeePopup = document.querySelector('.addEmployeePopup .modal');
let addEmployeeClose = document.querySelector('#addEmployeePopupClose');
let addEmployeecancelButton = document.querySelector('#addEmployeecancelButton');
function openPopup() {
    clearForm();
    showInputImg();
    modalBackgroundDisplay();
    addEmployeePopup.style.display = 'block';
}
function closeAddEmployee() {
    addEmployeePopup.style.display = 'none';
    modalBackgroundNone();
   // clearForm();
}
addEmployeeBtn.onclick = openPopup;
addEmployeeClose.onclick = closeAddEmployee;
addEmployeecancelButton.onclick = closeAddEmployee;
// dropdown menu
function openBtn(dropdownId) {
    let dropdowns = document.getElementsByClassName('employeebtn');
    for (let i = 0; i < dropdowns.length; i++) {
        let dropdown = dropdowns[i];
        if (dropdown.id === dropdownId) {
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            } else {
                dropdown.style.display = 'block';
            }
        } else {
            dropdown.style.display = 'none';
        }
    }
}
document.addEventListener('click', function (event) {
    let dropdowns = document.getElementsByClassName('employeebtn');
    for (let i = 0; i < dropdowns.length; i++) {
        let dropdown = dropdowns[i];
                    if (event.target.closest('.dropdown') !== null) {
continue;
        }
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
    }
});
function viewEmployee(employeeId) {
    // window.open("http://127.0.0.1:5500/myproject/java/employeedetails.html?id=${employeeId}","_blank")
    const viewUrl = `http://127.0.0.1:5500/javascript%20project/page2.html?id=${employeeId}`;
    window.location.href = viewUrl;
}
// search function
function Search() {
    let input, searchText, tableBody, tr, td, i, j, textValue;

    input = document.getElementById('search');
    searchText = input.value.toUpperCase();
    tableBody = document.getElementById('tablebody');
    tr = tableBody.getElementsByTagName('tr');
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td');
        let rowMatch = false;

        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                textValue = td[j].textContent || td[j].innerText;
                if (textValue.toUpperCase().indexOf(searchText) > -1) {
                    rowMatch = true;
                    break;
                }
            }
        }
        if (rowMatch) {
            tr[i].style.display = '';
        } else {
            tr[i].style.display = 'none';
        }
    }
}
// pagination
function pagenumbervisibletotalPages(pageCount) {
    let paginationblock = document.querySelector('.pagenumber');
    if (pageCount <= 1) {
        paginationblock.style.display = 'none';
    }
    else {
        paginationblock.style.display = 'flex';
    }
}
let CurrentPage = 1;
function pagination(pageCount) {
    pagenumbervisibletotalPages(pageCount);
    var pgnum = document.getElementById("pagenumbers"); // div element where the pagination buttons are displayed
    let temp = '';
    for (let i = 1; i <= pageCount; i++) {
        temp += `<button class="page-item" id="page${i}">${i}</button>`;
    }
    pgnum.innerHTML = temp;
    pgnum.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
            const pageNumber = parseInt(e.target.textContent);
            if (!isNaN(pageNumber)) {
                CurrentPage = pageNumber;
                showEmployees();
            }
        }
    });
    let pageLeftButton = document.getElementById("previous");
    let pageRightButton = document.getElementById("next");
    // Use CSS to control button visibility
    if (CurrentPage === 1) {
        pageLeftButton.classList.add('hidden');
    } else {
        pageLeftButton.classList.remove('hidden');
    }
    if (CurrentPage === pageCount) {
        pageRightButton.classList.add('hidden');
    } else {
        pageRightButton.classList.remove('hidden');
    }
    pageLeftButton.addEventListener("click", function (e) {
        if (CurrentPage > 1) {
            console.log('previous')
            CurrentPage--;
            showEmployees(CurrentPage);
        }
    });
    pageRightButton.addEventListener("click", function () {
        if (CurrentPage < pageCount) {
            CurrentPage++;
            showEmployees(CurrentPage);
        }
    });
}
//end of pagination
// employee added successfully Modal
let empAdded = document.getElementById('empAdded');

function addEmpSuccessfulModal() {
    modalBackgroundDisplay();
    empAdded.style.display = 'block';
}
function closeEmpAddedModal() {
    modalBackgroundNone();
    empAdded.style.display = 'none';
    showEmployees();
}
// employee deleted successfully
let editedSuccessfully = document.getElementById('editedSuccessfully');
function editedSuccessfullyModal() {
    editedSuccessfully.style.display = 'block';
    modalBackgroundDisplay();
}
function closeEmpEditModal() {
    editedSuccessfully.style.display = 'none';
    modalBackgroundNone();
    showEmployees();
}
// hide input img file
function hideInputImg() {
    let hide = document.querySelector('.fw-bold.hide');
    let show = document.querySelector('.fw-bold.show');
    hide.style.display = 'none';
    show.style.display = 'block';
}
function showInputImg() {
    let hide = document.querySelector('.fw-bold.hide');
    let show = document.querySelector('.fw-bold.show');
    if (hide.style.display === 'none') {
        hide.style.display = 'block';
        show.style.display = 'none';
    }
}
// // Close the list when clicking outside
//         document.addEventListener("click", function (event) {
//             if (!dropdownMenu.contains(event.target)) {
//                 dropdownMenu.style.display = "none";
//             }
//         });