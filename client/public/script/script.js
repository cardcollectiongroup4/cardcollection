$(document).ready(function () {
    startPage();
    $('#loginSubmit').on('submit', e => {
        e.preventDefault();
        login();
    });
    $('#formRegister').on('submit', e => {
        e.preventDefault();
        register();
    });
    $('#logoutNav').on('click', e => {
        e.preventDefault();
        logout();
    });
    $('#loginNav').on('click', e => {
        e.preventDefault();
        startPage();
    });
    $('#addRandomCard').on('click', e => {
        addRandomCard();
    });
})