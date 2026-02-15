const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const themeToggle = document.getElementById("theme-toggle");

const themeStorageKey = "todo-theme";

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
};

const getPreferredTheme = () => {
  const storedTheme = localStorage.getItem(themeStorageKey);
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

let currentTheme = getPreferredTheme();
applyTheme(currentTheme);

themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem(themeStorageKey, currentTheme);
  applyTheme(currentTheme);
});

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
    // Add fade-out animation before removal
    item.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      list.removeChild(item);
      renderEmptyState();
    }, 300);
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
