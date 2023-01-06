const alertEmpty = document.querySelector("#alertEmpty");
const logBtn = document.querySelector("#logBtn");
const googleBtn = document.querySelector("#googleBtn");
const user = document.querySelector("#account-email");
const password = document.querySelector("#account-password");

function logIn() {

    if (user.value && password.value) {
        localStorage.setItem("email", user.value);
        window.location.href = "index.html";
    } else {
        alertEmpty.classList.add("show");
        setTimeout(() => { alertEmpty.classList.remove("show");; }, 1500);
    }

}

function handleCredentialResponse(response) {
    console.log(response);
    const responsePayload = parseJwt(response.credential);
    console.log(responsePayload.email);
    localStorage.setItem("email", responsePayload.email);
    window.location.href = "index.html";
}

function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

function googleLogIn() {
    google.accounts.id.initialize({
        client_id: '1090179886368-mr1njuelvdg7rd2r1antoi7iuruh27bi.apps.googleusercontent.com',
        callback: handleCredentialResponse
    });
    google.accounts.id.prompt();

}

logBtn.addEventListener("click", () => {
    logIn();
});

googleBtn.addEventListener("click", () => {
    googleLogIn();
});
