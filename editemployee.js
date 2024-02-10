// edit employee
let editemployee = document.getElementById("editPopup");
function editEmployeePopup(employeeId) {https://www.youtube.com/watch?v=y9f1jfzo6EEtha'
    editEmployeeDetails(employeeId);
    editemployee.style.display = 'block';
    modalBackgroundDisplay();
}

let editCloseBtn = document.getElementById('editCloseBtn');
let editCancelBtn = document.getElementById('editCancelBtn');

editCloseBtn.onclick = closeEditEmployee;
editCancelBtn.onclick = closeEditEmployee;

function closeEditEmployee() {
    editemployee.style.display = 'none';
    modalBackgroundNone();
}

// Edit popup
function changeDateFormat(v) {
    const arr = v.split('-');
    let formattedDate = `${arr[2]}-${arr[1]}-${arr[0]}`;
    return formattedDate;
}
// Edit Employee Modal
function editEmployeeDetails(employeeId) {
    fetch(`http://localhost:3000/employees/${employeeId}`)
        .then((response) => response.json())
        .then((employee) => {

            document.getElementById('editsalutation').value = employee.salutation;
            document.getElementById('editfirstname').value = employee.firstName;
            document.getElementById('editlastname').value = employee.lastName;
            document.getElementById('editemail').value = employee.email;
            document.getElementById('editmobile').value = employee.phone;
            document.getElementById('editdatepicker').value = formatDate(employee.dob);
            document.querySelector(`input[name="editgender"][value="${employee.gender}"]`).checked = true;
            document.getElementById('editaddress').value = employee.address;
            document.getElementById('editqualification').value = employee.qualifications;
            document.getElementById('editcountry').value = employee.country;
            document.getElementById('editstate').value = employee.state;
            document.getElementById('editcity').value = employee.city;
            document.getElementById('editzip').value = employee.pincode;
            document.getElementById('editUserName').value = employee.username;
            document.getElementById('editpassword').value = employee.password;

            // Load employee avatar image
            loadEmployeeAvatar(employeeId);
        });


    document.getElementById('savechanges').addEventListener('click', function (event) {
        event.preventDefault();
        editvalidation();
        //editvalidation run avanam 
        if (editvalidation()){  
        saveEditedEmployee(employeeId);
        }
    });

    // for image upload
    updateImage();
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
}

function updateImage() {
    const updateUserImage = document.getElementById('editImgUpload');

    updateUserImage.addEventListener('change', function (event) {
        const selectedImage = updateUserImage.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const imageUrl = event.target.result;
            const newEmpImage = document.getElementById('editImgPreview');
            newEmpImage.src = imageUrl;
        };

        reader.readAsDataURL(selectedImage);
    });
}

async function saveEditedEmployee(employeeId) {
    try {

        const editedEmployee = {
            salutation: document.getElementById('editsalutation').value,
            firstName: document.getElementById('editfirstname').value,
            lastName: document.getElementById('editlastname').value,
            email: document.getElementById('editemail').value,
            phone: document.getElementById('editmobile').value,
            dob: formatDate(document.getElementById('editdatepicker').value),
            gender: document.querySelector('input[name="editgender"]:checked').value,
            address: document.getElementById('editaddress').value,
            qualifications: document.getElementById('editqualification').value,
            country: document.getElementById('editcountry').value,
            state: document.getElementById('editstate').value,
            city: document.getElementById('editcity').value,
            pincode: document.getElementById('editzip').value,
            username: document.getElementById('editUserName').value,
            password: document.getElementById('editpassword').value,
        };

        // to update employee details
        await fetch(`http://localhost:3000/employees/${employeeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedEmployee),
        });

        // Upload employee image
        const file = document.getElementById('editImgUpload').files[0];
        await uploadImage(employeeId, file);
        closeEditEmployee();
        showEmployees();
        editedSuccessfullyModal();
    } catch (error) {
        console.error('Error editing employee:', error);
    }
}

// function to upload employee image
async function uploadImage(employeeId, file) {
    console.log(employeeId);

    const empAvatar = new FormData();
    empAvatar.append('avatar', file);

    fetch(`http://localhost:3000/employees/${employeeId}/avatar`, {
        method: 'POST',
        body: empAvatar
    }).then((res) => res.json())
        .then((value) => console.log(value))
        .catch((error) => console.error(error));
}
// function to preview employee image

function loadEmployeeAvatar(employeeId) {
    fetch(`http://localhost:3000/employees/${employeeId}/avatar`)
        .then((res) => res.blob())
        .then((employees) => {
            const imageUrl = URL.createObjectURL(employees);
            const empImageBanner = document.getElementById('editImgPreview');

            empImageBanner.src = imageUrl;
        });
}