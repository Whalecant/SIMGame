class pauseManager
{
    constructor()
    {
        this.pauseScreen = document.getElementById('pauseScreen');
        this.bindEvents();
    }

    bindEvents()
    {
        window.addEventListener('keydown', (e) =>
        {
            if(e.key == 'Escape')
            {
                togglePause();
            }
        })
    }

    canPause()
    {
        if(Game.currentState === 'MAIN_MENU')
        {
            return false;
        }

        if(Game.inMinigame)
        {
            return true;
        }

        return true;
    }
}