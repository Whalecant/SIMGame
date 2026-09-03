class baseMinigame
{
    constructor(canvas, ctx, onComplete)
    {
        this.canvas = canvas;
        this.ctx = ctx;
        this.onComplete = onComplete;

        this.isRunning = false;
        this.isPaused = false;
        this.hidePlayer = false;
        this.hideDpad = false;
    }

    start()
    {
        this.isRunning = true;
        this.isPaused = false;


        //failsafe cuz bugs are happening, might as well try everything tha ti can find and just leave em
        if(this.canvas && typeof this.canvas.focus === 'function')
        {
            this.canvas.focus();
        }

        this.init();
    }

    stop(success = false, rewardKey = null)
    {
        if(!this.isRunning)
        {
            return;
        }

        this.isRunning = false;
        this.cleanup();
        if(typeof this.onComplete === 'function')
        {
            this.onComplete(success, rewardKey);
        }
    }

    // the following funcitons are present for what is going to be used in the minigames itself
    init(){}
    update(deltaTime)
    {
        if(window.Input && Input.consumePress('q'))
        {
            this.stop(false);
        }
    }
    render(){}
    cleanup(){}


    tick(deltaTime)
    {
        if(!this.isRunning || this.isPaused)
        {
            return;
        }

        this.update(deltaTime);
        this.render();
    }

}