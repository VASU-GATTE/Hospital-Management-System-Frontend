let API = "/api/doctors";
let doctorsList = [];

async function adddoctor(e) {
  e.preventDefault(); 
  let adddoctorform = document.forms.adddoctorform;

  let doc = {
    name: adddoctorform.name.value,
    email: adddoctorform.email.value,
    gender: adddoctorform.gender.value,
    mobile: adddoctorform.mobile.value,
    specialization: adddoctorform.specialization.value,
    experience: adddoctorform.experience.value,
    degrees: adddoctorform.degrees.value,
    salary: adddoctorform.salary.value,
  };

  doctorsList.push(doc);

  let res = await fetch(API, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(doc),
  });
  let data = await res.json();
  display();
}

async function display() {
  let res = await fetch(API, {
    method: "GET",
  });
  let data = await res.json();
  let trs = "";
  for (let ind of data) {
    trs += `
            <tr>
                <td>${ind.id}</td>
                <td>${ind.name}</td>
                <td>${ind.email}</td>
                <td>${ind.gender}</td>
                <td>${ind.mobile}</td>
                <td>${ind.specialization}</td>
                <td>${ind.experience}</td>
                <td>${ind.degrees}</td>
                <td>${ind.salary}</td>
                <td><button class="btn btn-primary" onclick="editDoctor(${ind.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button></td>
                <td><button class="btn btn-danger" onclick="deleteDoctor(${ind.id})">Delete</button></td>
        </tr>
        `;
  }
  let table = `
        <h3 class="h3">All Doctor List</h3>
        <table class="table table-light table-striped-columns text-center">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Mobile Number</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>No Of Degrees</th>
                <th>Salary</th>
                <th></th>
                <th></th>

            </tr>
            ${trs}
        </table>
    `;
  document.getElementById("alldoctors").innerHTML = table;
}
display();

async function findDoctor(e) {
  // e.preventDefault();
  let id = document.getElementById("doctorId").value;
  let res = await fetch(`${API}/${id}`, {
    method: "GET",
  });
  let data = await res.json();
  let trs = "";
  trs += `
            <tr>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.gender}</td>
                <td>${data.mobile}</td>
                <td>${data.specialization}</td>
                <td>${data.experience}</td>
                <td>${data.degrees}</td>
                <td>${data.salary}</td>
                <td><button class="btn btn-primary" onclick="editDoctor(${data.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button></td>
                <td><button class="btn btn-danger" onclick="deleteDoctor(${data.id})">Delete</button></td>
        </tr>
        `;
  let table = `
        <table class="table table-light table-striped-columns text-center">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Mobile Number</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>No Of Degrees</th>
                <th>Salary</th>
                <th></th>
                <th></th>
            </tr>
            ${trs}
        </table>
    `;

  document.getElementById("ref").innerHTML = table;
  return data;
}

async function deleteDoctor(id) {
  let res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  let data = await res.json();
  alert("Deleted Successfully..");
  display();
}
async function findDoctorById(id) {
  let res = await fetch(`${API}/${id}`, { method: "GET" });
  return await res.json();
}

let i = 0;
async function editDoctor(id) {
  let data = await findDoctorById(id);

  document.getElementById("edit_id").value = data.id;
  document.getElementById("edit_name").value = data.name;
  document.getElementById("edit_email").value = data.email;
  document.getElementById("edit_mobile").value = data.mobile;
  document.getElementById("edit_specialization").value = data.specialization;
  document.getElementById("edit_experience").value = data.experience;
  document.getElementById("edit_degrees").value = data.degrees;
  document.getElementById("edit_salary").value = data.salary;
}

async function save() {
  let allforms = document.forms;
  let form = allforms.editdoctorform;

  let doc = {
    id: form.id.value,
    name: document.getElementById("edit_name").value,
    email: document.getElementById("edit_email").value,
    mobile: document.getElementById("edit_mobile").value,
    specialization: document.getElementById("edit_specialization").value,
    experience: document.getElementById("edit_experience").value,
    degrees: document.getElementById("edit_degrees").value,
    salary: document.getElementById("edit_salary").value,
  };

  let res = await fetch(`${API}/${form.id.value}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(doc),
  });

  let data = await res.json();
  console.log("Updated:", data);
  display(); // refresh table after update
}
