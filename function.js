document.addEventListener('DOMContentLoaded', fetchTasks);

function fetchTasks() {
    fetch('get_tasks.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(task => {
                insertNewTask({
                    tittle: task.tittle,
                    description: task.description,
                    dueDate: task.dueDate
                });
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

const navLinks = document.querySelectorAll('.nav-link');


navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetSection = this.getAttribute('data-section');

        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show the target section
        document.getElementById(targetSection).classList.add('active');
    });
});



// Function to display an alert with a personalized message
function submitForm(event) {
    event.preventDefault(); // Prevent the form from submitting
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Check if all fields are filled out
    if (name === '' || email === '' || message === '') {
        alert('Oops!Please fill out all fields before submitting.');
    } else {
        alert(`Thank you, ${name}! Your message has been received.`);

        
    }
}

var selectedRow = null;
function onFormSubmit(e) {
    event.preventDefault();
    var formData = readFormData();

    // Submit to the server
    fetch('add_task.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            insertNewTask(formData);
            alert('The task has successfully added!');
            resetForm();
        }
    })
    .catch(error => console.error('Error adding task:', error));
}


//Retrieve data
function readFormData(){
    var formData = {};
    formData["tittle"] = document.getElementById("tittle").value;
    formData["description"] = document.getElementById("description").value;
    formData["dueDate"] = document.getElementById("dueDate").value;
    return formData;
}

//insert
function insertNewTask(data){
    var table = document.getElementById("taskList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.tittle;
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.description;
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.dueDate;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = '<button onClick= onEdit(this)>Edit</button> <button onClick= onDelete(this)>Delete</button>'
}

//Edit
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('tittle').value = selectedRow.cells[0].innerHTML;
    document.getElementById('description').value = selectedRow.cells[1].innerHTML;
    document.getElementById('dueDate').value = selectedRow.cells[2].innerHTML;
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.tittle;
    selectedRow.cells[1].innerHTML = formData.description;
    selectedRow.cells[2].innerHTML = formData.dueDate;
}

function onDelete(td){
    if(confirm('Do you want to delete this record?')){
        row = td.parentElement.parentElement;
        document.getElementById('taskList').deleteRow(row.rowIndex);
    }
    resetForm();
}

function resetForm(){
    document.getElementById('tittle').value = '';
    document.getElementById('description').value = '';
    document.getElementById('dueDate').value = '';
} 