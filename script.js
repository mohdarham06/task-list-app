



function saveTaskList(tasksArray) {
    jsonData = JSON.stringify(tasksArray)

    localStorage.setItem("taskListData", jsonData);
}

function importTaskList() {
    previousData = localStorage.getItem("taskListData");
    tasksArray = JSON.parse(previousData)

    if (tasksArray == null) {
        console.log('Previous Data not found!')
        tasksArray = [];
        return;
    }
    console.log(tasksArray)
    renderTasks();
}


const form = document.querySelector("#new-task-form");
const newTaskInput = document.querySelector('#new-task-input');


const taskList = document.querySelector('#task-list')
let tasksArray = [];

importTaskList();



// Task Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();

    addNewTask();
});

// adding task
function addNewTask() {
    let taskValue = newTaskInput.value.trim();
    if (taskValue == '') {
        alert('task not found')
        return;
    }

    let task = {
        value: taskValue,
        checked: false,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    }
    tasksArray.push(task)

    
    renderTasks();
    newTaskInput.value = '';
    saveTaskList(tasksArray)
}


// render
function renderTasks() {
    taskList.innerHTML = '';

    tasksArray.forEach((task, index) => {
        
        const taskItem = document.createElement('li');
        taskItem.classList.add('task');
        taskItem.id = `${index}`;

        taskItem.innerHTML = `
            <div class="content">
                <svg data-action="check" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="${task.color}">
                    <path data-action="check" ${task.checked ? 'd="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"'
                    : 'd="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"'}
                    />
                </svg>
                <input type="text" class="text" value="${task.value}" readonly="readonly">
            </div>
            <div class="actions">
                <button class="edit" data-action="edit">Edit</button>
                <button class="delete" data-action="delete">Delete</button>
            </div>
            `;

        taskList.appendChild(taskItem);



        taskItem.addEventListener('click', (e) => {
            const taskId = Number(taskItem.id);
            // console.log(taskId);

            const target = e.target;

            const action = target.dataset.action;

            action === "check" && checkTask(taskId);
            action === "edit" && editTask(taskId);
            action === "delete" && deleteTask(taskId);
        });

    })
}

// check box
function checkTask(id) {
    if(tasksArray[id].checked == false) {
        tasksArray[id].checked = true;
    } else {
        tasksArray[id].checked = false;
    }
    renderTasks();
    saveTaskList(tasksArray);
}

// edit
function editTask(id) {
    let task = document.querySelector(`#task-list li[id="${id}"]`);
    let taskInput = task.querySelector('.content input');
    let taskEditBtn = task.querySelector('.actions .edit');

    if (taskEditBtn.innerText.toLowerCase() == "edit"){

        taskEditBtn.innerText = 'Save'
        taskInput.removeAttribute("readonly");
        taskInput.focus();
    } else {
        taskInput.setAttribute("readonly", "readonly");
        tasksArray[id].value = taskInput.value;
        taskEditBtn.innerText = 'Edit'
        saveTaskList(tasksArray);
    }
}

// delete
function deleteTask(id) {
    tasksArray = tasksArray.filter((task, index) => index !== id);
    renderTasks();
    saveTaskList(tasksArray);
}




