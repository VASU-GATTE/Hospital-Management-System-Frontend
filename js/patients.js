const API = "/api/patients";
// const API = "http://hospital-mangement-system-env.eba-d2jnitqb.us-east-1.elasticbeanstalk.com/patients";

let patientsList = [];

async function addpatient(e) {
    e.preventDefault();

    let addpatientform = document.forms.addpatientform;

    let newPatient = {
        name: addpatientform.name.value,
        email: addpatientform.email.value,
        gender: addpatientform.gender.value,
        age: addpatientform.age.value,
        mobile: addpatientform.mobile.value,
        regDate: addpatientform.regdate.value
    };
    let res = await fetch(API, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newPatient),
    });
    let data = await res.json();
    console.log(data);
    patientsList.push(newPatient);
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
                <td>${ind.gender}</td>
                <td>${ind.age}</td>
                <td>${ind.email}</td>
                <td>${ind.mobile}</td>
                <td>${ind.regDate}</td>
                <td>
                    <button class="btn btn-primary" onclick="editpatient(${ind.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="deletepatient(${ind.id})">Delete</button>
                </td>
            </tr>
        `;
    }

    let table = `
        <h3 class="h3 text-center my-4 fw-bold border-bottom pb-2">Total Patients List</h3>
        <div class="container">
    <div class="card shadow rounded-4 border-0 p-3">
        <div class="table-responsive">
            <table class="table table-striped-columns text-center align-middle">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Registered Date</th>
                    <th></th>
                    <th></th>
                </tr>
                ${trs}
            </table>
        </div>
    </div>
</div>
    `;

    document.getElementById("allpatients").innerHTML = table;
}
display();

async function deletepatient(id) {
    let res = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });
    let data = await res.json();
    alert("Patient with " + id + " Deleted Successfully...")
    display();
}

async function findpatientById(id) {
    let res = await fetch(`${API}/${id}`, {
        method: "GET"
    });
   return await res.json();
}
async function findpatient(e) {
    e.preventDefault();
    let id=document.getElementById("patientSearchInput").value
    let res = await fetch(`${API}/${id}`, {
        method: "GET"
    });
    let data=await res.json();

    let trs="";
    trs+=`
        <tr>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.gender}</td>
                <td>${data.age}</td>
                <td>${data.email}</td>
                <td>${data.mobile}</td>
                <td>${data.regDate}</td>
                <td>
                    <button class="btn btn-primary" onclick="editpatient(${data.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="deletepatient(${data.id})">Delete</button>
                </td>
            </tr>
    `;

    let table = `
        <h3 class="h3 text-center my-4 fw-bold border-bottom pb-2">Search Results</h3>
        <div class="container">
    <div class="card shadow rounded-4 border-0 p-3">
        <div class="table-responsive">
            <table class="table table-striped-columns text-center align-middle">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Registered Date</th>
                    <th></th>
                    <th></th>
                </tr>
                ${trs}
            </table>
        </div>
    </div>
</div>
    `;

    document.getElementById("patientResults").innerHTML=table;

    return data

}



async function editpatient(id) {
    let data = await findpatientById(id);

    document.getElementById("edit_id").value = data.id;
    document.getElementById("edit_name").value = data.name;
    document.getElementById("edit_email").value = data.email;
    document.getElementById("edit_mobile").value = data.mobile;
    document.getElementById("edit_age").value = data.age;
}

async function save() {
    let form = document.forms.editpatientform;
    let doc = {
        id: form.id.value,
        name: form.name.value,
        email: form.email.value,
        mobile: form.mobile.value,
        age: form.age.value
    };


    let res = await fetch(`${API}/${form.id.value}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(doc)
    });
    let data = await res.json();
    console.log(data);

    display();
}



