function uiText(key, fallback)
{
    return (typeof getText === 'function') ? getText(key) : fallback;
}

function achText(id, part, fallback)
{
    if(typeof getText !== 'function')
    {
        return fallback;
    }

    const key = `ach_${id}_${part}`;
    const text = getText(key);

    return text !== key ? text : fallback;
}

const achievementManager=
{
    data:
    {
        badEnd: false,
        goodEnd: false,
        trueEnd: false,
        egg: false,
    },

    init()
    {
        const saved = localStorage.getItem('SCCFAchievement');
        if(saved)
        {
            this.data =
            {
                ...this.data,
                ...JSON.parse(saved)
            };

        }
        this.updateUI();
    },

    unlock(id)
    {
        if(this.data[id] === false)
        {
            this.data[id] = true;
            localStorage.setItem('SCCFAchievement', JSON.stringify(this.data));
            this.updateUI();

            if(typeof showMsgPopup === 'function')
            {
                showMsgPopup(uiText('achievementUnlocked', 'Achievement Unlocked!'));
            }
        }
    },

    updateUI()
    {
        Object.keys(this.data).forEach(id =>
        {
            const achElem = document.getElementById(`${id}`);

            if (!achElem)
            {
                return;
            }

            const unlocked = this.data[id];
            const titleElem = achElem.querySelector('.achievementTitle');
            const descElem = achElem.querySelector('.achievementDesc');
            const statusElem = achElem.querySelector('.achievementStatus');

            if(unlocked)
            {
                achElem.classList.remove('locked');
                achElem.classList.add('unlocked');

                if(statusElem)
                {
                    statusElem.innerText = uiText('achievementUnlockedLabel', 'Unlocked');
                }

                if(titleElem && (achElem.dataset.title || achText(id, 'title', '')))
                {
                    titleElem.innerText = achText(id, 'title', achElem.dataset.title);
                }

                if(descElem && (achElem.dataset.desc || achText(id, 'desc', '')))
                {
                    descElem.innerText = achText(id, 'desc', achElem.dataset.desc);
                }
            }
        }
        );
    }
};

function openAchievementPopup(cardElement)
{
    const popup = document.getElementById('achievementPopup');
    const unlocked = cardElement.classList.contains('unlocked');
    const id = cardElement.id;

    const icon = cardElement.querySelector('.achievementIcon').innerText;

    // locked title falls back to the normal title key, then to the data attribute
    const title = unlocked
        ? achText(id, 'title', cardElement.dataset.title)
        : achText(id, 'lockedTitle', achText(id, 'title', cardElement.dataset.lockedTitle ?? '???'));

    const desc = unlocked
        ? achText(id, 'desc', cardElement.dataset.desc)
        : achText(id, 'lockedDesc', cardElement.dataset.lockedDesc ?? uiText('achievementLockedDesc', 'Not yet unlocked.'));


    document.getElementById('popupIcon').innerText = icon;
    document.getElementById('popupTitle').innerText = title;
    document.getElementById('popupDesc').innerText = desc;

    popup.classList.toggle('locked', !unlocked);

    popup.showModal()
}


document.addEventListener('DOMContentLoaded', () =>
{
    achievementManager.init();
});

window.addEventListener('langchange', () =>
{
    achievementManager.updateUI();
});