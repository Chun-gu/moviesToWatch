const toDoForm = document.getElementById("toDo-form");
const toDoInput = toDoForm.querySelector("input");
const taskList = document.querySelector(".task-list");
const pendingSection = document.getElementById("pending-list");
const finishedSection = document.getElementById("finished-list");
const addMovieBtn = document.getElementById("addMovie");

const PENDING = "pending";
const FINISHED = "finished";

let pendingArray = [];
let finishedArray = [];

const submitTask = (event) => {
  event.preventDefault();
  const text = toDoInput.value;
  toDoInput.value = "";
  const newTask = {
    id: Date.now(),
    text: text,
  };
  pendingArray.push(newTask);
  localStorage.setItem(PENDING, JSON.stringify(pendingArray));
  appendTask(createTask(newTask, PENDING));
};

const loadTask = () => {
  const savedPendingTasks = localStorage.getItem(PENDING);
  const savedFinishedTasks = localStorage.getItem(FINISHED);
  if (savedPendingTasks) {
    const parsedPendingTasks = JSON.parse(savedPendingTasks);
    pendingArray = parsedPendingTasks;
    pendingArray.map((elem) => createTask(elem, PENDING)).forEach(appendTask);
  }
  if (savedFinishedTasks) {
    const parsedFinishedTasks = JSON.parse(savedFinishedTasks);
    finishedArray = parsedFinishedTasks;
    finishedArray.map((elem) => createTask(elem, FINISHED)).forEach(appendTask);
  }
};

const createTask = (task, state) => {
  const P = document.createElement("P");
  P.innerText = task.text;
  const textDiv = document.createElement("div");
  textDiv.appendChild(P);

  const deleteBtn = document.createElement("button");
  deleteBtn.dataset.action = "delete";
  deleteBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;
  const btnDiv = document.createElement("div");
  btnDiv.appendChild(deleteBtn);

  switch (state) {
    case PENDING:
      const finishBtn = document.createElement("button");
      finishBtn.dataset.action = "finish";
      finishBtn.innerHTML = `<i class="fas fa-check"></i>`;
      btnDiv.appendChild(finishBtn);
      break;
    case FINISHED:
      const pendBtn = document.createElement("button");
      pendBtn.dataset.action = "pend";
      pendBtn.innerHTML = `<i class="fas fa-undo-alt"></i>`;
      btnDiv.appendChild(pendBtn);
      break;
  }

  const li = document.createElement("li");
  li.id = task.id;
  li.dataset.state = state;
  li.appendChild(textDiv);
  li.appendChild(btnDiv);
  return li;
};

const appendTask = (li) => {
  const state = li.dataset.state;
  switch (state) {
    case PENDING:
      pendingSection.appendChild(li);
      break;
    case FINISHED:
      finishedSection.appendChild(li);
      break;
  }
};

const identifyBtn = (event) => {
  const button = event.target.closest("button");
  if (button) {
    const action = button.dataset.action;
    const li = button.parentElement.parentElement;
    switch (action) {
      case "delete":
        deleteTask(li);
        break;
      case "finish":
      case "pend":
        changeState(li);
        break;
    }
  }
};

const deleteTask = (li) => {
  const state = li.dataset.state;
  switch (state) {
    case PENDING:
      const pendIdx = pendingArray.findIndex(
        (elem) => elem.id === parseInt(li.id)
      );
      pendingArray.splice(pendIdx, 1);
      localStorage.setItem(PENDING, JSON.stringify(pendingArray));
      break;
    case FINISHED:
      const FinIdx = finishedArray.findIndex(
        (elem) => elem.id === parseInt(li.id)
      );
      finishedArray.splice(FinIdx, 1);
      updatedFinishedArray = finishedArray;
      localStorage.setItem(FINISHED, JSON.stringify(updatedFinishedArray));
      break;
  }

  li.remove();
};

const changeState = (li) => {
  const task = {
    id: li.id,
    text: li.innerText,
  };
  let state = li.dataset.state;

  switch (state) {
    case PENDING:
      state = FINISHED;
      finishedArray.push(task);
      localStorage.setItem(FINISHED, JSON.stringify(finishedArray));
      break;
    case FINISHED:
      state = PENDING;
      pendingArray.push(task);
      localStorage.setItem(PENDING, JSON.stringify(pendingArray));
      break;
  }
  deleteTask(li);
  appendTask(createTask(task, state));
};

const addMovieToWatch = () => {
  const title = document.querySelector(".movie__detail__title").innerText;
  const movie = {
    id: Date.now(),
    text: `Watch "${title}"`,
  };
  if (pendingArray.some((task) => task.text === movie.text)) {
    alert("You've already added this movie!");
  } else if (finishedArray.some((task) => task.text === movie.text)) {
    alert("You've already watched this movie!");
  } else {
    pendingArray.push(movie);
    localStorage.setItem(PENDING, JSON.stringify(pendingArray));
    appendTask(createTask(movie, PENDING));
  }
};

function initToDo() {
  loadTask();
  taskList.addEventListener("click", identifyBtn);
  toDoForm.addEventListener("submit", submitTask);
  addMovieBtn.addEventListener("click", addMovieToWatch);
}

initToDo();
