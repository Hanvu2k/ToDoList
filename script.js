const appEl = document.querySelector("#app");
let todolist = [];
let editMode = false;

const render = (html, element, debug) => {
    if (debug) {
        return (element.innerText = html);
    } else {
        return (element.innerHTML = html);
    }
};

const renderBtn = (id) => {
    let btn;
    if (editMode) {
        btn = `
        <button id="btnSave" onclick="saveTodo(${id})">Save</button>
        <button id="btnCancel" onclick="cancelSaveTodo(${id})">Cancel</button>
        `;
    } else {
        btn = `
        <button onclick="editTodo(${id})">Edit</button>
        <button onclick=deleteTodo(${id})>Delete</button>
        `;
    }
    return btn;
};

const renderTodoList = () => {
    let html = "";
    todolist.forEach((item) => {
        html += `
      <div class="todo-item" draggable="true">
        ${item.task}
        ${renderBtn(item.id)}
      </div>
    `;
    });
    return html;
};

const createTodoApp = () => {
    return `
    <div>
      <input id="input"  type="text" placeholder="Add job"/>
      <button id="btnAdd" onclick="addTodo()">Add</button>
       ${renderTodoList()}
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
        status: "pending",
    };

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
    editMode = true;
    render(createTodoApp(), appEl);
    const currentTodo = todolist.find((item) => item.id === id);
    const inputEl = document.querySelector("#input");
    inputEl.value = currentTodo.task;
};

const saveTodo = (id) => {
    const inputEl = document.querySelector("#input");
    const currentTodo = todolist.find((item) => item.id === id);
    currentTodo.task = inputEl.value;
    editMode = false;
    render(createTodoApp(), appEl);
};

const cancelSaveTodo = () => {
    editMode = false;
    render(createTodoApp(), appEl);
};

const dragAndDrop = () => {
    const todoItems = document.querySelectorAll(".todo-item");

    todoItems.forEach((item) => {
        item.addEventListener("dragstart", () => {
            item.classList.add("dragging");
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
        });

        item.addEventListener("dragover", (e) => {
            e.preventDefault();
            const afterElement = getDragAfterElement(item, e.clientY);
            const draggable = document.querySelector(".dragging");
            if (afterElement == null) {
                item.parentNode.appendChild(draggable);
            } else {
                item.parentNode.insertBefore(draggable, afterElement);
            }
        });
    });
};

const getDragAfterElement = (container, y) => {
    const draggableElements = [
        ...container.querySelectorAll(".todo-item:not(.dragging)"),
    ];

    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
};
