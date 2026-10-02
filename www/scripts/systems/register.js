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
                msgElem.textContent = "Account not found. Please create an account below.";
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

    
    if(userDB[usernameInput])
    {
        if(msgElem)
        {
            msgElem.style.color = '#f87171';
            msgElem.textContent = "Account already exists / Username already taken";
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
