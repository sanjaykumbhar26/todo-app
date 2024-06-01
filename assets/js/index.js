document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.getElementById('input-box');
    const addButton = document.getElementById('add-btn');
    const todoList = document.querySelector('.todo-list');
    const clearButton = document.getElementById('clear-btn');
    const pendingTasks = document.querySelector('.pending-tasks');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let selectedTaskIndex = null;

    function updateLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodoList() {
        todoList.innerHTML = '';
        todos.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;
            li.addEventListener('click', () => {
                selectedTaskIndex = (selectedTaskIndex === index) ? null : index;
                inputBox.value = (selectedTaskIndex !== null) ? item : '';
            });
            const deleteButton = document.createElement('div');
            deleteButton.textContent = 'D';
            deleteButton.classList.add('icon');
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();
                deleteTodoItem(index);
            });
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
        updatePendingTasks();
    }

    function deleteTodoItem(index) {
        todos.splice(index, 1);
        renderTodoList();
        inputBox.value = '';
        updateLocalStorage();
    }

    function updatePendingTasks() {
        pendingTasks.textContent = todos.length;
    }

    addButton.addEventListener('click', () => {
        const inputBoxValue = inputBox.value.trim();
        if (inputBoxValue !== '') {
            if (selectedTaskIndex !== null) {
                todos[selectedTaskIndex] = inputBoxValue;
                selectedTaskIndex = null;
            } else {
                todos.push(inputBoxValue);
            }
            inputBox.value = '';
            renderTodoList();
            updateLocalStorage();
        }
    });

    clearButton.addEventListener('click', () => {
        todos = [];
        renderTodoList();
        updateLocalStorage();
    });

    renderTodoList();
});
