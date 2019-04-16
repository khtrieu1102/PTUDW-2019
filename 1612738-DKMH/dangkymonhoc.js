function loadingSomething() {
  var date = document.getElementById("date");
  for (var i = 1; i <= 31; i++) {
    var dateOption = document.createElement("option");
    //   dateOption.id = i;
    dateOption.innerText = i;
    date.add(dateOption);
  }

  var month = document.getElementById("month");
  for (var i = 1; i <= 12; i++) {
    var monthOption = document.createElement("option");
    //   monthOption.id = i;
    monthOption.innerText = i;
    month.add(monthOption);
  }

  var year = document.getElementById("year");
  for (var i = 1960; i <= 2000; i++) {
    var yearOption = document.createElement("option");
    //   yearOption.id = i;
    yearOption.innerText = i;
    year.add(yearOption);
  }

  resetSubject();
}

function getSubjectFromAvailable() {
  var subjectAvailable = document.getElementById("SubjectAvailable");
  var subjectAssigned = document.getElementById("SubjectAssigned");
  var selectedSubjects = subjectAvailable.selectedOptions;
  var index = subjectAvailable.selectedIndex;
  while (selectedSubjects) {
    var optionToPass = document.createElement("option");

    optionToPass.value = selectedSubjects[0].value;
    optionToPass.innerText = selectedSubjects[0].innerText;
    subjectAssigned.add(optionToPass);

    subjectAvailable.remove(index);
  }

  return false; //not reload form
}

function removeSubjectToAvailable() {
  var subjectAvailable = document.getElementById("SubjectAvailable");
  var subjectAssigned = document.getElementById("SubjectAssigned");
  var selectedSubjects = subjectAssigned.selectedOptions;
  var index = subjectAssigned.selectedIndex;
  while (selectedSubjects) {
    var optionToPass = document.createElement("option");

    optionToPass.innerText = selectedSubjects[0].innerText;
    optionToPass.value = selectedSubjects[0].value;
    subjectAssigned.remove(index);
    subjectAvailable.add(optionToPass);
  }

  return false; //not reload form
}

function resetSubject() {
  var subjectAvailable = document.getElementById("SubjectAvailable");
  var subjectAssigned = document.getElementById("SubjectAssigned");

  while (subjectAvailable.length != 0) {
    subjectAvailable.remove(0);
  }

  while (subjectAssigned.length != 0) {
    subjectAssigned.remove(0);
  }

  addToSelect(subjectAvailable, "Lap trinh Java");
  addToSelect(subjectAvailable, "Phat trien ung dung web");
  addToSelect(subjectAvailable, "Phan tich thiet ke phan mem");
  addToSelect(subjectAvailable, "Phat trien ung dung di dong");
}

function addToSelect(selectName, optionCaption) {
  var optionSubject = document.createElement("option");
  optionSubject.innerText = optionCaption;
  selectName.add(optionSubject);
}

function pushDataToTable() {
  var table = document.getElementById("studentList");
  var row = table.insertRow(1);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);
  var object = getStudentData();

  cell0.innerHTML = object.id;
  cell1.innerHTML = object.name;
  cell2.innerHTML = object.gender;
  cell3.innerHTML = object.dob;
  var rows = table.getElementsByTagName("tr");
  var currentRow = table.rows[1];
  var createClickHandler = function(roww) {
    return function() {
      var message = showInformation(object);
      alert(message);
    };
  };
  currentRow.onclick = createClickHandler(currentRow);
}

function getStudentData() {
  var studentObject = { id: "", name: "", gender: "", dob: "", subjects: [] };
  studentObject.id = document.getElementById("studentId").value;
  studentObject.name = document.getElementById("studentName").value;
  studentObject.gender = document.querySelector(
    'input[name="genderS"]:checked'
  ).value;
  studentObject.dob =
    document.getElementById("date").value +
    "/" +
    document.getElementById("month").value +
    "/" +
    document.getElementById("year").value;

  // get subjects
  var subjectAssigned = document.getElementById("SubjectAssigned");
  for (var i = 0; i < subjectAssigned.length; i++) {
    studentObject.subjects.push(subjectAssigned[i].value);
  }

  return studentObject;
}

function showInformation(object) {
  var message = "";
  message += "Id: " + object.id + "\n";
  message += "Name: " + object.name + "\n";
  message += "Gender: " + object.gender + "\n";
  message += "DOB: " + object.dob + "\n";
  message += "Subjects: ";
  for (var i = 0; i < object.subjects.length; i++) {
    message += " " + object.subjects[i] + ",";
  }
  return message;
}
