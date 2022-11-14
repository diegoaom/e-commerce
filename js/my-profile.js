const $profileForm = document.querySelector("#profile");
const emailUser = localStorage.getItem("email");
const emailInput = document.querySelector("#emailInput");
const nombreInput = document.querySelector("#nombreInput");
const apellidoInput = document.querySelector("#apellidoInput");
const segundoNombreInput = document.querySelector("#segundoNombreInput");
const segundoApellidoInput = document.querySelector("#segundoApellidoInput");
const telefonoInput = document.querySelector("#telefonoInput");
const imgInput = document.querySelector("#profileIMG");
const profileImage = document.querySelector("#prof-img");

const addEmail = () => {
    emailInput.value = emailUser;
}

const createProfileInfo = () => {
    let profileInfo = {
        email: emailInput.value,
        name: nombreInput.value,
        secondName: segundoNombreInput.value,
        surname: apellidoInput.value,
        secondSurname: segundoApellidoInput.value,
        phone: telefonoInput.value
    }
    localStorage.setItem("profileInfo", JSON.stringify(profileInfo));
    localStorage.setItem("email", profileInfo.email);
}

const StorageToProfile = () => {
    if (localStorage.getItem("profileInfo")) {
        let profileInfo = JSON.parse(localStorage.getItem("profileInfo"));
        emailInput.value = profileInfo.email;
        nombreInput.value = profileInfo.name;
        segundoNombreInput.value = profileInfo.secondName;
        apellidoInput.value = profileInfo.surname;
        segundoApellidoInput.value = profileInfo.secondSurname;
        telefonoInput.value = profileInfo.phone;
    }
}

const formSend = () => {
    if ($profileForm.checkValidity()) {
        createProfileInfo();
        changeProfilePicture();
        location.reload();
    }
}

const changeProfilePicture = ()=>{
    const file = imgInput.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        let newIMG = reader.result;
        console.log(reader.result);
        profileImage.src = String(newIMG);
        localStorage.setItem("ProfileIMG", reader.result);
    })
    let newIMG = reader.readAsDataURL(file);
}

const loadProfileLS = ()=>{
    if (localStorage.getItem("ProfileIMG")) {
        profileImage.src = localStorage.getItem("ProfileIMG")
    }
}

document.addEventListener("DOMContentLoaded", () => {
    addEmail();
    StorageToProfile();
    loadProfileLS();
})

$profileForm.addEventListener("submit", (e) => {
    $profileForm.classList.add("was-validated");
    e.preventDefault();
    formSend();

})
