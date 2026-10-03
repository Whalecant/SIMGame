class audioManager
{
    constructor()
    {
        this.currBgm = null;

        this.sounds = 
        {
            hubBgm: new Audio('assets/audio/bgm/hubBgm.wav'),
            goldBgm: new Audio('assets/audio/bgm/goldBgm.wav'),
            blackBgm: new Audio('assets/audio/bgm/blackBgm.wav'),
            whiteBgm: new Audio('assets/audio/bgm/whiteBgm.wav'),
            purpleBgm: new Audio('assets/audio/bgm/purpleBgm.wav'),
            pinkBgm: new Audio('assets/audio/bgm/pinkBgm.wav'),
            azureBgm: new Audio('assets/audio/bgm/azureBgm.wav'),
            emeraldBgm: new Audio('assets/audio/bgm/emeraldBgm.wav'),
            amberBgm: new Audio('assets/audio/bgm/amberBgm.wav'),
            redBgm: new Audio('assets/audio/bgm/redBgm.wav'),
        };

        for(const key in this.sounds)
        {
            this.sounds[key].loop = true;
        }
        
        const saved = localStorage.getItem('SCCFVolume');
        const initialVol = saved !== null ? parseInt(saved, 10) / 100 : 0.5;

        this.setVolume(initialVol);
    }

    setVolume(volume)
    {
        this.master = Math.max(0, Math.min(1, volume));

        for(const key in this.sounds)
        {
            this.sounds[key].volume = this.master;
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

    playHub()
    {
        if(this.currBgm === this.sounds.hubBgm && !this.currBgm.paused)
        {
            return;
        }

        this.playBgm('hubBgm');
    }

    pauseBgm()
    {
        if(this.currBgm)
        {
            this.currBgm.pause();
        }
    }

    resumeBgm()
    {
        if(this.currBgm)
        {
            this.currBgm.play().catch(() => {});
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