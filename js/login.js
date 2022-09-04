const alertEmpty = document.querySelector("#alertEmpty");
const logBtn = document.querySelector("#logBtn");
const googleBtn = document.querySelector("#googleBtn");

// function logIn () {

//     if (user.value && password.value){
//         localStorage.setItem("email", user.value);
//         window.location.href = "index.html";
//     } else {
//         alertEmpty.classList.add("show");
//         setTimeout(() => { alertEmpty.classList.remove("show");; }, 1500);
//     }

// }

logBtn.addEventListener("click", () => {
    logIn();
});

// function oauthSignIn() {
//     let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
//     let form = document.createElement('form');
//     form.setAttribute('method', 'GET');
//     form.setAttribute('action', oauth2Endpoint);
  
//     let params = {'client_id': '1090179886368-mr1njuelvdg7rd2r1antoi7iuruh27bi.apps.googleusercontent.com',
//                   'redirect_uri': 'http://127.0.0.1:5500/index.html',
//                   'response_type': 'token',
//                   'scope': 'https://www.googleapis.com/auth/userinfo.email',
//                   'include_granted_scopes': 'true',
//                   'state': 'pass-through value'};
  
//     for (let p in params) {
//       let input = document.createElement('input');
//       input.setAttribute('type', 'hidden');
//       input.setAttribute('name', p);
//       input.setAttribute('value', params[p]);
//       form.appendChild(input);
//     }
  
//     document.body.appendChild(form);
//     form.submit();
// }

// googleBtn.addEventListener("click", () => {
//     oauthSignIn();
// });

