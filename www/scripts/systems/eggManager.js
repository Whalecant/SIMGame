const eggManager = 
{
    EGG_PAGE: 'egg.html',
    RETURN_KEY: 'SCCFEggReturn',

    maxGapMs: 3500,
    minStreak: 5,

    baseChance: 0.03,
    chanceStep: 0.03,
    maxChance: 0.75,

    streak: 0,
    lastSwapTime: 0,
    lastFrom: null,
    lastTo: null,

    takenKey(slot)
    {
        return `SCCFEggTaken_${slot}`;
    },

    isTaken(slot)
    {
        return localStorage.getItem(this.takenKey(slot)) === '1';
    },

    clearSlot(slot)
    {
        localStorage.removeItem(this.takenKey(slot));
    },

    resetStreak()
    {
        this.streak = 0;
        this.lastFrom = null;
        this.lastTo = null;
    },

    onRoomSwap(fromRoom, toRoom)
    {
        const slot = (typeof Game !== 'undefined') ? Game.currentSaveSlot : null;
        const involvesHub = fromRoom === 'hub' || toRoom === 'hub';

        if(!involvesHub || slot === null || this.isTaken(slot))
        {
            this.resetStreak();
            return;
        }

        const now = performance.now();
        const fast = (now - this.lastSwapTime) < this.maxGapMs;
        const undoesLast = this.lastFrom === toRoom && this.lastTo === fromRoom;

        if(this.streak > 0 && fast && undoesLast)
        {
            this.streak++;
        }
        else
        {
            this.streak = 1;
        }

        this.lastSwapTime = now;
        this.lastFrom = fromRoom;
        this.lastTo = toRoom;

        if(this.streak < this.minStreak)
        {
            return;
        }

        const chance = Math.min(this.maxChance, this.baseChance + this.chanceStep * (this.streak - this.minStreak));

        if(Math.random() < chance)
        {
            this.enter();
        }
    },

    enter()
    {
        const slot = Game.currentSaveSlot;
        const snapshot = window.saveManager ? saveManager.buildData() :null;

        localStorage.setItem(this.RETURN_KEY, JSON.stringify({slot: slot, time: Date.now(), state: snapshot}));
        window.location.replace(this.EGG_PAGE);
    },

    resumeIfReturning()
    {
        const raw = localStorage.getItem(this.RETURN_KEY);

        if(!raw)
        {
            return false;
        }

        localStorage.removeItem(this.RETURN_KEY);

        try
        {
            const info = JSON.parse(raw);
            const fresh = Date.now() - (info.time || 0) < 30 * 60 * 1000;

            if(info && typeof info.slot === 'number' && info.state && fresh)
            {
                loadSave(info.slot, info.state);
                return true;
            }
        }
        catch(e)
        {
            console.error('smth went wrong with egg return data', e);
        }

        return false;
    }
};

window.eggManager = eggManager;

window.addEventListener('load', () =>
{
    eggManager.resumeIfReturning();
});