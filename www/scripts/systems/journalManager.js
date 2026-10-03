const journalManager = 
{
    categories: ['setting', 'history', 'factions', 'characters', 'religions', 'technology', 'ship', 'ending'],
    data: {},
    slotData: {},

    newlyBanked: 0,

    init()
    {
        this.categories.forEach(id => this.data[id] = false);

        const saved = localStorage.getItem('SCCFJournal');

        if(saved)
        {
            this.data = 
            {
                ...this.data,
                ...JSON.parse(saved),
            }
        }

        this.resetSlot();
    },

    resetSlot()
    {
        this.slotData = {};
        this.categories.forEach(id => this.slotData[id] = false)
    },

    loadSlot(saved)
    {
        this.resetSlot();
        
        Object.keys(saved || {}).forEach(id =>
        {
            if(id in this.slotData && saved[id] === true)
            {
                this.slotData[id] = true;
                this.unlock(id, true);
            }
        }
        );
    },

    slotHas(id)
    {
        return this.slotData[id] === true;
    },

    slotCount()
    {
        return this.categories.filter(id => this.slotData[id] === true).length;
    },

    allJournalsCollected()
    {
        return this.categories.every(id => this.slotData[id] === true);
    },

    unlock(id, quiet = false)
    {
        if(this.data[id] === false)
        {
            this.data[id] = true;
            localStorage.setItem('SCCFJournal', JSON.stringify(this.data));

            if(!quiet && typeof showMsgPopup === 'function')
            {
                showMsgPopup('Journal Entry Unlocked');
            }
        }
    },
    
    collect(id)
    {
        if(!(id in this.slotData) || this.slotData[id] === true)
        {
            return;
        }

        this.slotData[id] = true;
        this.unlock(id, true);
        this.newlyBanked++;
    },

    takeNewlyBanked()
    {
        const count = this.newlyBanked;
        this.newlyBanked = 0;
        return count;

    }
};

window.journalManager = journalManager;

document.addEventListener('DOMContentLoaded', () => {journalManager.init();});