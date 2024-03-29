let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log(id);
function employeeDetailsById(id) {
    fetch(`http://localhost:3000/employees/${id}`, {
        method: "GET",
    })
        .then(res => res.json())
        .then(employee => {
            console.log(employee);
            // calculate age 
            let dobParts = employee.dob.split('-');
            let day = parseInt(dobParts[0], 10);
            let month = parseInt(dobParts[1], 10) - 1; 
            let year = parseInt(dobParts[2], 10);
            let dob = new Date(year, month, day);
            console.log(dob);
            let currentDate = new Date();
              
            let age = currentDate.getFullYear() - dob.getFullYear();
            console.log(dob.getFullYear());
            if (currentDate.getMonth() < dob.getMonth() || (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())) {
                age--;
            }
            console.log(age);
             const capitalizedFirstName = employee.firstName.charAt(0).toUpperCase() + employee.firstName.slice(1);
                const capitalizedLastName = employee.lastName.charAt(0).toUpperCase() + employee.lastName.slice(1);
            const employeeDetails = document.getElementById('contentArea');
            employeeDetails.innerHTML = `
            <header class="header">
                <div class="pageTitle">
                    <h6>Dashboard / <a href="index.html"> Employees / </a>employee</h6>
                    <h1>Employee Details</h1>
                </div>
            </header>
            <div class="employeeProfile" id="employeeProfile">
            <div class="profileView">
                <div class="cover">
                    <img class="profileCover" src="projectimages/Background Image.png" alt="userCover">
                    <img class="profilePhoto" src="http://localhost:3000/employees/${employee.id}/avatar" alt="profilepic">
                </div>
                <div class="userName">
                    <h5>${capitalizedFirstName} ${capitalizedLastName}</h5>
                    <small>${employee.email}</small>
                </div>
                <div class="profileDetails">
                    <div class="profilecol_3">
                        <div class="gridpro">
                            <small>Gender</small>
                            <p>${employee.gender}</p>
                        </div> 
                        <div class="gridpro">
                            <small>Age</small>
                            <p>${age}</p>
                        </div>
                        <div class="gridpro">
                            <small>Date of Birth</small>
                            <p>${employee.dob}</p>
                        </div>
                    </div>
                    <div class="profilecol_2">
                        <div class="gridpro">
                            <small>Mobile Number</small>
                            <p>${employee.phone}</p>
                        </div>
                        <div class="gridpro">
                            <small>Qualification</small>
                            <p>${employee.qualifications}</p>
                        </div>
                    </div>
                    <div class="gridpro">
                    <small>Address</small>
                    <p>${employee.address}</p>
                </div>
                    <div class="profilecol_3">
                        <div class="gridpro">
                            <small>Country</small>
                            <p>${employee.country}</p>
                        </div>
                        <div class="gridpro">
                            <small>State</small>
                            <p>${employee.state}</p>
                        </div>
                        <div class="gridpro">
                            <small>City</small>
                            <p>${employee.city}</p>
                        </div>
                    </div>
                    <div class="profilecol_2">
                    <div class="gridpro">
                            <small>Pin/Zip</small>
                            <p>${employee.pincode}</p>
                        </div>
                        <div class="gridpro">
                            <small>Username</small>
                            <p>${employee.username}</p>
                        </div>
                    </div>
                </div>
                <div class="profileButtons">
                    <button type="button" class="btn dltbtn filledButton" onclick="deleteEmployee('${employee.id}')">Delete</button>
                    <button class="btn filledButton" onclick="editEmployeePopup('${employee.id}')">Edit Details</button>
                </div>
            </div>
        `
        })
}
employeeDetailsById(id);
