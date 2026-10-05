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
    //this shit is purely so that it cna autofill the things based on the login page :thumbsup:
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

        if(msgParam == 'not_found')
        {
            const msgElem = document.getElementById('registerMessage');
            if(msgElem)
            {
                msgElem.style.color = '#f87171';
                msgElem.textContent = getText('registerNotFoundMsg');
            }
        }
    }
});

function handleRegister(event)
{
    event.preventDefault();

    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value;
    const msgElem = document.getElementById('registerMessage');

    const userDB = JSON.parse(localStorage.getItem('userDB') || '{}');


    if(findAccountKey(userDB, usernameInput) !== null)
    {
        if(msgElem)
        {
            msgElem.style.color = '#f87171';
            msgElem.textContent = getText('usernameTakenMsg');
        }
        return;
    }

    userDB[usernameInput] =
    {
        password: passwordInput,
        data: null,
    };


    localStorage.setItem('userDB', JSON.stringify(userDB));

    window.location.href = `login.html?username=${encodeURIComponent(usernameInput)}&msg=registered`;

}