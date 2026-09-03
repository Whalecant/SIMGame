const strings = 
{
    en:
    {
        saveMsg: 'Game Saved',
        partDone: 'Installed',
        partMissing: 'Missing',
        alrCarryPart: 'Already Carrying Part',
        acquiredPart: 'Acquired Part: ',
        installedPart: 'Part Installed: ',
        scrappedPart: 'Part Scrapped: ',
        takeToVeh: 'Bring back to vehicle'
    },

    zh:
    {
        saveMsg: '游戏已保存',
        partDone: '已安装',
        partMissing: '缺失',
        alrCarryPart: '手上已有零件',
        acquiredPart: '获得零件：',
        installedPart: '已安装零件：',
        scrappedPart: '零件已报废：',
        takeToVeh: '请将其送到载具处'
    }
};

function getText(key)
{
    const lang = (window.Game && Game.settings && Game.settings.currLang) ? Game.settings.currLang : 'en';
    return (strings[lang] && strings[lang][key]) || strings.en[key] || key;
};

window.Strings = strings;
window.getText = getText;