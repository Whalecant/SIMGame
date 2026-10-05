function findAccountKey(userDB, name)
{
    if(Object.prototype.hasOwnProperty.call(userDB, name))
    {
        return name;
    }

    const lower = name.toLowerCase();
    const match = Object.keys(userDB).find(key => key.toLowerCase() === lower);

    return match === undefined ? null : match;
}

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
            messageElem.textContent = getText('registeredMsg');
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

    const accountKey = findAccountKey(userDB, usernameInput);

    if(accountKey === null)
    {
        if(messageElem)
        {
            messageElem.style.color = '#f87171';

            messageElem.textContent = getText('noAccountMsg');
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



    const userAcc = userDB[accountKey];
    if(userAcc.password !== passwordInput)
    {
        if(messageElem)
        {
            messageElem.textContent = getText('badPasswordMsg');
            messageElem.style.color = '#f87171';
        }

        return;
    }

    localStorage.setItem('currentUser', accountKey);

    accountSync.pull(accountKey);
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
            title: getText('logoutTitle'),
            text: getText('logoutText', { user: getCurrentuser() }),
            yes: getText('logoutYes'),
            no: getText('cancel'),
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