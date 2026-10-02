document.addEventListener('DOMContentLoaded', () =>
{
    const urlParam = new URLSearchParams(window.location.search);
    const usernameParam = urlParam.get('username');
    const msgParam = urlParam.get('msg');

    if(usernameParam)
    {
        const usernameInput = document.getElementById('username');
        if(usernameInput)
        {
            usernameInput.value = usernameParam;
        }
    }

    if(msgParam === 'registered')
    {
        const messageElem = document.getElementById('loginMessage')
        if(messageElem)
        {
            messageElem.style.color = 'lightgreen';
            messageElem.textContent = "Account created succesfully! Please log in";
        }
    }
})

function handleLogin(event)
{
    event.preventDefault();

    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value;
    const messageElem = document.getElementById('loginMessage');

    const userDB = JSON.parse(localStorage.getItem('userDB') || '{}');

    if(!userDB[usernameInput])
    {
        if(messageElem)
        {
            messageElem.style.color = '#f87171';

            messageElem.textContent = "Account does not exist. Please register first.";
        }
        

        const registerBtn = document.getElementById('registerBtn');
        if(registerBtn)
        {
            const registerURL = `register.html?username=${encodeURIComponent(usernameInput)}&msg=not_found`;
            registerBtn.onclick = () => 
            {
                window.location.href=registerURL;
            };
        }
        
        return;
    }



    const userAcc = userDB[usernameInput];
    if(userAcc.password !== passwordInput)
    {
        if(messageElem)
        {
            messageElem.textContent = "Invalid password. Try Again";
            messageElem.style.color = '#f87171';
        }

        return;
    }

    localStorage.setItem('currentUser', usernameInput);

    accountSync.pull(usernameInput);
    accountSync.push();

    window.location.href = 'index.html';

}

function getCurrentuser()
{
    return localStorage.getItem('currentUser');
}

function refreshAutoButton()
{
    const btn = document.getElementById('authBtn');

    if(!btn)
        return;

    const user = getCurrentuser();

    if(user)
    {
        btn.removeAttribute('data-i18n');
        btn.textContent = user;
    }
    else
    {
        btn.setAttribute('data-i18n', 'login');
        btn.textContent = (typeof getText === 'function') ? getText('login') : 'login';
    }
}

function onAuthButtonClick()
{
    if(!getCurrentuser())
    {
        window.location.href = 'login.html';
        return;
    }

    gameConfirm.open(
        {
            title: 'Log out',
            text: `Log out of ${getCurrentuser()}?`,
            yes: 'Log out',
            no: 'Cancel',
            onYes: logout,
        }
    );
}

function logout()
{
    accountSync.push();
    accountSync.clearLocal();
    localStorage.removeItem('currentUser');
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', refreshAutoButton);