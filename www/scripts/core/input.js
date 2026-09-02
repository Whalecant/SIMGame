const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

const input = 
{
    keysDown: {},

    init()
    {
        window.addEventListener('keydown', (e) =>
        {
            this.keysDown[e.key.toLowerCase()] = true;
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
    },

    isDown(key)
    {
        return !!this.keysDown[key.toLowerCase()];
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
    }
})