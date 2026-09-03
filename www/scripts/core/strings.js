const strings = 
{
    en:
    {
        saveMsg: 'Game Saved',
        partDone: 'Installed',
        partMissing: 'Missing',
    },

    zh:
    {
        saveMsg: '游戏已保存',
        partDone: '已安装',
        partMissing: '缺失',
    }
};

function getText(key)
{
    const lang = (window.Game && Game.settings && Game.settings.currLang) ? Game.settings.currLang : 'en';
    return (strings[lang] && strings[lang][key]) || strings.en[key] || key;
};

window.Strings = strings;
window.getText = getText;