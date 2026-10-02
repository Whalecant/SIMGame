const accountSync = 
{
    slots: [1, 2, 3],

    readJSON(key)
    {
        try
        {
            return JSON.parse(localStorage.getItem(key) || '{}') || {};
        }
        catch(e)
        {
            return {};
        }
    },

    snapshot()
    {
        const snap = 
        {
            achievements: this.readJSON('SCCFAchievement'),
            journal: this.readJSON('SCCFJournal'),
            saves: {},
            eggs: {},
        };

        this.slots.forEach(slot =>
        {
            const save = localStorage.getItem(`saveSlot${slot}`);

            if(save !== null)
            {
                snap.saves[slot] = save;
            }

            if(localStorage.getItem(`SCCFEggTaken_${slot}`) == '1')
            {
                snap.eggs[slot] = true;
            }
        }
        );

        return snap;
    },

    push()
    {
        const user = localStorage.getItem('currentUser');
        const userDB = this.readJSON('userDB');

        if(!user || !userDB[user])
        {
            return;
        }

        userDB[user].data = this.snapshot();
        localStorage.setItem('userDB', JSON.stringify(userDB));
    },

    mergeFlags(local, account)
    {
        const merged = {...local}

        Object.keys(account || {}).forEach(key =>
        {
            merged[key] = merged[key] === true || account[key] === true;
        }
        );

        return merged;
    },

    pull(user)
    {
        const userDB = this.readJSON('userDB');
        const data = userDB[user] && userDB[user].data;

        if(!data)
        {
            return;
        }

        localStorage.setItem('SCCFAchievement', JSON.stringify(this.mergeFlags(this.readJSON('SCCFAchievement'), data.achievements)));
        localStorage.setItem('SCCFJournal', JSON.stringify(this.mergeFlags(this.readJSON('SCCFJournal'), data.journal)));

        this.slots.forEach(slot =>
        {
            if(data.saves && data.saves[slot])
            {
                localStorage.setItem(`saveSlot${slot}`, data.saves[slot]);
            }

            if(data.eggs && data.eggs[slot])
            {
                localStorage.setItem(`SCCFEggTaken_${slot}`, '1');
            }
        }
        );
    },

    clearLocal()
    {
        localStorage.removeItem('SCCFAchievement');
        localStorage.removeItem('SCCFJournal');

        this.slots.forEach(slot =>
        {
            localStorage.removeItem(`saveSlot${slot}`);
            localStorage.removeItem(`SCCFEggTaken_${slot}`);
        }
        );
    }
};