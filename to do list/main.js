document.addEventListener("DOMContentLoaded", function () {
    const todoForm = document.getElementById("new-todo-form");
    const todoList = document.getElementById("todo-list");

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (const task of storedTasks) {
        createTodoItem(task.content, task.category, task.completed);
    }

    todoForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const taskInput = document.getElementById("content");
        const categoryInputs = document.querySelectorAll('input[type="radio"]');
        let selectedCategory = null;

        for (const categoryInput of categoryInputs) {
            if (categoryInput.checked) {
                selectedCategory = categoryInput.value;
                break;
            }
        }

        if (taskInput.value.trim() !== "" && selectedCategory !== null) {
            createTodoItem(taskInput.value, selectedCategory, false);
            taskInput.value = "";
            for (const categoryInput of categoryInputs) {
                categoryInput.checked = false;
            }

            saveTasksToLocalStorage();
        }
    });

    todoList.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit")) {
            const todoContentInput = event.target.parentElement.parentElement.querySelector(".todo-content input");
            todoContentInput.removeAttribute("readonly");
        } else if (event.target.classList.contains("delete")) {
            const todoItem = event.target.parentElement.parentElement;
            todoList.removeChild(todoItem);

            saveTasksToLocalStorage();
        } else if (event.target.type === "checkbox") {
            const todoContentInput = event.target.parentElement.parentElement.querySelector(".todo-content input");
            if (event.target.checked) {
                todoContentInput.style.textDecoration = "line-through";
            } else {
                todoContentInput.style.textDecoration = "none";
            }
        }
    });

    const modeToggle = document.getElementById("mode-toggle");
    const modeLabel = document.getElementById("mode-label");

    const isDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

    modeToggle.checked = isDarkMode;

    modeToggle.addEventListener("change", function () {
        if (modeToggle.checked) {
            document.body.classList.add("dark-mode");
            modeLabel.innerText = "Dark Mode";
        } else {
            document.body.classList.remove("dark-mode");
            modeLabel.innerText = "Light Mode";
        }

        localStorage.setItem("darkMode", JSON.stringify(modeToggle.checked));
    });

    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        modeLabel.innerText = "Dark Mode";
    }

    function createTodoItem(content, category, completed) {
        const todoItem = document.createElement("div");
        todoItem.className = "todo-item";

        const label = document.createElement("label");
        label.innerHTML = `
            <input type="checkbox" ${completed ? "checked" : ""}>
            <span class="bubble ${category}"></span>
        `;

        const todoContent = document.createElement("div");
        todoContent.className = "todo-content";
        todoContent.innerHTML = `
            <input type="text" value="${content}" ${completed ? 'readonly style="text-decoration: line-through;"' : ""}>
        `;

        const actions = document.createElement("div");
        actions.className = "actions";
        actions.innerHTML = `
            <button class="edit">Edit</button>
            <button class="delete">Hapus</button>
        `;

        todoItem.appendChild(label);
        todoItem.appendChild(todoContent);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        saveTasksToLocalStorage();
    }

    function saveTasksToLocalStorage() {
        const tasks = [];
        const todoItems = document.querySelectorAll(".todo-item");
        for (const todoItem of todoItems) {
            const content = todoItem.querySelector(".todo-content input").value;
            const category = todoItem.querySelector(".bubble").classList[1];
            const completed = todoItem.querySelector("input[type='checkbox']").checked;
            tasks.push({ content, category, completed });
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
