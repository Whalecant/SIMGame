const strings = 
{
    en:
    {
        saveMsg: 'Game Saved'
    },

    zh:
    {
        saveMsg: '游戏已保存'
    }
};

function getText(key)
{
    const lang = (window.Game && Game.settings && Game.settings.currLang) ? Game.settings.currLang : 'en';
    return (strings[lang] && strings[lang][key]) || strings.en[key] || key;
};

window.Strings = strings;
window.getText = getText;