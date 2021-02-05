$(document).ready(function () {
    startPage();
    // $('#quotes').hide();
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
      e.preventDefault();
        addRandomCard();
    });
    $('#quotes').on('click', e => {
      e.preventDefault();
      close();
    });
})

$(document).on('click', ".show-quotes", () => {
  showQuotes();
})

// $(document).on('click', "")
