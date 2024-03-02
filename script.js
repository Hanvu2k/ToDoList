let editMode = false;

const taskInput = document.createElement("input");
taskInput.setAttribute("type", "text");
taskInput.setAttribute("id", "taskInput");
taskInput.setAttribute("placeholder", "New task");

// Create the add task button
const addTaskButton = document.createElement("button");
addTaskButton.setAttribute("id", "addTaskButton");
addTaskButton.textContent = "Add task";

// Create the task list
const taskList = document.createElement("ul");
taskList.setAttribute("id", "taskList");

// Append the elements to the app div
const app = document.getElementById("app");
const div = document.createElement("div");
div.appendChild(taskInput);
div.appendChild(addTaskButton);
app.appendChild(div);
app.appendChild(taskList);

const addTask = () => {
  let value = taskInput.value;
  if (value) {
    addItemToDOM(value);
    taskInput.value = "";
    return;
  }
  alert("Please enter a task");
  return;
};

// delete button and edit button
const delBtn = document.createElement("button");
delBtn.setAttribute("id", "delBtn");
delBtn.textContent = "Delete";

const delTask = (e) => {
  let item = e.target.parentElement;
  if (confirm("Are you sure you want to delete this task?")) {
    taskList.removeChild(item);
  }
};

const editBtn = document.createElement("button");
editBtn.setAttribute("id", "editBtn");
editBtn.textContent = "Edit";

const editTask = (e) => {
  editMode = !editMode;
  let item = e.target.parentElement;

  if (editMode) {
    let task = item.firstChild.textContent;
    let newTask = document.createElement("input");
    newTask.setAttribute("type", "text");
    newTask.setAttribute("id", "saveInput");
    newTask.value = task;
    item.replaceChild(newTask, item.firstChild);

    let saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.setAttribute("id", "saveBtn");

    let cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.setAttribute("id", "cancelBtn");

    saveBtn.addEventListener("click", function () {
      if (newTask.value !== task) {
        if (confirm("Are you sure you want to save this task?")) {
          task = newTask.value;
          item.replaceChild(document.createTextNode(task), newTask);
          item.removeChild(saveBtn);
          item.removeChild(cancelBtn);
          item.querySelector("#delBtn").style.display = "inline";
          item.querySelector("#editBtn").style.display = "inline";
          editMode = false;
        }
      } else {
        item.replaceChild(document.createTextNode(task), newTask);
        item.removeChild(saveBtn);
        item.removeChild(cancelBtn);
        item.querySelector("#delBtn").style.display = "inline";
        item.querySelector("#editBtn").style.display = "inline";
        editMode = false;
      }
    });

    cancelBtn.addEventListener("click", function () {
      item.replaceChild(document.createTextNode(task), newTask);
      item.removeChild(saveBtn);
      item.removeChild(cancelBtn);
      item.querySelector("#delBtn").style.display = "inline";
      item.querySelector("#editBtn").style.display = "inline";
      editMode = false;
    });

    item.appendChild(saveBtn);
    item.appendChild(cancelBtn);
    item.querySelector("#delBtn").style.display = "none";
    item.querySelector("#editBtn").style.display = "none";
  }
};

//  add task
addTaskButton.addEventListener("click", addTask);

function addItemToDOM(text) {
  let item = document.createElement("li");
  item.textContent = text;

  // Create new delete and edit buttons for each task
  let delBtn = document.createElement("button");
  delBtn.setAttribute("id", "delBtn");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", (e) => delTask(e));
  item.appendChild(delBtn);

  let editBtn = document.createElement("button");
  editBtn.setAttribute("id", "editBtn");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", (e) => editTask(e));
  item.appendChild(editBtn);

  // Append the item to the task list
  taskList.appendChild(item);
}
