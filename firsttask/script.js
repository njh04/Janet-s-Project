const ToDoInput = document.querySelector(".ToDo-input");
const ToDoButton = document.querySelector(".ToDo-button");
const ToDoList = document.querySelector(".ToDo-list");
const filterOption = document.querySelector(".filter-ToDo");

document.addEventListener("DOMContentLoaded", getlocalTodos);
ToDoButton.addEventListener("click", addTodo);
ToDoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterToDo); // Corrected function name

function addTodo(event) {
    event.preventDefault();
    const ToDoDiv = document.createElement("div");
    ToDoDiv.classList.add("ToDo");

    const newToDo = document.createElement("li");
    newToDo.innerText = ToDoInput.value;
    newToDo.classList.add("ToDo-item");
    ToDoDiv.appendChild(newToDo);

    // Adding to local storage
    saveLocalTodos(ToDoInput.value);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    ToDoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn"); // Corrected method call
    ToDoDiv.appendChild(trashButton);

    ToDoList.appendChild(ToDoDiv);
    ToDoInput.value = ""; // Clear the input field
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn") {
        const ToDo = item.parentElement;
        ToDo.classList.add("slide");
        removeLocalTools(ToDo);
        ToDo.addEventListener("transitionend", function () {
            ToDo.remove();
        });
    }

    if (item.classList[0] === "complete-btn") {
        const ToDo = item.parentElement;
        ToDo.classList.toggle("completed");
    }
}

function filterToDo(e) {
    const ToDos = ToDoList.childNodes;
    ToDos.forEach(function (ToDo) {
        switch (e.target.value) {
            case "all":
                ToDo.style.display = "flex";
                break;
            case "completed":
                if (ToDo.classList.contains("completed")) {
                    ToDo.style.display = "flex";
                } else {
                    ToDo.style.display = "none";
                }
                break;
            case "incompleted": // Change this line to match the dropdown value
                if (!ToDo.classList.contains("completed")) {
                    ToDo.style.display = "flex";
                } else {
                    ToDo.style.display = "none";
                }
                break;
        }
    });
}


function saveLocalTodos(ToDo) {
    let ToDos;
    if (localStorage.getItem("ToDos") === null) {
        ToDos = [];
    } else {
        ToDos = JSON.parse(localStorage.getItem("ToDos"));
    }
    ToDos.push(ToDo);
    localStorage.setItem("ToDos", JSON.stringify(ToDos));
}

function getlocalTodos() {
    let ToDos;
    if (localStorage.getItem("ToDos") === null) {
        ToDos = [];
    } else {
        ToDos = JSON.parse(localStorage.getItem("ToDos"));
    }
    ToDos.forEach(function (ToDo) {
        const ToDoDiv = document.createElement("div");
        ToDoDiv.classList.add("ToDo");

        const newToDo = document.createElement("li");
        newToDo.innerHTML = ToDo;
        newToDo.classList.add("ToDo-item");
        ToDoDiv.appendChild(newToDo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        completedButton.classList.add("complete-btn");
        ToDoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        ToDoDiv.appendChild(trashButton);

        ToDoList.appendChild(ToDoDiv);
    });
}

function removeLocalTools(ToDo) {
    let ToDos;
    if (localStorage.getItem("ToDos") === null) {
        ToDos = [];
    } else {
        ToDos = JSON.parse(localStorage.getItem("ToDos"));
    }
    const ToDoIndex = ToDo.children[0].innerText;
    ToDos.splice(ToDos.indexOf(ToDoIndex), 1);
    localStorage.setItem("ToDos", JSON.stringify(ToDos));
}
