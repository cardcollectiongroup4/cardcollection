let base_url = 'http://localhost:3000/';

function startPage() {
    if (!localStorage.getItem('token')) {
      $('#quotes').hide();
        $('#email').val('');
        $('#password').val('');
        $('#loginNav').show();
        $('#registerNav').show();
        $('#logoutNav').hide();
        $('#validateLogin').hide();
        $('#loginPage').show();
        $('#registerPage').hide();
        $('#cardPage').hide();
        $('#registerNav').on('click', e => {
            e.preventDefault();
            renderRegisterPage();
        })
    } else {
        $('.show-quotes').empty();
        $('#cards').empty();
        $('#loginNav').hide();
        $('#registerNav').hide();
        $('#logoutNav').show();
        renderCardPage();
    }
}

function register() {
    const email = $('#emailRegister').val();
    const password = $('#passwordRegister').val();
    const confirmPassword = $('#confirmPassword').val();
    if (password !== confirmPassword) {
        renderRegisterPage('Password not match !');
        return;
    }
    $.ajax({
        url: base_url + 'auth/registration',
        method: 'POST',
        data: { email, password }
    })
        .done(() => {
            startPage();
        })
        .fail(err => {
            const msg = err.responseJSON.message;
            renderRegisterPage(msg);
        })
}

function renderRegisterPage(err = null) {
    $('#emailRegister').val('');
    $('#passwordRegister').val('');
    $('#confirmPassword').val('');
    $('#registerPage').show();
    $('#loginPage').hide();
    $('#loginNav').show();
    $('#registerNav').show();
    $('#logoutNav').hide();
    $('#cardPage').hide();
    $('#validateLogin').hide();
    $('#validateRegister').hide();

    if (err) {
        $('#validateRegister').text(err);
        $('#validateRegister').show();
    }
}

function login() {
    const email = $('#email').val();
    const password = $('#password').val();
    console.log(email);
    console.log(password);
    $.ajax({
        url: base_url + 'auth/login',
        method: 'POST',
        data: { email, password }
    })
        .done(data => {
            localStorage.setItem('token', data.token);
            startPage();
        })
        .fail(err => {
            startPage();
            $('#validateLogin').text('Invalid email or password');
            $('#validateLogin').show();
        })
}

function logout() {
    localStorage.clear();
    signOut();
    startPage();
}

function renderCardPage() {
    $('#loginPage').hide();
    $('#registerPage').hide();
    $('#cardPage').show();
    $.ajax({
        url: base_url + 'card',
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(data => {
            let html = '';
            data.forEach(e => {
                let card = `<div class="card m-2 show-quotes" style="width: 150px; height: 200px;">
                                <img src="${e.url}" class="card-img-top" alt="card" >
                            </div>`;
                html += card;
            });
            $('#cards').html(html);
        })
        .fail(err => {
            console.log(err);
        });
}

function showQuotes() {
  $.ajax({
    url: base_url + 'card/quotes',
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(data => {
      $('#quotes').show();
      $('#quotes').html(`<h1>"${data}"</h1>`)
    })
    .fail(err => {
      console.log(err);
    })
}

function close() {
  $('#quotes').hide();
}

function addRandomCard() {
    $.ajax({
        url: base_url + 'card/generate',
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(data => {
            $.ajax({
                url: base_url + 'card',
                method: 'POST',
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    imgUrl: data
                }
            })
                .done(() => {
                    startPage();
                })
        })
        .fail(err => {
            console.log(err);
        })
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: base_url + 'auth/loginOauth',
        method: 'POST',
        data: { token: id_token }
    })
        .done(data => {
            localStorage.setItem('token', data.token);
            startPage();
        })
        .fail(err => {
            console.log(err);
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

