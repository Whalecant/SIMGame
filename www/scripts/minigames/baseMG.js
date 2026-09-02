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
    }

    start()
    {
        this.isRunning = true;
        this.isPaused = false;
        this.init();
    }

    stop(success = false)
    {
        this.isRunning = false;
        this.cleanup();
        if(typeof this.onComplete === 'function')
        {
            this.onComplete(success);
        }
    }

    // the following funcitons are present for what is going to be used in the minigames itself
    init(){}
    update(deltaTime){}
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