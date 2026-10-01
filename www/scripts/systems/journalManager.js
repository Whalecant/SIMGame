const journalManager = 
{
    categories: ['setting', 'history', 'factions', 'characters', 'technology', 'ship', 'ending'],
    data: {},

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
    },

    unlock(id)
    {
        if(this.data[id] === false)
        {
            this.data[id] = true;
            localStorage.setItem('SCCFJournal', JSON.stringify(this.data));

            if(typeof showMsgPopup === 'function')
            {
                showMsgPopup('Journal Entry Unlocked');
            }
        }
    },

    allJournalsCollected()
    {
        return this.categories.every(id => this.data[id] === true);
    }
};

document.addEventListener('DOMContentLoaded', () => {journalManager.init();});