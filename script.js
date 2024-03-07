const appEl = document.querySelector("#app");
let todolist = [
    {
        id: 2,
        task: "Learn JavaScript",
        status: "new",
    },
    {
        id: 1,
        task: "Learn JavaScript 2",
        status: "new",
    },
    {
        id: 3,
        task: "Learn TypeScript",
        status: "doing",
    },
    {
        id: 4,
        task: "Learn HTML,CSS",
        status: "finished",
    },
];
let editMode;

const render = (html, element, debug) => {
    if (debug) {
        return (element.innerText = html);
    } else {
        return (element.innerHTML = html);
    }
};

const renderBtn = (id) => {
    let btn;
    if (editMode && editMode.id === id) {
        btn = `
        <div class="btns">
            <button id="btnSave" onclick="saveTodo(${id})">Save</button>
            <button id="btnCancel" onclick="cancelSaveTodo(${id})">Cancel</button>
        </div>
        `;
    } else {
        btn = `
        <div class="btns">
            <button onclick="editTodo(${id})">Edit</button>
        </div>
        `;
    }
    return btn;
};

const renderContent = (item) => {
    let content;

    if (editMode && editMode.id === item.id) {
        content = `<input id="inputEdit"  type="text" />`;
    } else {
        content = `<span>${item.task}</span>`;
    }
    return content;
};

const renderNewTasks = () => {
    const newTasks = todolist.filter((item) => item.status === "new");

    let html = "";
    newTasks.forEach((item) => {
        html += `
      <div class="todo-item new-item" draggable="true" data="${item.id}">
        <div class="todo-task">
            ${renderContent(item)}            
            <span onclick= "editStatus(${item.id} ,'doing')">Do task</span>
        </div>
        ${renderBtn(item.id)}
      </div>
    `;
    });
    return html;
};

const renderDoingTasks = () => {
    const doingTasks = todolist.filter((item) => item.status === "doing");
    let html = "";
    doingTasks.forEach((item) => {
        html += `
      <div class="todo-item doing-item" draggable="true" data="${item.id}">
        <div div class="todo-task">
            ${renderContent(item)} 
            <span onclick= "editStatus(${
                item.id
            }, 'finished')">Finished task</span>
         </div>
        ${renderBtn(item.id)}
      </div>
    `;
    });
    return html;
};

const renderFinishedTasks = () => {
    const finishedTasks = todolist.filter((item) => item.status === "finished");

    let html = "";
    finishedTasks.forEach((item) => {
        html += `
      <div class="todo-item finishe-item" draggable="true" data="${item.id}">
        <div div class="todo-task">
            <span class="todo-task__title">${item.task}</span>
            <span onclick= "editStatus(${item.id}, 'remove')">Delete task</span>
        </div>
      </div>
    `;
    });
    return html;
};

const createTodoApp = () => {
    return `
    <div>
        <div class="todo-container">
            <div class="todo-list__item" data-status="new">
                <h2 class="todo-heading">New tasks</h2>
                <div>
                    <input id="input"  type="text" placeholder="Add job"/>
                    <button id="btnAdd" onclick="addTodo()">Add</button>
                </div>
                ${renderNewTasks()}
            </div>
            <div class="todo-list__item" data-status="doing">
                <h2 class="todo-heading">Doing tasks</h2>
                ${renderDoingTasks()}
              
            </div>
            <div class="todo-list__item" data-status="finished">
                <h2 class="todo-heading">Finished tasks</h2>
                ${renderFinishedTasks()}
            </div>
        </div>
    </div>
  `;
};

render(createTodoApp(), appEl);

const addTodo = () => {
    let inputEl = document.querySelector("#input");

    if (!inputEl.value) {
        alert("Please enter a task");
        return;
    }

    const newTask = {
        id: Math.floor(Math.random() * 100),
        task: inputEl.value,
        status: "new",
    };
    console.log(newTask);

    todolist.push(newTask);
    inputEl.value = "";

    render(createTodoApp(), appEl);
    attachDragListeners();
};

const editTodo = (id) => {
    editMode = { id: id };
    render(createTodoApp(), appEl);
    const currentTodo = todolist.find((item) => item.id === id);
    const inputEl = document.querySelector("#inputEdit");
    inputEl.value = currentTodo.task;
};

const saveTodo = (id) => {
    const inputEl = document.querySelector("#inputEdit");
    const currentTodo = todolist.find((item) => item.id === id);
    currentTodo.task = inputEl.value;
    editMode = null;
    render(createTodoApp(), appEl);
    attachDragListeners();
};

const cancelSaveTodo = () => {
    editMode = null;
    render(createTodoApp(), appEl);
    attachDragListeners();
};

const editStatus = (id, status) => {
    const currentTodo = todolist.find((item) => item.id === id);

    if (status === "remove") {
        const currenTodo = todolist.filter((item) => item.id !== id);
        todolist = [...currenTodo];
        render(createTodoApp(), appEl);
        attachDragListeners();
        return;
    }

    if (status) {
        currentTodo.status = status;
        render(createTodoApp(), appEl);
        attachDragListeners();
    }
};

const initSortableList = function (e, currentTarget) {
    let sortableList = this;

    // Getting all items except currently dragging and making array of them
    let siblings = [
        ...sortableList.querySelectorAll(".todo-item:not(.dragging)"),
    ];

    // Finding the sibling after which the dragging item should be placed
    let nextSibling = siblings.find((sibling) => {
        let rect = sibling.getBoundingClientRect();
        return e.clientY <= rect.top + rect.height / 2;
    });

    // Inserting the dragging item before the found sibling
    sortableList.insertBefore(currentTarget, nextSibling);
};

const attachDragListeners = () => {
    const dragZones = document.querySelectorAll(".todo-list__item");
    const dragItems = document.querySelectorAll(".todo-item");

    let currentTarget = null;

    dragItems.forEach((item) => {
        item.addEventListener("dragstart", function () {
            currentTarget = this;
            item.classList.add("dragging");
        });

        item.addEventListener("dragend", item.classList.remove("dragging"));
    });

    dragZones.forEach((zone) => {
        zone.addEventListener("dragover", function (e) {
            e.preventDefault();
            initSortableList.bind(this)(e, currentTarget);
        });

        zone.addEventListener("dragenter", (e) => e.preventDefault());

        zone.addEventListener("drop", function (e) {
            const id = currentTarget.getAttribute("data");
            const currentTodo = todolist.find((item) => item.id == id);
            const zoneStatus = this.getAttribute("data-status");

            if (currentTodo) {
                currentTodo.status = zoneStatus;
                render(createTodoApp(), appEl);
                attachDragListeners();
            }
        });
    });
};

attachDragListeners();
