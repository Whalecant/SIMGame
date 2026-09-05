const achievementManager=
{
    data:
    {
        badEnd: false,
        neutEnd: false,
        goodEnd: false,
        twentyVeh: false,
        secretAchievement: false
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
                showMsgPopup(`Achievement Unlocked!`);
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
                    statusElem.innerText = 'Unlocked';
                }

                if(achElem.dataset.title && titleElem)
                {
                    titleElem.innerText = achElem.dataset.title;
                }

                if(achElem.dataset.desc && descElem)
                {
                    descElem.innerText = achElem.dataset.desc;
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

    const icon = cardElement.querySelector('.achievementIcon').innerText;

    let title = cardElement.dataset.title;
    let desc = cardElement.dataset.desc;

    if(unlocked && cardElement.dataset.unlockedTitle)
    {
        title = cardElement.dataset.unlockedTitle;
        desc = cardElement.dataset.unlockedDesc;
    }

    document.getElementById('popupIcon').innerText = icon;
    document.getElementById('popupTitle').innerText = title;
    document.getElementById('popupDesc').innerText = desc;

    popup.showModal()
}


document.addEventListener('DOMContentLoaded', () =>
{
    achievementManager.init();
});