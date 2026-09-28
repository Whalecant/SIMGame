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

    if(userAcc.achievements)
    {
        localStorage.setItem('SCCFAchievement', JSON.stringify(userAcc.achievements));
    }

    if(userAcc.saves)
    {
        localStorage.setItem('SCCFSaves', JSON.stringify(userAcc.saves));
    }

    window.location.href = 'index.html';

}