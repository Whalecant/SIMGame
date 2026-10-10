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
        const buttons = document.querySelectorAll('.dpadBtn, .actionBtn');

        buttons.forEach((btn) =>
        {
            const key = btn.dataset.key;

            if(!key)
            {
                return;
            }

            btn.addEventListener('touchstart', (e) =>
            {
                e.preventDefault();

                if(!this.keysDown[key])
                {
                    this.keysJustPressed[key] = true;
                }

                this.keysDown[key] = true;
            });

            const release = (e) =>
            {
                e.preventDefault();
                this.keysDown[key] = false;
            };

            btn.addEventListener('touchend', release);
            btn.addEventListener('touchcancel', release);
        });
    },

    isDown(key)
    {
        return !!this.keysDown[key.toLowerCase()];
    },

    consumePress(key)
    {
        if(!key)
        {
            return false;
        }

        key = key.toLowerCase();
        if(this.keysJustPressed[key])
        {
            this.keysJustPressed[key] = false;
            return true;
        }
        return false;
    },

    clearJustPressed()
    {
        this.keysJustPressed = {};
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