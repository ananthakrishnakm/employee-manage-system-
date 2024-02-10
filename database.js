showEmployees();
const itemsPerPage = 5;                                                                                                                                          
// let employees = [];
async function showEmployees() {
    let output = '';
    await fetch("http://localhost:3000/employees")
        .then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            let employees = data.reverse();
            var pageCount = Math.ceil(employees.length / itemsPerPage);
            pagination(pageCount);
            const start = itemsPerPage * (CurrentPage - 1);
            const end = Math.min(itemsPerPage * CurrentPage, data.length);
            for (var i = start; i < end; i++) {
                const emp = employees[i];
                const dropdownId = `dropdownDetails${i}`;
                const dropdownMenu = `dropMenu${i}`
                let slNo = `${i + 1}`;
                slNo = slNo.padStart(2, "0");
                const capitalizedFirstName = emp.firstName.charAt(0).toUpperCase() + emp.firstName.slice(1).toLowerCase();
                const capitalizedLastName = emp.lastName.charAt(0).toUpperCase() + emp.lastName.slice(1).toLowerCase();
                output += `
            <tr class="tablerow">
                        <td>#${slNo}</td>
                        <td><span><img class="userpic" src="http://localhost:3000/employees/${emp.id}/avatar" alt="user"/>${emp.salutation
                    }. ${capitalizedFirstName} ${capitalizedLastName}</span></td>
                        <td>${emp.email}</td>
                        <td>${emp.phone}</td>
                        <td>${emp.gender}</td>
                        <td>${emp.dob}</td>
                        <td>${emp.country}</td>
                    
                        <td class="dropdown">
                            <div>
                            <button type="button" data-bs-toggle="dropdown" class="disnone" id="${dropdownMenu}"
                            aria-expanded="false" 
                            onclick="openBtn('${dropdownId}')">
                        <span class="material-symbols-outlined">
                            more_horiz
                        </span>
                    </button>
                                <div class="employeebtn" id="${dropdownId}" >
                                    <ul>
                                        <li><a class="dropdown-item" href="javascript:void(0)" onclick="viewEmployee('${emp.id}')"><span class="material-symbols-outlined">
                                                    visibility
                                                </span>View Details</a></li>
                                        <li><a class="dropdown-item" href="javascript:void(0)" onclick="editEmployeePopup('${emp.id}')"><span class="material-symbols-outlined">
                                                    edit
                                                </span>Edit</a></li>
                                        <li><a class="dropdown-item" onclick="deleteEmployee('${emp.id}')"><span class="material-symbols-outlined">
                                                    delete
                                                </span>Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                        </td>
                    </tr>`
                    ;
            }
            return pageCount;
        });

    document.getElementById("tablebody").innerHTML = output;
}


// new img preview 

const chooseFile = document.getElementById("imgUpload");
const imgPreview = document.getElementById("addempimgpreview");

chooseFile.addEventListener("change", function () {
    getImgData();
});



function getImgData() {
    const files = chooseFile.files[0];
    if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            imgPreview.style.display = "block";
            imgPreview.innerHTML = '<img src="' + this.result + '" />';
        });
        hideInputImg();
    }
}

function clearForm() {
    document.getElementById('addEmployeeForm').reset();
    imgPreview.innerHTML = "";
}


let addEmployeeBtnpopup = document.getElementById('addEmpSubmit')
addEmployeeBtnpopup.addEventListener('click', function (e) {
    
    e.preventDefault();
    modalbg.style.display = 'block'; 
    validation();
    let salutation = document.getElementById('salutation').value;
    let firstName = document.getElementById('firstname').value;
    let lastName = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('mobile').value;
    let unordereddob = document.getElementById('datepicker').value;
    let dob = changeDateFormat(unordereddob);
    function changeDateFormat(v) {
        const arr = v.split('-');
        let ordedereddob = `${arr[2]}-${arr[1]}-${arr[0]}`;
        return ordedereddob;
    }
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let qualifications = document.getElementById('qualification').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;
    let country = document.getElementById('country').value;
    let pincode = document.getElementById('zip').value;
    let username = document.getElementById('userName').value;
    let password = document.getElementById('password').value;

    //fetch post request
    if (validation()) {
        fetch("http://localhost:3000/employees", {
            method: 'POST',
            body: JSON.stringify({
                salutation,
                firstName,
                lastName,
                email,
                phone,
                dob,
                gender,
                qualifications,
                address,
                city,
                pincode,
                state,
                country,
                username,
                password
            }),
            headers: {
                "Content-type": "application/json"
            }

        })

            .then((res) => res.json())
            .then(employees => {
                console.log('Employee added:', employees);
                console.log(employees.id);
                // image upload 
                imgPost(employees);

            })

            .catch(error => {
                console.error('Error adding employee:', error);
            });
        showEmployees();
        closeAddEmployee();
        addEmpSuccessfulModal();
    }
});

// image post
function imgPost(employees) {
    // const imgUpload = document.getElementById('imgUpload');
    const formData = new FormData();
    formData.append("avatar", chooseFile.files[0]);
    fetch(`http://localhost:300[employees/${employees.id}/avatar`, {
        method: 'POST',
        body: formData,
    })
        .then(res => {
            console.log(res);

        })
}

//validation

function validation() {
    let salutation = document.getElementById('salutation').value;
    let firstName = document.getElementById('firstname').value;
    let lastName = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('mobile').value;
    let unordereddob = document.getElementById('datepicker').value;
    let dob = changeDateFormat(unordereddob);
    function changeDateFormat(v) {  
        const arr = v.split('-');
        let ordedereddob = `${arr[2]}-${arr[1]}-${arr[0]}`;
        return ordedereddob;
    }
    // let gender = document.querySelector('input[name="gender"]:checked').value;
    let qualifications = document.getElementById('qualification').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;
    let country = document.getElementById('country').value;
    let pincode = document.getElementById('zip').value;
    let username = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    let valError = true;

    // salutation 
    let salutationRegx = (/^[A-Za-z]/);
    let valSum = 0;
    if (salutationRegx.test(salutation)) {
        document.getElementById('salutationValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1; 
    }
    else {
        document.getElementById('salutationValidation').style.display = 'block';
    }
    //  firstName 
    let firstNameRegx = (/^[A-Za-z]/);
    if (firstNameRegx.test(firstName)) {
        document.getElementById('firstnameValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('firstnameValidation').style.display = 'block';
    }
    // lastName 
    let lastNameRegx = (/^[A-Za-z]/);
    if (lastNameRegx.test(lastName)) {
        document.getElementById('lastnameValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('lastnameValidation').style.display = 'block';
    }
    //    email 
    let emailRegx = (/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})$/);
    if (emailRegx.test(email)) {
        document.getElementById('emailValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('emailValidation').style.display = 'block';
    }
    //    phone 
    let phoneRegx = (/^[0-9]{10}$/);
    if (phoneRegx.test(phone)) {
        document.getElementById('mobileValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('mobileValidation').style.display = 'block';
    }
    //    dob 
    let dobRegx = (/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/);
    if (dobRegx.test(dob)) {
        document.getElementById('datepickerValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('datepickerValidation').style.display = 'block';
    }
    //     gender 
    //  let genderRegx = (/^[A-Za-z]/);
    //  if (genderRegx.test(gender)) {
    //      document.getElementById('genderValidation').style.display = 'none';
    //       valError = false;
    //  }
    //  else {
    //      document.getElementById('genderValidation').style.display = 'block';
    //  }
    //    address 
    let addressRegx = (/^[A-Za-z0-9]/);
    if (addressRegx.test(address)) {
        document.getElementById('addressValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('addressValidation').style.display = 'block';
    }
    //    qualifications 
    let qualificationsRegx = (/^[A-Za-z]/);
    if (qualificationsRegx.test(qualifications)) {
        document.getElementById('qualificationValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('qualificationValidation').style.display = 'block';
    }
    //    country 
    let countryRegx = (/^[A-Za-z]/);
    if (countryRegx.test(country)) {
        document.getElementById('countryValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('countryValidation').style.display = 'block';
    }
    //    state 
    let stateRegx = (/^[A-Za-z]/);
    if (stateRegx.test(state)) {
        document.getElementById('stateValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('stateValidation').style.display = 'block';
    }
    //    city 
    let cityRegx = (/^[A-Za-z]/);
    if (cityRegx.test(city)) {
        document.getElementById('cityValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('cityValidation').style.display = 'block';
    }
    //    pincode 
    let pincodeRegx = (/^[0-9]/);
    if (pincodeRegx.test(pincode)) {
        document.getElementById('zipValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('zipValidation').style.display = 'block';
    }
    //    username 
    let usernameRegx = (/^[A-Za-z]/);
    if (usernameRegx.test(username)) {
        document.getElementById('userNameValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('userNameValidation').style.display = 'block';
    }
    //    password 
    let passwordRegx = (/^[A-Za-z0-9]/);
    if (passwordRegx.test(password)) {
        document.getElementById('passwordValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('passwordValidation').style.display = 'block';
    }

    if (valSum === 14) {
        return true;
    }

}
// edit validation
function editvalidation() {
    let salutation = document.getElementById('editsalutation' ).value;
    let firstName = document.getElementById('editfirstname').value;
    let lastName = document.getElementById('editlastname').value;
    let email = document.getElementById('editemail').value;
    let phone = document.getElementById('editmobile').value;
    let unordereddob = document.getElementById('editdatepicker').value;
    let dob = changeDateFormat(unordereddob);
    function changeDateFormat(v) {  
        const arr = v.split('-');
        let ordedereddob = `${arr[2]}-${arr[1]}-${arr[0]}`;
        return ordedereddob;
    }
    // let gender = document.querySelector('input[name="gender"]:checked').value;
    let qualifications = document.getElementById('editqualification').value;
    let address = document.getElementById('editaddress').value;
    let city = document.getElementById('editcity').value;
    let state = document.getElementById('editstate').value;
    let country = document.getElementById('editcountry').value;
    let pincode = document.getElementById('editzip').value;
    let username = document.getElementById('editUserName').value;
    let password = document.getElementById('editpassword').value;
    let valError = true;

    // salutation 
    let salutationRegx = (/^[A-Za-z]/);
    let valSum = 0;
    if (salutationRegx.test(salutation)) {
        document.getElementById('editsalutationValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editsalutationValidation').style.display = 'block';
    }
    //  firstName 
    let firstNameRegx = (/^[A-Za-z]/);
    if (firstNameRegx.test(firstName)) {
        document.getElementById('editfirstnameValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editfirstnameValidation').style.display = 'block';
    }
    // lastName 
    let lastNameRegx = (/^[A-Za-z]/);
    if (lastNameRegx.test(lastName)) {
        document.getElementById('editlastnameValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editlastnameValidation').style.display = 'block';
    }
    //    email 
    let emailRegx = (/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})$/);
    if (emailRegx.test(email)) {
        document.getElementById('editemailValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editemailValidation').style.display = 'block';
    }
    //    phone 
    let phoneRegx = (/^[0-9]{10}$/);
    if (phoneRegx.test(phone)) {
        document.getElementById('editmobileValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editmobileValidation').style.display = 'block';
    }
    //    dob 
    let dobRegx = (/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/);
    if (dobRegx.test(dob)) {
        document.getElementById('editdatepickerValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editdatepickerValidation').style.display = 'block';
    }
    //     gender 
    //  let genderRegx = (/^[A-Za-z]/);
    //  if (genderRegx.test(gender)) {
    //      document.getElementById('genderValidation').style.display = 'none';
    //       valError = false;
    //  }
    //  else {
    //      document.getElementById('genderValidation').style.display = 'block';
    //  }
    //    address 
    let addressRegx = (/^[A-Za-z0-9]/);
    if (addressRegx.test(address)) {
        document.getElementById('editaddressValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editaddressValidation').style.display = 'block';
    }
    //    qualifications 
    let qualificationsRegx = (/^[A-Za-z]/);
    if (qualificationsRegx.test(qualifications)) {
        document.getElementById('editqualificationValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editqualificationValidation').style.display = 'block';
    }
    //    country 
    let countryRegx = (/^[A-Za-z]/);
    if (countryRegx.test(country)) {
        document.getElementById('editcountryValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editcountryValidation').style.display = 'block';
    }
    //    state 
    let stateRegx = (/^[A-Za-z]/);
    if (stateRegx.test(state)) {
        document.getElementById('editstateValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editstateValidation').style.display = 'block';
    }
    //    city 
    let cityRegx = (/^[A-Za-z]/);
    if (cityRegx.test(city)) {
        document.getElementById('editcityValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editcityValidation').style.display = 'block';
    }
    //    pincode 
    let pincodeRegx = (/^[0-9]/);
    if (pincodeRegx.test(pincode)) {
        document.getElementById('editzipValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editzipValidation').style.display = 'block';
    }
    //    username 
    let usernameRegx = (/^[A-Za-z]/);
    if (usernameRegx.test(username)) {
        document.getElementById('edituserNameValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('edituserNameValidation').style.display = 'block';
    }
    //    password 
    let passwordRegx = (/^[A-Za-z0-9]/);
    if (passwordRegx.test(password)) {
        document.getElementById('editpasswordValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editpasswordValidation').style.display = 'block';
    }

    if (valSum === 14) {
        return true;
    }

}