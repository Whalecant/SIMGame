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
        }

        this.pause = new pauseManager();

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
        if(window.gameTimer)
        {
            window.gameTimer.update(deltaTime);

            const timer = document.getElementById('vehicleTimer');

            if(timer)
            {
                timer.textContent = window.gameTimer.getFormattedTime();
            }
        }

        if(this.mapOpen || this.vehicleBlueprintOpen)
        {
            return;
        }

        if(this.inMinigame && window.overworld && overworld.activeMg)
        {
            overworld.activeMg.tick(deltaTime);
        }
        else
        {
            if(window.overworld && window.Player)
            {
                overworld.update(Player, deltaTime);
            }

            if(window.Input && !this.inMinigame)
            {
                if(Input.consumePress('e'))
                {
                    interact();
                }

                if(Input.consumePress('m'))
                {
                    toggleMap();
                }
            }

            if(window.Player && typeof window.Player.update === 'function' && !this.inMinigame)
            {
                window.Player.update(deltaTime);
            }
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

        const freeze = window.overworld && overworld.hidePlayer() || this.anyOverlayOpen;
        
        if(window.Player && typeof window.Player.render === 'function' && !freeze)
        {
            window.Player.render(this.ctx);
        }

        const hideDpad = window.overworld && overworld.hideDpad() || anyOverlayOpen;
        showDpad(!hideDpad);

        const showButtons = window.overworld && overworld.showActionBtn() || anyOverlayOpen;
        showActionBtn(showButtons);
    }



};

// the set of code below is for global ui functions (less comments will be present below because I actually know what I'm doing now :D)
// 下面的评论会少一些，因为我现在真的知道自己在做什么了 :D
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

    if(window.savePoint && window.Player && window.roomManager && roomManager.currRoomId === 'hub' && savePoint.nearPlayer(Player))
    {
        saveManager.save(Game.currentSaveSlot);
        
        showMsgPopup(getText('saveMsg'));

        return;
    }

    if(window.Vehicle && window.Player && window.roomManager && roomManager.currRoomId === 'hub' && Vehicle.nearPlayer(Player))
    {
        if(window.vehicleManager && window.vehicleManager.heldPart)
        {
            window.vehicleManager.deliverHeldPart();
        }
        else
        {
            openVehicleBlueprint();
        }
        
        return;
    }

    if(window.stationManager && window.Player && window.roomManager)
    {
        const station = window.stationManager.getNearbyStation(window.Player, roomManager.currRoomId)
        
        if(station)
        {
            if(window.vehicleManager && window.vehicleManager.heldPart)
            {
                showMsgPopup(getText('alrCarryPart'));
                return;
            }

            startMinigameInstance(station.currentMgId, station.rewardPartKey);
            return;
        }
    }

}

function startMinigameInstance(mgId, rewardPartKey)
{
    if(!window[mgId])
    {
        return;
    }

    Game.inMinigame = true;

    const pauseBtn = document.getElementById('pauseBtnMobile');

    if(pauseBtn)
    {
        pauseBtn.textContent = 'X';
        pauseBtn.classList.add('inMinigame');
    }

    if(window.Input && typeof Input.clearJustPressed === 'function')
    {
        Input.clearJustPressed();
        Input.keysDown = {};
    }

    const mgInstance = new window[mgId]
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
}

function toggleMap()
{
    if(!(window.overworld && overworld.showActionBtn()))
    {
        return;
    }

    Game.mapOpen = true;

    const mapOverlay = document.getElementById('mapOverlay')

    if(mapOverlay)
    {
        mapOverlay.classList.remove('hidden');
    }

    showMobileControls(false);
    showActionBtn(false);

    setTimeout(() =>
    {
        document.addEventListener('click', closeMap)
    }, 0);
}

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

function completeMiniGame(mgId, success, rewardPartKey)
{
    Game.inMinigame = false;

    const pauseBtn = document.getElementById('pauseBtnMobile');

    if(pauseBtn)
    {
        pauseBtn.text = '||';
        pauseBtn.classList.remove('inMinigame');
    }

    if(window.overworld)
    {
        overworld.activeMg = null;
        overworld.mode = 'room';
    }

    const mgOverlay = document.getElementById(mgId);
    if(mgOverlay)
    {
        mgOverlay.classList.add('hidden');
    }

    if(window.vehicleManager)
    {
        if(success && rewardPartKey)
        {
            window.vehicleManager.receivePart(rewardPartKey);
        }
    }

}

function openVehicleBlueprint()
{
    const overlay = document.getElementById('vehicleBlueprint');
    const list = document.getElementById('vehiclePartsList');

    if(!overlay || !list || !window.vehicleManager || !window.vehicleManager.activeVehicle)
    {
        return;
    }

    list.innerHTML = '';
    const parts = window.vehicleManager.activeVehicle.parts;

    Object.keys(parts).forEach(partKey =>
    {
        const row = document.createElement('div');
        row.className = 'VehiclePartRow' + (parts[partKey] ? 'done' : '');
        row.textContent = `${partKey} - ${parts[partKey] ? getText('partDone') : getText('partMissing')}`;
        list.appendChild(row);
    });

    overlay.classList.remove('hidden');
    Game.vehicleBlueprintOpen = true;

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

function showVehicleTimer(visible)
{
    const timerElem = document.getElementById('vehicleTimer');

    if(timerElem)
    {
        if(visible)
        {
            timerElem.classList.remove('hidden');
        }
        else
        {
            timerElem.classList.add('hidden');
        }
    }
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
        Game.showScreen('pauseScreen');
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
    if(window.AudioSystem && typeof window.AudioSystem.setVolume === 'function')
    {
        window.AudioSystem.setVolume(Game.settings.volume / 100);
    }
}

function toggleLanguage()
{
    Game.settings.currLang = Game.settings.currLang === 'en' ? 'zh' : 'en';

    const langBtn = document.getElementById('languageButton');

    if(langBtn)
    {
        langBtn.textContent = Game.settings.currLang === 'en' ? 'English' : '中文简体'
    }
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

    if(window.vehicleManager)
    {
        window.vehicleManager.currentVehicleIdx = 0;
        window.vehicleManager.repairCount = 0;
        window.vehicleManager.activeVehicle = null;
        window.vehicleManager.heldPart = null;
        window.vehicleManager.spawnNextVeh();
    }

    if(window.gameTimer)
    {
        window.gameTimer.reset();
    }
}

function loadSave(slotNumber)
{
    Game.currentSaveSlot = slotNumber;

    const data = window.saveManager ? saveManager.load(slotNumber): null;
    
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

        if(window.vehicleManager && data.vehicle)
        {
            window.vehicleManager.currentVehicleIdx = data.vehicle.currentVehicleIdx;
            window.vehicleManager.repairCount = data.vehicle.repairCount;
            window.vehicleManager.activeVehicle = data.vehicle.activeVehicle;
        }

        if(window.gameTimer && data.timer)
        {
            window.gameTimer.currDay = data.timer.currDay;
            window.gameTimer.elapsedSec = data.timer.elapsedSec;
        }
        
    }
    else
    {
        resetNewGame();
    }

    Game.currentState = 'PLAYING';
    Game.showScreen(null);
    Game.startGameLoop();

    showMobileControls(true);
    showVehicleTimer(true);
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

    if(data)
    {
        const vehicleNum = (data.vehicle && typeof data.vehicle.currentVehicleIdx === 'number') ? data.vehicle.currentVehicleIdx + 1 : 1;
        const dayNum = (data.timer && typeof data.timer.currDay === 'number') ? data.timer.currDay : 1;

        slotText.textContent = `Day ${dayNum} | Vehicle ${vehicleNum}`;
    }
    else
    {
        slotText.textContent = 'Empty';
    }
}

function refreshAllSaveSlots()
{
    [1, 2, 3].forEach(refreshSaveSlotDisplay);
}

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

    if(Game.inMinigame && window.overworld && overworld.activeMg)
    {
        overworld.activeMg.stop(false);
        Game.inMinigame = false;

        const pauseBtn = document.getElementById('pauseBtnMobile');
        if(pauseBtn)
        {
            pauseBtn.textContent = '||';
            pauseBtn.classList.remove('inMinigame');
        }

        return;
    }

    if(Game.vehicleBlueprintOpen || Game.mapOpen)
    {
        return;
    }

    const timer = document.getElementById('vehicleTimer');

    if(timer && window.gameTimer)
    {
        timer.textContent = window.gameTimer.getFormattedTime();
    }

    if(Game.currentState === 'PLAYING')
    {
        if(!Game.pause.canPause())
        {
            return;
        }

        Game.currentState = 'PAUSED';
        Game.showScreen('pauseScreen');

        showMobileControls(false);
        showActionBtn(false);

        if(timer)
        {
            timer.style.color = 'gray';
        }
    }
    else if(Game.currentState === 'PAUSED')
    {
        Game.currentState = 'PLAYING';
        Game.showScreen(null);

        showMobileControls(true);
        showActionBtn(true);

        if(timer)
        {
            timer.style.color = 'white';
        }
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

    if(window.AudioSystem && typeof window.AudioSystem.stopAll === 'function')
    {
        window.AudioSystem.stopAll();
    }

    const timer = document.getElementById('vehicleTimer');

    if(timer)
    {
        timer.style.color = 'white';
    }

    Game.showScreen('mainMenu');
    showMobileControls(false);
    showVehicleTimer(false);
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