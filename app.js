let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

displayItems();

function addTodo() {
  const inputElement = document.querySelector('#todo-input');
  const dateElement = document.querySelector('#todo-date');
  const priorityElement = document.querySelector('#todo-priority');

  const todoItem = inputElement.value.trim();
  const todoDate = dateElement.value;
  const todoPriority = priorityElement.value;

  if (!todoItem || !todoDate) {
    alert('Please enter a valid Todo and Date!');
    return;
  }

  todoList.push({ item: todoItem, dueDate: todoDate, priority: todoPriority, completed: false });
  saveTodos();
  inputElement.value = '';
  dateElement.value = '';
  displayItems();
}

function displayItems() {
  const containerElement = document.querySelector('.todo-container');
  containerElement.innerHTML = '';
  todoList.forEach((todo, index) => {
    const { item, dueDate, priority, completed } = todo;
    const todoElement = document.createElement('div');
    todoElement.className = `todo-item ${completed ? 'completed' : ''}`;
    todoElement.innerHTML = `
      <span>${item}</span>
      <span>${dueDate}</span>
      <span>${priority}</span>
      <button class="btn-todo" onclick="toggleComplete(${index});">${completed ? 'Undo' : 'Complete'}</button>
      <button class="btn-delete" onclick="deleteTodo(${index});">Delete</button>
    `;
    containerElement.appendChild(todoElement);
  });
}

function toggleComplete(index) {
  todoList[index].completed = !todoList[index].completed;
  saveTodos();
  displayItems();
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  saveTodos();
  displayItems();
}

function clearAllTodos() {
  if (confirm('Are you sure you want to clear all todos?')) {
    todoList = [];
    saveTodos();
    displayItems();
  }
}

function saveTodos() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}
