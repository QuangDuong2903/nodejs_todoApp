document.querySelector('.img__btn').addEventListener('click', function() {
    document.querySelector('.cont').classList.toggle('s--signup');
});

const btnLogin = document.querySelector('.btn-sign-in')

const loginUsername = document.querySelector('#login-username')

const loginPassword = document.querySelector('#login-password')

const btnSignup = document.querySelector('.btn-sign-up')

const signupUsername = document.querySelector('#signup-username')

const signupPassword = document.querySelector('#signup-password')

const signupConfirmPassword = document.querySelector('#signup-confirm-password')

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

btnLogin.addEventListener('click', () => {
    if(loginUsername.value && loginPassword.value)
    {
        let url = new URL(window.location.protocol + '//' + window.location.host + '/login')
        url.searchParams.append('username', loginUsername.value)
        url.searchParams.append('password', loginPassword.value)
        fetch(url)
        .then(res => res.json())
        .then(data => {
            if(data.id)
            {
                setCookie('token', data.token, 1)
                window.location.href = '/user/' + data.id
            }
            else
                alert(data) 
        })
    }
})

btnSignup.addEventListener('click', () => {
    if(signupUsername.value && signupPassword.value && signupConfirmPassword.value) {
        if(signupPassword.value == signupConfirmPassword.value)
        {
            fetch('/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: signupUsername.value, password: signupPassword.value})
            })
            .then(res => res.json())
            .then(data => {
                if(data.id)
                {
                    alert(data.message)
                    window.location.href = '/user/' + data.id
                }
                else
                    alert(data)
            })
        }
    }
})

