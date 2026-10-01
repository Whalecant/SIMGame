const gameConfirm = 
{
    isOpen: false,

    open({title='', text='', yes = 'Yes', no = 'Cancel', onYes, onNo})
    {
        if(this.isOpen)
        {
            return;
        }

        this.isOpen = true;

        document.getElementById('gameConfirmTitle').textContent = title;
        document.getElementById('gameConfirmText').textContent = text;

        const yesBtn = document.getElementById('gameConfirmYes');
        const noBtn = document.getElementById('gameConfirmNo');

        yesBtn.textContent = yes;
        noBtn.textContent = no;

        yesBtn.onclick = () => {
            this.close();
            if(onYes)
                onYes();
        };

        noBtn.onclick = () =>{
            this.close();
            if(onNo)
                onNo();
        };

        document.getElementById('gameConfirm').classList.remove('hidden');
    },

    close()
    {
        this.isOpen = false;
        document.getElementById('gameConfirm').classList.add('hidden');
    }
};

window.gameConfirm = gameConfirm;