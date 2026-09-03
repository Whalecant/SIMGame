const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

const input = 
{
    keysDown: {},
    keysJustPressed: {},

    init()
    {
        window.addEventListener('keydown', (e) =>
        {
            const key = e.key.toLowerCase();
            if(!this.keysDown[key])
            {
                this.keysJustPressed[key] = true;
            }
            this.keysDown[key] = true;
        });

        window.addEventListener('keyup', (e) =>
        {
            this.keysDown[e.key.toLowerCase()] = false;
        });
    },

    initTouch()
    {
        const dpadButtons = document.querySelectorAll('.dpadBtn');

        dpadButtons.forEach((btn) =>
        {
            const key = btn.dataset.key;

            btn.addEventListener('touchstart', (e) =>
            {
                e.preventDefault();
                this.keysDown[key] = true;
            });

            btn.addEventListener('touchend', (e) =>
            {
                e.preventDefault();
                this.keysDown[key] = false;
            });

            btn.addEventListener('touchcancel', (e) =>
            {
                e.preventDefault();
                this.keysDown[key] = false;
            });
        });

        const actionBtn = document.getElementById('actionBtnMbl');
        if(actionBtn)
        {
            actionBtn.addEventListener('touchstart', (e) =>
            {
                e.preventDefault();
                
                if(typeof interact === 'function')
                {
                    interact();
                }
            });
        }
    },

    isDown(key)
    {
        return !!this.keysDown[key.toLowerCase()];
    },

    consumePress(key)
    {
        key = key.toLowerCase();
        if(this.keysJustPressed[key])
        {
            this.keysJustPressed[key] = false;
            return true;
        }
        return false;
    }
};

window.Input = input;

window.addEventListener('DOMContentLoaded', () =>
{
    input.init();

    if(isTouchDevice)
    {
        input.initTouch();
    }
    else
    {
        document.getElementById('dpad').remove();

        const actionbtn = document.getElementById('actionBtnMbl');
        if(actionbtn)
        {
            actionbtn.remove();
        }
    }
})