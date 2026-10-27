let students = []

if (sessionStorage.getItem("studentdetails")) {
    students = JSON.parse((sessionStorage.getItem("studentdetails")))
    dispalyStudentDetails()
}
studentform.addEventListener("submit", (refresh) => {
    refresh.preventDefault()
    const studentnameinput = studentname.value
    const studentcourse = course.value
    const studentphone = phone.value
    console.log(studentnameinput, studentcourse, studentphone);

    //    push details to array

    if (studentnameinput && studentcourse && studentphone) {

        const editindex = editstatus.value

        if (editindex == "") {
            students.push({
                studentname: studentnameinput,
                course: studentcourse,
                phone: studentphone
            })
            console.log(students);
        }
        else {
            students[editindex] = {
                studentname: studentnameinput,
                course: studentcourse,
                phone: studentphone
            }
        }


    }
    else {
        alert("please fill all ")
    }

    studentform.reset()

    // session storage

    sessionStorage.setItem("studentdetails", JSON.stringify(students))
    dispalyStudentDetails()

})

// display

function dispalyStudentDetails() {
    tablebody.innerHTML = ""

    let selectedCourse = document.getElementById("filtercourse").value;
    let searchName = document.getElementById("searchstudent").value.toLowerCase();

    let filteredStudents = students.filter((items) => {

        let courseMatch = selectedCourse == "" || items.course == selectedCourse;

        let nameMatch = items.studentname.toLowerCase().includes(searchName);

        return courseMatch && nameMatch;

    });



    filteredStudents.forEach((items, index) => {

        tablebody.innerHTML += `
            <tr>
                        <td>${index + 1}</td>
                        <td>${items.studentname}</td>
                        <td>${items.course}</td>
                        <td>${items.phone}</td>
                        <td>
                        <button onclick="viewStudentDetails(${index})"type="button" class="btn btn-primary "><i class="bi bi-eye-fill fs-5"></i></i></button>
                            <button onclick="editStudentDetails(${index})" type="submit" class="btn btn-warning mx-2"><i class="bi bi-pencil-square fs-5"></i></button>
                            <button onclick="deletestudent(${index})" type="submit" class="btn btn-danger"><i class="bi bi-trash fs-5 "></i></button>
                        </td>
                      </tr>
          
          `
    })
}

// edit details

function editStudentDetails(studentIndex) {
    const editStudent = students[studentIndex]
    console.log(editStudent);

    studentname.value = editStudent.studentname
    course.value = editStudent.course
    phone.value = editStudent.phone
    editstatus.value = studentIndex
}

// delete 

function deletestudent(byindex) {
    students = students.filter((items, index) => index != byindex)
    sessionStorage.setItem("studentdetails", JSON.stringify(students))
    dispalyStudentDetails()
}

// view students


function viewStudentDetails(studentIndex) {

    let student = students[studentIndex];

     alert(
        "Student Name: " + student.studentname +
        "\nCourse: " + student.course +
        "\nPhone: " + student.phone
    );
}



// filter by course 

document.getElementById("filtercourse").addEventListener("change", function () {
    dispalyStudentDetails();
});

//filter by name 
document.getElementById("searchstudent").addEventListener("input", function () {
    dispalyStudentDetails();
});