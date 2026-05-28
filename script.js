const inputBox = document.getElementById("taskInput");
const listContainer = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

function addTask() {
  if (inputBox.value.trim() === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    saveData();
    filterTasks();
  }
  inputBox.value = "";
}

document.getElementById("addTaskBtn").addEventListener("click", addTask);
inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
      filterTasks();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false,
);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    document.querySelector(".filter-btn.active").classList.remove("active");
    e.target.classList.add("active");
    filterTasks();
  });
});

function filterTasks() {
  const currentFilter = document
    .querySelector(".filter-btn.active")
    .getAttribute("data-filter");
  const items = listContainer.querySelectorAll("li");

  items.forEach((item) => {
    switch (currentFilter) {
      case "all":
        item.style.display = "flex";
        break;
      case "active":
        if (item.classList.contains("checked")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
      case "completed":
        if (item.classList.contains("checked")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    listContainer.innerHTML = savedData;
  }
  filterTasks();
}

showTask();
