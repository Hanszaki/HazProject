document.addEventListener("DOMContentLoaded", function () {
    const todoForm = document.getElementById("new-todo-form");
    const todoList = document.getElementById("todo-list");

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
            const todoItem = document.createElement("div");
            todoItem.className = "todo-item";

            const label = document.createElement("label");
            label.innerHTML = `
                <input type="checkbox">
                <span class="bubble ${selectedCategory}"></span>
            `;

            const todoContent = document.createElement("div");
            todoContent.className = "todo-content";
            todoContent.innerHTML = `
                <input type="text" value="${taskInput.value}" readonly>
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

            taskInput.value = "";
            for (const categoryInput of categoryInputs) {
                categoryInput.checked = false;
            }
        }
    });

    todoList.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit")) {
            const todoContentInput = event.target.parentElement.parentElement.querySelector(".todo-content input");
            todoContentInput.removeAttribute("readonly");
        } else if (event.target.classList.contains("delete")) {
            const todoItem = event.target.parentElement.parentElement;
            todoList.removeChild(todoItem);
        }
    });

    const modeToggle = document.getElementById("mode-toggle");
    const modeLabel = document.getElementById("mode-label");

    modeToggle.addEventListener("change", function () {
        if (modeToggle.checked) {
            document.body.classList.add("dark-mode");
            modeLabel.innerText = "Dark Mode";
        } else {
            document.body.classList.remove("dark-mode");
            modeLabel.innerText = "Light Mode";
        }
    });
});