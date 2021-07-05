const loginForm = document.getElementById("login-form");
const loginInput = document.querySelector("#login-form input");
const helloMessage = document.querySelector("#helloMessage span");
const signOutBtn = document.querySelector("#helloMessage button");

const USERNAME_KEY = "username";
const CLASSNAME_HIDDEN = "hidden";

function logIn(event) {
  event.preventDefault();
  loginForm.classList.add(CLASSNAME_HIDDEN);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  sayHi(username);
  signOutBtn.addEventListener("click", signOut);
}

function sayHi(username) {
  helloMessage.innerText = `Hello, ${username}`;
  helloMessage.parentElement.classList.remove(CLASSNAME_HIDDEN);
}

function signOut() {
  localStorage.removeItem(USERNAME_KEY);
  helloMessage.parentElement.classList.add(CLASSNAME_HIDDEN);
  loginForm.classList.remove(CLASSNAME_HIDDEN);
  loginInput.value = "";
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(CLASSNAME_HIDDEN);
  loginForm.addEventListener("submit", logIn);
} else {
  sayHi(savedUsername);
  signOutBtn.addEventListener("click", signOut);
}
