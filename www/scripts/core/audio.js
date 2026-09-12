class audioManager
{
    constructor()
    {
        this.currBgm = null;

        this.sounds = 
        {
            goldBgm: new Audio('assets/audio/bgm/goldBgm.wav'),
            blackBgm: new Audio('assets/audio/bgm/blackBgm.wav'),
            whiteBgm: new Audio('assets/audio/bgm/whiteBgm.wav'),
            purpleBgm: new Audio('assets/audio/bgm/purpleBgm.wav'),
            pinkBgm: new Audio('assets/audio/bgm/pinkBgm.wav'),
            azureBgm: new Audio('assets/audio/bgm/azureBgm.wav'),
            emeraldBgm: new Audio('assets/audio/bgm/emeraldBgm.wav'),
            amberBgm: new Audio('assets/audio/bgm/amberbgm.wav'),
            redBgm: new Audio('assets/audio/bgm/redBgm.wav'),
        };

        for(const key in this.sounds)
        {
            this.sounds[key].loop = true;
        }
        
        const initialVol = (window.Game && Game.settings.volume !== undefined) ? Game.settings.volume / 100 : 0.5;

        this.setVolume(initialVol)
    }

    setVolume(volume)
    {
        for(const key in this.sounds)
        {
            this.sounds[key].volume = volume;
        }
    }

    playBgm(mgId)
    {const bgmKey = mgId.replace('Node', 'Bgm');

        this.stopBgm();

        if(this.sounds[bgmKey])
        {
            this.currBgm = this.sounds[bgmKey];
            this.currBgm.currentTime = 0;
            this.currBgm.play().catch(err => console.warn(`BGM playback blocked:`, err));
        }
    }

    stopBgm()
    {
        if(this.currBgm)
        {
            this.currBgm.pause();
            this.currBgm.currentTime = 0;
            this.currBgm = null;
        }
    }

    stopAll()
    {
        this.stopBgm();
    }
}

window.audioManager = new audioManager();