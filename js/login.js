
function logIn () {

    if (user.value && password.value){
        localStorage.setItem("email", user.value);
        window.location.href = "index.html";
    } else {
        alertEmpty.classList.add("show");
        setTimeout(() => { alertEmpty.classList.remove("show");; }, 1500);
    }

}

logBtn.addEventListener("click", () => {
    logIn();
});