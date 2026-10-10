// the first set of code below is to set the overall game engine and defaul state and shit

const Game = 
{
    canvas: null,
    ctx: null, // above are just to get the canvas thingies from the page
    currentState: 'MAIN_MENU', // to inidicate where the player is (i.e. main menu, playing, paused, etc.)
    previousState: null, //this is to make sure for pauses (will use later duh)
    isLoopRunning: false, //to make sure it doesn't duplicate animation frame loops
    pause: null,
    lastTimeStamp: 0,
    inMinigame: false,

    currentSaveSlot: null,
    vehicleBlueprintOpen: false,

    mapOpen: false,

    // basic settings for the game
    settings:
    {
        volume: 50,
        currLang: 'en'
    },

    init()
    {
        // grabs canvas element from the game
        this.canvas = document.getElementById('gameCanvas');
        // to make sure its in 2d
        if(this.canvas)
        {
            this.ctx = this.canvas.getContext('2d');

            this.ctx.imageSmoothingEnabled = false;
        }

        this.pause = new pauseManager();

        const savedVolume = localStorage.getItem('SCCFVolume');

        if(savedVolume !== null)
        {
            this.settings.volume = parseInt(savedVolume, 10);
        }

        const slider = document.getElementById('audioSlider');

        if(slider)
        {
            slider.value = this.settings.volume;
        }

        if(window.audioManager)
        {
            window.audioManager.setVolume(this.settings.volume / 100);
        }

        if(window.overworld)
        {
            overworld.init(this.canvas, this.ctx);
        }
    },

    showScreen(screenId)
    {
        const screens = document.querySelectorAll('.uiScreen'); //grabs all screens that have the class uiScreen
        screens.forEach(screen => screen.classList.add('hidden')); //ensures everything is hidden


        //show the current screen
        if(screenId)
        {
            const targetScreen = document.getElementById(screenId);
            if(targetScreen)
            {
                targetScreen.classList.remove('hidden');
            }
        }

        updateTopNavVis(screenId);

    },

    startGameLoop()
    {
        if(!this.isLoopRunning)
        {
            this.isLoopRunning = true;
            // requestAnimationFrame is an inbuilt function that does what it says, it litearlly requests an animation from the browser and tells it to update... no shit sherlock wtf why am writing this
            requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp)) //timestamp is the JS version of time.deltaTime... NOT THE FUCK WAS THIS COMMENT ME HELLO???, deltaTime still exists here, timeStamp is to show how long the webpage has been loaded
        }

    },

    gameLoop(timestamp)
    {
        const deltaTime = this.lastTimeStamp ? (timestamp - this.lastTimeStamp) / 1000 : 0; //for context, deltaTime is measured in seconds, timestamp is measured in miliseconds (since its rem), so need proper conversion so that it doesn't fuck up timings
        this.lastTimeStamp = timestamp;

        if(this.currentState === 'PLAYING') // three = equals strict comparison, so it is guaranteed to have to be the same and not JS being stupid
        {
            this.update(deltaTime);
            this.render();
        }

        if(window.Input && typeof Input.clearJustPressed === 'function')
        {
            Input.clearJustPressed();
        }

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    },

    //obvious i don't need to fucking explain what the 2 functions below do me (yes i'm talking to myself for future reference)
    update(deltaTime)
    {
        if(this.mapOpen || this.vehicleBlueprintOpen || (window.gameConfirm && gameConfirm.isOpen) || (window.dialogue && dialogue.isOpen))
        {
            return;
        }

        if(this.inMinigame && window.overworld && overworld.activeMg)
        {
            overworld.activeMg.tick(deltaTime);
            return;
        }

        if(window.Input && !this.inMinigame && Input.consumePress('e'))
        {
            interact();
        }

        if(window.Player && typeof window.Player.update === 'function' && !this.inMinigame)
        {
            window.Player.update(deltaTime);
        }
        else if(window.overworld && window.Player)
        {
            overworld.update(Player, deltaTime);
        }
    },

    render()
    {
        if(!this.ctx)
        {
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if(window.overworld)
        {
            overworld.render(this.ctx);
        }

        const anyOverlayOpen = this.mapOpen || this.vehicleBlueprintOpen;

        const freeze = window.overworld && overworld.hidePlayer() || anyOverlayOpen;
        
        if(window.Player && typeof window.Player.render === 'function' && !freeze)
        {
            window.Player.render(this.ctx);
        }

        document.body.classList.toggle('inLevel', !!Game.inMinigame);

        const hideDpad = window.overworld && overworld.hideDpad() || anyOverlayOpen;
        showDpad(!hideDpad);

        const showButtons = window.overworld && overworld.showActionBtn() || anyOverlayOpen;
        showActionBtn(showButtons);
    }
};

// the set of code below is for global ui functions (less comments will be present below because I actually know what I'm doing now :D)
// 下面的评论会少一些，因为我现在真的知道自己在做什么了 :D
function refreshMenuBackground()
{
    const menu = document.getElementById('mainMenu');

    if(!menu)
    {
        return;
    }

    let achievements = {};

    try
    {
        achievements = JSON.parse(localStorage.getItem('SCCFAchievement') || '{}');
    }
    catch(e) {}

    const beaten = ['badEnd', 'goodEnd', 'trueEnd'].some(id => achievements[id] === true);

    menu.classList.toggle('beaten', beaten);
}

document.addEventListener('DOMContentLoaded', refreshMenuBackground);

function showDpad(visible)
{
    const dpad = document.getElementById('dpad');

    if(dpad)
    {
        if(visible)
        {
            dpad.classList.remove('hidden');
        }
        else
        {
            dpad.classList.add('hidden');
        }
    }
}

function showPauseButton(visible)
{
    const pauseBtn = document.getElementById('pauseBtnMobile');

    if(pauseBtn)
    {
        if(visible)
        {
            pauseBtn.classList.remove('hidden');
        }
        else
        {
            pauseBtn.classList.add('hidden');
        }
    }
}

function showActionBtn(visible)
{
    const container = document.getElementById('actionBtnMbl');

    if(container)
    {
        if(visible)
        {
            container.classList.remove('hidden');
        }
        else
        {
            container.classList.add('hidden');
        }
    }
}

function interact()
{
    if(!(window.overworld && overworld.showActionBtn()) || Game.inMinigame)
    {
        return;
    }

    if(window.oldMan && window.Player && window.roomManager && roomManager.currRoomId === 'hub' && oldMan.nearPlayer(Player))
    {
        oldMan.talk();
        return;
    }

    if(window.savePoint && window.Player && window.roomManager && roomManager.currRoomId === 'hub' && savePoint.nearPlayer(Player))
    {
        saveManager.save(Game.currentSaveSlot);
        
        showMsgPopup(getText('saveMsg'));

        return;
    }

    if(window.Vehicle && window.Player && window.roomManager && roomManager.currRoomId === 'hub' && Vehicle.nearPlayer(Player) && window.journalManager)
    {
        if(allPartsInstalled() && journalManager.allJournalsCollected())
        {
            gameConfirm.open(
            {
                title: getText('finalTitle'),
                text: getText('finalReady'),
                yes: getText('btnEnter'), 
                no: getText('btnNotYet'),
                onYes: () => startMinigameInstance('redNode', null)
            });
            return;
        }
        else if(!allPartsInstalled() && journalManager.allJournalsCollected())
        {
            gameConfirm.open(
            {
                title: getText('finalTitle'),
                text: getText('finalNoParts'),                
                yes: getText('btnEnterAnyway'), 
                no: getText('btnViewBlueprint'),
                onYes: () => startMinigameInstance('redNode', null),
                onNo: () => openVehicleBlueprint()
            });
            return;
        }
        else if(allPartsInstalled() && !journalManager.allJournalsCollected())
        {
            gameConfirm.open(
            {
                title: getText('finalTitle'),
                text: getText('finalNoLogs'),  
                yes: getText('btnEnterAnyway'), 
                no: getText('btnViewBlueprint'),
                onYes: () => startMinigameInstance('redNode', null),
                onNo: () => openVehicleBlueprint()

            }    
            );

            return;
        }
        
        gameConfirm.open(
            {
                title: getText('finalTitle'),
                text: getText('finalMissingBoth'), 
                yes: getText('btnEnterAnyway'), 
                no: getText('btnViewBlueprint'),
                onYes: () => startMinigameInstance('redNode', null),
                onNo: () => openVehicleBlueprint()
            }
        );
        return;

    }

    if(window.stationManager && window.Player && window.roomManager)
    {
        const station = window.stationManager.getNearbyStation(Player, roomManager.currRoomId);

        if(station)
        {
            startMinigameInstance(station.currentMgId, station.rewardPartKey);
        }
        return;
    }

}

function allPartsInstalled()
{
    return !!(window.Vehicle && Vehicle.installedParts.size >= 8);
}

function startMinigameInstance(mgId, rewardPartKey)
{
    const mgClass = window.stationManager ? window.stationManager.minigames[mgId] : null;

    if(!mgClass)
    {
        console.error(`No minigame class with node color '${mgId}'`);
        return;
    }

    Game.inMinigame = true;

    const pauseBtn = document.getElementById('pauseBtnMobile');

    if(pauseBtn)
    {
        pauseBtn.textContent = '||';
        pauseBtn.classList.add('inMinigame');
    }

    if(window.Input && typeof Input.clearJustPressed === 'function')
    {
        Input.clearJustPressed();
        Input.keysDown = {};
    }

    const mgInstance = new mgClass
    (
        Game.canvas,
        Game.ctx,
        (success) => completeMiniGame(mgId, success, rewardPartKey)
    );

    if(window.overworld)
    {
        overworld.activeMg = mgInstance;
        overworld.mode = 'mg';
    }

    if(typeof mgInstance.start === 'function')
    {
        mgInstance.start();
    }
    else if(typeof mgInstance.init === 'function')
    {
        mgInstance.init();
    }

    if(window.audioManager)
    {
        window.audioManager.playBgm(mgId);
    }
}

// function toggleMap()
// {
//     if(!(window.overworld && overworld.showActionBtn()))
//     {
//         return;
//     }

//     Game.mapOpen = true;

//     const mapOverlay = document.getElementById('mapOverlay')

//     if(mapOverlay)
//     {
//         mapOverlay.classList.remove('hidden');
//     }

//     showMobileControls(false);
//     showActionBtn(false);

//     //this overly added shit is just to make sure its safe

//     document.removeEventListener('click', closeMap)
//     setTimeout(() =>
//     {
//         document.addEventListener('click', closeMap);
//     }, 0);
// }

function closeMap()
{
    Game.mapOpen = false;

    const mapOverlay = document.getElementById('mapOverlay');
    if(mapOverlay)
    {
        mapOverlay.classList.add('hidden');
    }

    showMobileControls(true);

    const showButtons = window.overworld && overworld.showActionBtn();
    showActionBtn(showButtons);

    document.removeEventListener('click', closeMap);
}
/**
function openMinigameOverlay(mgId)
{
    const mgOverlay = document.getElementById(mgId);
    if(!mgOverlay)
    {
        return;
    }

    Game.inMinigame = true;
    mgOverlay.classList.remove('hidden');

    if(window[mgId] && typeof window[mgId].init === 'function')
    {
        window[mgId].init();
    }
}
**/

function completeMiniGame(mgId, success, rewardPartKey)
{
    Game.inMinigame = false;

    if(window.audioManager)
    {
        if(mgId === 'redNode' && success)
        {
            window.audioManager.stopBgm();
        }
        else
        {
            window.audioManager.playHub();
        }
    }

    const pauseBtn = document.getElementById('pauseBtnMobile');

    if(pauseBtn)
    {
        pauseBtn.textContent = '||';
        pauseBtn.classList.remove('inMinigame');
    }

    if(window.overworld)
    {
        overworld.activeMg = null;
        overworld.mode = 'room';
    }

    if(success)
    {
        if(mgId === 'redNode')
        {
            const ending = getEndingType();
            const achId = {
                BAD: 'badEnd',
                GOOD: 'goodEnd',
                TRUE: 'trueEnd',
            }

            if (typeof achievementManager !== 'undefined')
            {
                achievementManager.unlock(achId[ending]);
            }

            showCutscene(ending);
            return;
        }

        let msg = '';

        if(rewardPartKey && window.Vehicle && !window.Vehicle.installedParts.has(rewardPartKey))
        {
            window.Vehicle.installPart(rewardPartKey);
            msg = getText('partInstalled', { part: rewardPartKey, count: window.Vehicle.installedParts.size, total: 8 });
        }

        const newLogs = window.journalManager ? journalManager.takeNewlyBanked() : 0;

        if(newLogs > 0)
        {
            const logText = getText('journalUnlocked');
            msg = msg ? `${msg}. ${logText}` : logText;
        }

        if(msg)
        {
            showMsgPopup(msg, 3000);
        }

        if(window.stationManager)
        {
            window.stationManager.markLevelComplete(mgId);
        }
    }

    if(mgId !== 'redNode' && window.saveManager && Game.currentSaveSlot)
    {
        saveManager.save(Game.currentSaveSlot);

        if(!success)
        {
            showMsgPopup(getText('saveMsg'));
        }
    }
}

function getEndingType()
{
    const allLevelDone = window.Vehicle && Vehicle.installedParts.size >= 8;

    if(!allLevelDone)
    {
        return 'BAD';
    }

    const allJournals = window.journalManager && journalManager.allJournalsCollected();

    return allJournals ? 'TRUE' : 'GOOD';
}

function openVehicleBlueprint()
{
    const overlay = document.getElementById('vehicleBlueprint');
    const list = document.getElementById('vehiclePartsList');

    if(!overlay || !list || !window.Vehicle)
    {
        return;
    }

    list.innerHTML = '';
    const required = ['Part1', 'Part2', 'Part3', 'Part4', 'Part5', 'Part6', 'Part7', 'Part8'];

    required.forEach(partKey =>
    {
        const row = document.createElement('div');
        const isInstalled = window.Vehicle.installedParts.has(partKey);

        row.className = 'vehiclePartRow' + (isInstalled ? ' done' : '');
        row.textContent = `${partKey} - ${getText(isInstalled ? 'partDone' : 'partMissing')}`;        list.appendChild(row);
    });

    const journalList = document.getElementById('vehicleJournalList');
    const journalTitle = document.getElementById('vehicleJournalTitle');

    if(journalList && window.journalManager)
    {
        journalList.innerHTML = '';
        journalTitle.textContent = getText('journalLogsTitle', { count: journalManager.slotCount(), total: journalManager.categories.length });

        journalManager.categories.forEach(id =>
        {
            const row = document.createElement('div');
            const found = journalManager.slotHas(id);
            const catKey = 'cat_' + id;
            const label = getText(catKey) !== catKey ? getText(catKey) : id.charAt(0).toUpperCase() + id.slice(1);

            row.className = 'vehiclePartRow' + (found ? ' done' : '');
            row.textContent = `${label} - ${getText(found ? 'journalCollected' : 'journalMissing')}`;
            journalList.appendChild(row);
        });
    }

    overlay.classList.remove('hidden');
    Game.vehicleBlueprintOpen = true;

    document.removeEventListener('click', closeVehicleBlueprint);
    setTimeout(() =>
    {
        document.addEventListener('click', closeVehicleBlueprint);
    }, 0);
}

function closeVehicleBlueprint()
{
    const overlay = document.getElementById('vehicleBlueprint');
    if(overlay)
    {
        overlay.classList.add('hidden');
    }

    Game.vehicleBlueprintOpen = false;

    document.removeEventListener('click', closeVehicleBlueprint);
}

function showMobileControls(visible)
{
    showDpad(visible);
    showPauseButton(visible);
    showActionBtn(visible);
}

function openMenu(screenId)
{
    if(screenId === 'settingsScreen')
    {
        Game.previousState = Game.currentState;
    }

    if(screenId === 'saveScreen')
    {
        refreshAllSaveSlots();
    }

    Game.showScreen(screenId);
}

function backToMainMenu()
{
    Game.currentState = 'MAIN_MENU';
    Game.showScreen('mainMenu');
}

function closeSettings()
{
    if(Game.previousState === 'PAUSED')
    {
        Game.showScreen(Game.inMinigame ? 'mgPauseScreen' : 'pauseScreen');
    }
    else
    {
        Game.showScreen('mainMenu');
    }
}

function switchTabSettings(tabId, btnElement)
{
    document.querySelectorAll('.settingTabs .tabBtn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.settingContent .tabPanel').forEach(panel => panel.classList.add('hidden'));

    if(btnElement)
    {
        btnElement.classList.add('active');
    }

    const targetPanel = document.getElementById(tabId);
    if (targetPanel)
    {
        targetPanel.classList.remove('hidden');
    }
}

function updateAudioVolume(val)
{
    Game.settings.volume = parseInt(val, 10);
    localStorage.setItem('SCCFVolume', Game.settings.volume);

    if(window.audioManager)
    {
        window.audioManager.setVolume(Game.settings.volume / 100);
    }
}

function toggleLanguage()
{
    lang.set(lang.current() === 'en' ? 'zh' : 'en');
}

function resetNewGame()
{
    if(window.Player)
    {
        Player.x = 640;
        Player.y = 400;
    }

    if(window.roomManager)
    {
        roomManager.currRoomId = 'hub';
    }

    if(window.Vehicle)
    {
        window.Vehicle.installedParts.clear();
    }

    if(window.journalManager)
    {
        journalManager.resetSlot();
    }

    if(window.stationManager)
    {
        window.stationManager.completedLevels.clear();
    }
}

function loadSave(slotNumber, overrideData = null)
{
    Game.currentSaveSlot = slotNumber;

    const data = overrideData || (window.saveManager ? saveManager.load(slotNumber) : null);    
    
    if(data)
    {

        if(window.Player)
        {
            Player.x = data.playerX;
            Player.y = data.playerY;
        }

        if(window.roomManager)
        {
            roomManager.currRoomId = data.roomId;
        }

        // if(window.Vehicle && data.installedParts)
        // {
        //     window.Vehicle.installedParts = new Set(data.installedParts);
        // }

        // if(window.stationManager && data.completedLevels)
        // {
        //     window.stationManager.completedLevels = new Set(data.completedLevels)
        // }

        if(window.Vehicle)
        {
            window.Vehicle.installedParts = new Set(data.installedParts || []);
        }

        if(window.journalManager)
        {
            journalManager.loadSlot(data.journal);
        }

        if(window.stationManager)
        {
            window.stationManager.completedLevels = new Set(data.completedLevels || []);
        }
        
    }
    else
    {
        resetNewGame();
    }

    Game.currentState = 'PLAYING';
    Game.showScreen(null);
    Game.startGameLoop();

    if(window.audioManager)
    {
        window.audioManager.playHub();
    }

    showMobileControls(true);
}

let pendingDeleteSlot = null;

function deleteSave(slotNumber)
{
    pendingDeleteSlot = slotNumber;

    const confirmDelete = document.getElementById('confirmDelete');
    if(confirmDelete)
    {
        confirmDelete.classList.remove('hidden');
    }
}

function confirmDeleteSave()
{
    if(window.eggManager)
    {
        eggManager.clearSlot(pendingDeleteSlot);
    }

    if(pendingDeleteSlot === null)
    {
        return;
    }

    if(window.saveManager)
    {
        saveManager.deleteSave(pendingDeleteSlot);
    }

    refreshSaveSlotDisplay(pendingDeleteSlot);

    pendingDeleteSlot = null;

    const confirmDelete = document.getElementById('confirmDelete');
    if(confirmDelete)
    {
        confirmDelete.classList.add('hidden');
    }
}

function cancelDeleteSave()
{
    pendingDeleteSlot = null;
    
    const confirmDelete = document.getElementById('confirmDelete');
    if(confirmDelete)
    {
        confirmDelete.classList.add('hidden');
    }
}

function refreshSaveSlotDisplay(slot)
{
    const slotText = document.getElementById(`infoSlot${slot}`);
    
    if(!slotText)
    {
        return;
    }

    const data = window.saveManager ? saveManager.load(slot) : null;
    const slotBox = slotText.closest('.saveSlot');


    if(data)
    {
        const TOTAL_LEVELS = 8;
        const totalJournal = (window.journalManager && journalManager.categories) ? journalManager.categories.length : 8;

        const levelCount = Array.isArray(data.completedLevels) ? data.completedLevels.length : 0;
        const journalCount = data.journal ? Object.values(data.journal).filter(Boolean).length : 0;

        slotText.textContent = getText('slotInfo',
        {
            levels: levelCount,
            totalLevels: TOTAL_LEVELS,
            journal: journalCount,
            totalJournal: totalJournal
        });
    }
    else
    {
        slotText.textContent = getText('slotEmpty');
    }
    
    if(slotBox)
    {
        const hasEgg = !!data && window.eggManager && eggManager.isTaken(slot);
        slotBox.classList.toggle('hasEgg', hasEgg);
    }
}

    

function refreshAllSaveSlots()
{
    [1, 2, 3].forEach(refreshSaveSlotDisplay);
}

window.addEventListener('langchange', refreshAllSaveSlots);

let msgPopupTimeout = null;

function showMsgPopup(message, duration = 2000)
{
    const msgPopup = document.getElementById('msgPopup');
    if(!msgPopup)
    {
        return;
    }

    msgPopup.textContent = message;
    msgPopup.classList.add('visible');

    clearTimeout(msgPopupTimeout);
    msgPopupTimeout = setTimeout(() =>
    {
        msgPopup.classList.remove('visible');
    }, duration);
}

function togglePause()
{
    if(window.dialogue && dialogue.isOpen)
    {
        return;
    }

    if(window.gameConfirm && gameConfirm.isOpen)
    {
        return;
    }
    
    if(Game.inMinigame && window.overworld && overworld.activeMg)
    {
        if(Game.currentState === 'PLAYING')
        {
            Game.currentState = 'PAUSED';
            Game.showScreen('mgPauseScreen');

            if(window.audioManager)
            {
                window.audioManager.pauseBgm();
            }
        }
        else if(Game.currentState === 'PAUSED')
        {
            Game.currentState = 'PLAYING';
            Game.showScreen(null);

            if(window.audioManager)
            {
                window.audioManager.resumeBgm();
            }
        }

        return;
    }

    if(Game.vehicleBlueprintOpen || Game.mapOpen)
    {
        return;
    }

    if(Game.currentState === 'PLAYING')
    {
        if(!Game.pause.canPause())
        {
            return;
        }

        Game.currentState = 'PAUSED';
        Game.showScreen('pauseScreen');

        if(window.audioManager)
        {
            window.audioManager.pauseBgm();
        }

        showMobileControls(false);
        showActionBtn(false);

    }
    else if(Game.currentState === 'PAUSED')
    {
        Game.currentState = 'PLAYING';
        Game.showScreen(null);
        
        if(window.audioManager)
        {
            window.audioManager.resumeBgm();
        }

        showMobileControls(true);
        showActionBtn(true);

    }
}

const cutsceneTyper = 
{
    charDelay: 20,
    linePause: 700,
    endPause: 1200,

    lines: [],
    ending: '',
    lineIdx: 0,
    charIdx: 0,
    timer: null,
    phase: 'done',
    paragraph: null,
    startedAt: 0,

    following: true,
    expectedTop: 0,

    follow()
    {
        if(!this.following)
        {
            return;
        }

        const overlay = document.getElementById('cutscene');
        overlay.scrollTop = overlay.scrollHeight;
        this.expectedTop = overlay.scrollTop;
    },

    onUserScroll(overlay)
    {
        if(Math.abs(overlay.scrollTop - this.expectedTop) < 2)
        {
            return;
        }

        const maxTop = overlay.scrollHeight - overlay.clientHeight;

        this.following = maxTop - overlay.scrollTop < 4;
        this.expectedTop = overlay.scrollTop;
    },

    start(endingType)
    {
        this.following = true;
        this.expectedTop = 0;
        document.getElementById('cutscene').scrollTop = 0;

        this.stop();
        

        this.lines = getEndingLines(endingType);       
        this.ending = endingType;
        this.lineIdx = 0;
        this.startedAt = performance.now();

        document.getElementById('cutsceneText').textContent = '';
        document.getElementById('cutsceneTitle').classList.add('hidden');
        document.getElementById('cutsceneContBtn').classList.add('hidden');

        this.nextLine();
    },

    nextLine()
    {
        if(this.lineIdx >= this.lines.length)
        {
            this.showEnding();
            return;
        }

        this.paragraph = document.createElement('p');
        this.paragraph.classList.add('caret');
        document.getElementById('cutsceneText').appendChild(this.paragraph);

        this.charIdx = 0;
        this.phase = 'typing';
        this.typeChar();

        this.follow();
    },

    typeChar()
    {
        const line = this.lines[this.lineIdx];

        if(this.charIdx < line.length)
        {
            this.charIdx++;
            this.paragraph.textContent = line.slice(0, this.charIdx);
            this.follow();
            this.timer = setTimeout(() => this.typeChar(), this.charDelay);
            return;
        }

        this.finishLine();
    },

    finishLine()
    {
        this.paragraph.textContent = this.lines[this.lineIdx];
        this.paragraph.classList.remove('caret');
        this.lineIdx++;
        this.phase = 'pause';

        const isLast = this.lineIdx >= this.lines.length;
        this.timer = setTimeout(() => this.nextLine(), isLast ? this.endPause : this.linePause);
    },

    skip()
    {
        if(this.phase === 'done' || performance.now() - this.startedAt < 400)
        {
            return;
        }

        clearTimeout(this.timer)

        if(this.phase === 'typing')
        {
            this.finishLine()
        }
        else
        {
            this.nextLine();
        }
    
    },

    showEnding()
    {
        this.phase = 'done';
        
        const title = document.getElementById('cutsceneTitle');
        title.textContent = getText('endingTitle' + this.ending);
        title.classList.remove('hidden');

        document.getElementById('cutsceneContBtn').classList.remove('hidden');

        this.follow();
    },

    stop()
    {
        clearTimeout(this.timer);
        this.phase = 'done';
    }
};


function showCutscene(endingType)
{
    Game.currentState = 'END';
    showMobileControls(false);
    Game.showScreen('cutscene');

    const continueBtn = document.getElementById('cutsceneContBtn');

    if(continueBtn)
    {
        continueBtn.onclick = () =>
        {
            cutsceneTyper.stop();
            quitToMainMenu();
        };
    }

    cutsceneTyper.start(endingType);
    
}

document.addEventListener('DOMContentLoaded', () =>
{
    const overlay = document.getElementById('cutscene');

    if(!overlay)
    {
        return;
    }

    overlay.addEventListener('scroll', () =>
    {
        cutsceneTyper.onUserScroll(overlay);
    });

    let tapStart = null;

    overlay.addEventListener('pointerdown', (e) =>
    {
        const onScrollbar = e.clientX > overlay.getBoundingClientRect().left + overlay.clientWidth;
        tapStart = onScrollbar ? null : { x: e.clientX, y: e.clientY };
    });

    overlay.addEventListener('pointerup', (e) =>
    {
        if(!tapStart)
        {
            return;
        }

        const moved = Math.hypot(e.clientX - tapStart.x, e.clientY - tapStart.y);
        tapStart = null;

        if(moved < 10)
        {
            cutsceneTyper.skip();
        }
    });

    document.addEventListener('keydown', (e) =>
    {
        if(Game.currentState !== 'END')
        {
            return;
        }

        const overlay = document.getElementById('cutscene');

        if(e.key === ' ' || e.key === 'Enter')
        {
            e.preventDefault();

            if(!e.repeat)
            {
                cutsceneTyper.skip();
            }
        }
        else if(e.key === 'ArrowDown')
        {
            overlay.scrollBy({ top: 80 });
        }
        else if(e.key === 'ArrowUp')
        {
            overlay.scrollBy({ top: -80 });
        }
    });
});

function returnToHub()
{
    Game.currentState = 'PLAYING';
    Game.showScreen(null);

    if(window.overworld && overworld.activeMg)
    {
        overworld.activeMg.stop(false);
    }
}

//I am in fact not tripping, Yes there is two different __ToMainMenu functions... I'm sorry me
function quitToMainMenu()
{
    Game.currentState = 'MAIN_MENU';

    if(Game.ctx)
    {
        Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
    }

    if(window.audioManager && typeof window.audioManager.stopAll === 'function')
    {
        window.audioManager.stopAll();
    }

    Game.showScreen('mainMenu');
    showMobileControls(false);
    showActionBtn(false);
}

function updateTopNavVis(screenId)
{
    const topNav = document.querySelector('.topNavLinks');
    if(!topNav)
    {
        return;
    }

    if(screenId === 'mainMenu')
    {
        topNav.classList.remove('hidden');
    }
    else
    {
        topNav.classList.add('hidden');
    }
}

// initialization
window.addEventListener('DOMContentLoaded', () =>
{
    Game.init();
});