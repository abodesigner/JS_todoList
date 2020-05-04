let form = document.getElementById("task-form");
let taskInput = document.querySelector("#task");
let taskTitle = document.querySelector("#task-title");
let taskList = document.querySelector(".collection");
let clearBtn = document.querySelector(".clear-tasks");
let filter = document.querySelector(".filter-task");

// app start here
loadEventsHandlers();

function loadEventsHandlers() {


  if (JSON.parse(localStorage.tasks).length === 0) {
    taskTitle.style.display = "none";
    filter.style.display = "none";
    clearBtn.style.display = "none";
  }

  // if (taskList.children.length === 0) {
  //   document.querySelector("#task-title").style.display = "none";
  //   filter.style.display = "none";
  //   clearBtn.style.display = "none";
  // }

  // DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);


  // Add Task
  form.addEventListener("submit", addTask);

  // Remove Task
  taskList.addEventListener("click", removeTask);

  // Clear tasks
  clearBtn.addEventListener("click", clearAll);

  // Filter task
  filter.addEventListener("keyup", filterTasks);

}


// get tasks from LS
function getTasks() {
  let tasks;

  //if there are task in localStorage, get it
  //else return empty array
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  const ul = document.querySelector(".collection");
  tasks.forEach(function (task) {
    ul.appendChild(createTask(task));
  })

}

// create task
function createTask(taskInput) {

  //create p
  const p = document.createElement("p");
  p.className = "item-name";
  p.appendChild(document.createTextNode(taskInput));

  //create a
  const link = document.createElement("a");

  link.classList.add("delete-item", "secondary-content");
  link.innerHTML = "<i class='fa fa-remove' style='color:red'></i>";

  //create li
  const li = document.createElement("li");
  li.classList.add("collection-item", "d-flex", "justify-content-between", "align-items-center");

  //append p & a inside li
  li.appendChild(p);
  li.appendChild(link);

  return li;

}

// save task into LS
function saveTaskInLocalStorage(task) {

  let tasks;

  //if there are task in localStorage, get it
  //else return empty array
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// add task to dom
function addTask(e) {

  const ul = document.querySelector(".collection");

  // check if task value is empty
  let taskValue = taskInput.value;
  if (taskValue === "") {


    alert("Please Enter Task");

    return;
  }

  //append li inside ul
  ul.appendChild(createTask(taskValue));

  // save task to localStorage
  saveTaskInLocalStorage(taskValue);

  document.querySelector("#task-title").style.display = "block";
  filter.style.display = "block";
  clearBtn.style.display = "block";

  // reset the input field
  taskInput.value = "";
  e.preventDefault();
}

// remove task
function removeTask(e) {
  e.preventDefault();

  if (e.target.classList.contains("fa-remove")) {
    //confirm
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      removeTasksFromLS(e.target.parentElement.parentElement);
    }
  }

  if (taskList.children.length === 0) {
    document.querySelector("#task-title").style.display = "none";
    clearBtn.style.display = "none";
  }

}

// remove task from LS
function removeTasksFromLS(taskItem) {
  let tasks;

  //if there are task in localStorage, get it
  //else return empty array
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {

    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }

  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAllFromLS() {
  localStorage.clear();
}

function clearAll(e) {
  //taskList.innerHTML = "";
  if (e.target.previousElementSibling.classList.contains("collection")) {
    e.target.previousElementSibling.remove();
  }

  clearAllFromLS();

}

function filterTasks(e) {

  // get filter text
  const filterText = e.target.value.toLowerCase();

  // loop through li
  const lis = document.querySelectorAll(".collection-item");
  lis.forEach(function (task) {

    const item = task.firstChild.textContent;

    const index = item.toLowerCase().indexOf(filterText);

    if (index != -1) {

      task.classList.add("d-flex", "justify-content-between", "align-items-center");


    } else {

      task.classList.remove("d-flex", "justify-content-between", "align-items-center");
      task.style.display = "none";
    }




  });
  // get the first child textContent

  // search for the text inside this value using indexOf




}






