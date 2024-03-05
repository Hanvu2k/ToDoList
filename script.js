const appEl = document.querySelector("#app");
let todolist = [
    {
        id: 1,
        task: "Learn JavaScript",
        status: "new",
    },
    {
        id: 2,
        task: "Learn TypeScript",
        status: "doing",
    },
    {
        id: 3,
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
            <button onclick=deleteTodo(${id})>Delete</button>
        </div>
        `;
    }
    return btn;
};

const renderNewTasks = () => {
    const newTasks = todolist.filter((item) => item.status === "new");

    let html = "";
    newTasks.forEach((item) => {
        html += `
      <div class="new-item" draggable="true">
        <div class="todo-task">
            <span>${item.task}</span>
            <span onclick= "editStatus(${item.id})">edit status</span>
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
      <div class="doing-item" draggable="true">
        <div div class="todo-task">
            <span>${item.task}</span>
            <span onclick= "editStatus(${item.id})">edit status</span>
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
      <div class="finishe-item" draggable="true">
        <div div class="todo-task">
            <span class="todo-task__title">${item.task}</span>
            <span onclick= "editStatus(${item.id})">edit status</span>
        </div>
      </div>
    `;
    });
    return html;
};

const createTodoApp = () => {
    let addBtn;
    if (editMode) {
        addBtn = "";
    } else {
        addBtn = `<button id="btnAdd" onclick="addTodo()">Add</button>`;
    }
    return `
    <div>
        <div class="todo-container">
            <div class="todo-list__item">
                <h2 class="todo-heading">New tasks</h2>
                <div>
                    <input id="input"  type="text" placeholder="Add job"/>
                    ${addBtn}
                </div>
                ${renderNewTasks()}
            </div>
            <div class="todo-list__item">
                <h2 class="todo-heading">Doing tasks</h2>
                ${renderDoingTasks()}
              
            </div>
            <div class="todo-list__item">
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
};

const deleteTodo = (id) => {
    const currenTodo = todolist.filter((item) => item.id !== id);
    todolist = [...currenTodo];
    render(createTodoApp(), appEl);
};

const editTodo = (id) => {
    editMode = { id: id };
    render(createTodoApp(), appEl);
    const currentTodo = todolist.find((item) => item.id === id);
    const inputEl = document.querySelector("#input");
    inputEl.value = currentTodo.task;
};

const saveTodo = (id) => {
    const inputEl = document.querySelector("#input");
    const currentTodo = todolist.find((item) => item.id === id);
    currentTodo.task = inputEl.value;
    editMode = null;
    render(createTodoApp(), appEl);
};

const cancelSaveTodo = () => {
    editMode = null;
    render(createTodoApp(), appEl);
};

const editStatus = (id) => {
    const currentTodo = todolist.find((item) => item.id === id);
};
