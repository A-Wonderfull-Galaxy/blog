// show/hide form with button

const showSignUp = document.getElementById("sgnp-btn");
const signUpFormElement = document.getElementById('signup-form');

showSignUp.addEventListener("click", function () {

    let formStatus = signUpFormElement.classList.contains('d-none');
    if (formStatus) {
        signUpFormElement.classList.remove('d-none');
        showSignUp.innerText = 'Hide signup Form';
    }
    else {
        signUpFormElement.classList.add('d-none');
        showSignUp.innerText = 'SignUp'
    }
})

const showLogin = document.getElementById("logn-btn");
const loginFormElement = document.getElementById('login-form');

showLogin.addEventListener("click", function () {

    let formStatus = loginFormElement.classList.contains('d-none');
    if (formStatus) {
        loginFormElement.classList.remove('d-none');
        showLogin.innerText = 'Hide Login Form';
    }
    else {
        loginFormElement.classList.add('d-none');
        showLogin.innerText = 'Login'
    }
})

// form handlers for signup
async function signupFormHandler(event) {
    event.preventDefault();

    // gets the data from form
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();;

    // make sures that form contains data
    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        //check stauts
        if (response.ok) {
            // after log in or sign up redirect to home
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert(response.statusText);
            }

        } else {
            alert(response.statusText)
        }
    }
}

//form handler for login
async function loginFormHandler(event) {

    event.preventDefault();
    
    const username = document.querySelector('#user-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // make sure form has data 
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);