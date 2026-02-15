const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

const emptyState = document.createElement("li");
emptyState.className = "empty-state";
emptyState.textContent = "No todos yet. Add one to get started.";

const renderEmptyState = () => {
  if (!list.children.length) {
    list.appendChild(emptyState);
  }
};

const removeEmptyState = () => {
  if (list.contains(emptyState)) {
    list.removeChild(emptyState);
  }
};

const addTodo = (text) => {
  const item = document.createElement("li");
  item.className = "todo-item";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.className = "todo-toggle";
  toggle.setAttribute("aria-label", "Mark todo as completed");
  toggle.addEventListener("change", () => {
    item.classList.toggle("completed", toggle.checked);
  });

  const label = document.createElement("span");
  label.textContent = text;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    list.removeChild(item);
    renderEmptyState();
  });

  item.appendChild(toggle);
  item.appendChild(label);
  item.appendChild(deleteButton);
  list.appendChild(item);
  removeEmptyState();
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) {
    return;
  }

  addTodo(value);
  input.value = "";
  input.focus();
});

renderEmptyState();
