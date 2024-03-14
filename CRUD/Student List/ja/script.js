let firstName = document.getElementById('fname');
let lastName = document.getElementById('lname');
let stuEmail = document.getElementById('email');
let stuContact = document.getElementById('contact');
let stuRollNu = document.getElementById('rollnu');
let stuCourse = document.getElementById('Course');
let myCard = document.getElementById('cards');
let select = document.getElementById('count');


let studentArry = [];
let editCard = false;
let index;

// new array store 
const myStudent = () => {

    let newStudent = JSON.parse(localStorage.getItem('student'));

    if (newStudent) {

        return newStudent;

    } else {

        return [];

    }
}
studentArry = myStudent();



// submit function 
const student = () => {

    event.preventDefault();

    if (!editCard) {
        const portal = {
            firstName: firstName.value,
            lastName: lastName.value,
            stuEmail: stuEmail.value,
            stuContact: stuContact.value,
            stuRollNu: stuRollNu.value,
            stuCourse: stuCourse.value,
            id: studentArry.length + 1,
        }

        studentArry.push(portal);
        localStorage.setItem('student', JSON.stringify(studentArry));

        console.log(portal, JSON.stringify(studentArry));

    } else {

        let cardUpdate = studentArry.map((student) => {
            if (student.id == index) {
                return {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    stuEmail: stuEmail.value,
                    stuContact: stuContact.value,
                    stuRollNu: stuRollNu.value,
                    stuCourse: stuCourse.value,
                    id: index
                }
            }
            return student;
        });
        localStorage.setItem('student', JSON.stringify(cardUpdate));
        studentArry = myStudent();
    }

    firstName.value = "";
    lastName.value = "";
    stuEmail.value = "";
    stuContact.value = "";
    stuRollNu.value = "";
    stuCourse.value = "";

    editCard = false;
    studentCard();

}


// card data function
const studentCard = () => {

    myCard.innerHTML = "";

    if (studentArry.length > 0) {

        studentArry.forEach(studentLoop => {
            myCard.innerHTML += `<div class="card col-4 p-3 m-2  d-flex"><div>First Name :- <span>${studentLoop.firstName}</span</div><div>Last Name :-<span>${studentLoop.lastName}</span>
                </div><div>Email :-<span>${studentLoop.stuEmail}</span></div><div>Contact :-<span>${studentLoop.stuContact}</span></div><div>Roll No :-
                <span>${studentLoop.stuRollNu}</span></div><div>Course :-<span>${studentLoop.stuCourse}</span>
                </div>
                <button onclick="updateId(${studentLoop.id})">Update</button>
                <button onclick="deteltId(${studentLoop.id})">Delete</button>
                <button onclick="count(${studentLoop.id})">Count</button>
                </div>`
        });

    } else {
        myCard.innerHTML = "Students Data Not A Found...";
    }
}

studentCard();



// upadate data function
const updateId = (id) => {
    let updateCardIndex = studentArry.findIndex((updatestudent) => {
        return updatestudent.id == id;
    });

    if (updateCardIndex !== -1) {

        let updateCard = studentArry[updateCardIndex];

        firstName.value = updateCard.firstName;
        lastName.value = updateCard.lastName;
        stuEmail.value = updateCard.stuEmail;
        stuContact.value = updateCard.stuContact;
        stuRollNu.value = updateCard.stuRollNu;
        stuCourse.value = updateCard.stuCourse;
    } else {
        // console.log("Student with ID", index, "not found.");
        myCard.innerHTML = "student Id Is Not A Found";
    }
    editCard = true;
    index = id;
}


// delete data function
const deteltId = (id) => {
    let deleteCardIndex = studentArry.findIndex((deletestudent) => {
        return deletestudent.id == id;
    });

    if (deleteCardIndex !== -1) {
        studentArry.splice(deleteCardIndex, 1);
        localStorage.setItem('student', JSON.stringify(studentArry));
    } else {
        // console.log("Student with ID", id, "not found.");
        myCard.innerHTML = "student Id Is Not A Found";

    }
    studentCard();
}




// select data function 
studentArry = myStudent();
studentCard(studentArry);

const showSelect = () => {

}

let selectItem = 0;

const count = (id) => {

    studentArry = myStudent();
    let selectData = studentArry.find(data => data.id == id);
    let newStudent = JSON.parse(localStorage.getItem('student')) || [];
    newStudent.push(selectData);
    showSelect(selectData);

    selectItem++;
    select.innerHTML = `${selectItem}`;
    localStorage.setItem('NewCounting', JSON.stringify(newStudent));
    console.log("Data In Local Storag...");

}



//model

studentArry = myStudent();
studentCard(studentArry);

const showModel1 = () => {

    let showArray = JSON.parse(localStorage.getItem('student')) || [];
    let showName = showArray.map(ele => ele.firstName).join(" , ");
    document.getElementById('nameF').innerHTML = `Select Name : ${showName}`;

}

let mcount = 0;

const showModel = (id) => {
    studentArry = myStudent();
    let selectData = studentArry.find(data => data.id == id);
    let showArray = JSON.parse(localStorage.getItem('selectData')) || [];
    showArray.push(selectData);
    showModel1();

    mcount++;
    select.innerHTML = `${mcount} + `;
    localStorage.setItem('selectCount',JSON.stringify(mcount));

    console.log("Data Storge In Local Storage..");

}





