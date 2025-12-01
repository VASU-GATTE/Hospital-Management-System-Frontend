// const API = "http://hospital-mangement-system-env.eba-d2jnitqb.us-east-1.elasticbeanstalk.com/visits";
// const DOC_API="http://hospital-mangement-system-env.eba-d2jnitqb.us-east-1.elasticbeanstalk.com/doctors";
// const PAT_API="http://hospital-mangement-system-env.eba-d2jnitqb.us-east-1.elasticbeanstalk.com/patients";
const DOC_API="/api/doctors";
const PAT_API="/api/patients";
const API = "/api/visits";

let visits=[];

function addAppointment(){
    let form=document.forms.createappointmentform;

    let doc={

    }
}


function loadDoctors() {
  fetch(DOC_API)
    .then(function(res) {
      return res.json();
    })
    .then(function(doctors) {
      var select = document.getElementById("doctorSelect");
      select.innerHTML = ""; // clear list

      doctors.forEach(function(doc) {
        let option = document.createElement("option");
        option.value = doc.id;
        option.textContent = doc.name + " (" + doc.specialization + ")";
        select.appendChild(option);
      });
    })
    .catch(function(err) {
      console.log("Error loading doctors:", err);
    });
}

loadDoctors();

function loadPatients() {
  fetch(PAT_API)
    .then(function(res) {
      return res.json();
    })
    .then(function(patients) {
      var select = document.getElementById("patientSelect");
      select.innerHTML = "";

      patients.forEach(function(pat) {
        var option = document.createElement("option");
        option.value = pat.id;
        option.textContent = pat.name + " (" + pat.mobile + ")";
        select.appendChild(option);
      });
    })
    .catch(function(err) {
      console.log("Error loading patients:", err);
    });
}

loadPatients();


function addAppointment() {

    var doctorId = document.getElementById("doctorSelect").value;
    var patientId = document.getElementById("patientSelect").value;
    var date = document.getElementById("appointmentDate").value;
    var symptoms = document.getElementById("symptomsInput").value;

    var weight = document.getElementById("weightInput").value;
    var temp = document.getElementById("temperatureInput").value;
    var bp = document.getElementById("bpInput").value;
    var mode = document.getElementById("paymentModeSelect").value;

    // Convert date to ISO format (Java backend usually requires this)
    var formattedDate = date + "T00:00:00";

    // Build JSON exactly based on your structure
    var appointment = {
        patient: getPatientById(parseInt(patientId)),
        doctor: getDoctorById(parseInt(doctorId)),
        date: formattedDate,
        disease: symptoms,      // your JSON uses "disease"
        weight: parseFloat(weight),
        temperature: parseFloat(temp),
        bp: parseFloat(bp),
        modeOfPayment: mode
    };

    console.log("Sending appointment:", appointment);

    // POST request
    fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(appointment)
    })
    .then(function(response) {
        if (!response.ok) {
            alert("Failed to save appointment");
        }
        return response.json();
    })
    .then(function(data) {
        alert("Appointment created Successfully!");
        console.log("Response:", data);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
}

async function getDoctorById(id){
    let res=await fetch(`${DOC_API}/${id}`,{
        method:"GET"
    });
    return await res.json();
}

async function getPatientById(id) {
    return await axios.get(`${PAT_API}/${id}`);
}
