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

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    },

    //obvious i don't need to fucking explain what the 2 functions below do me (yes i'm talking to myself for future reference)
    update(deltaTime)
    {
        if(window.Input)
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

        if(window.Player && typeof window.Player.update === 'function') 
        {
            window.Player.update(deltaTime);
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

        const freeze = window.overworld && overworld.hidePlayer();
        
        if(window.Player && typeof window.Player.render === 'function' && !freeze)
        {
            window.Player.render(this.ctx);
        }

        const hideDpad = window.overworld && overworld.hideDpad();
        showDpad(!hideDpad);

        const showButtons = window.overworld && overworld.showActionBtn();
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
    if(!(window.overworld && overworld.showActionBtn()))
    {
        return;
    }
}

function toggleMap()
{
    if(!(window.overworld && overworld.showActionBtn()))
    {
        return;
    }
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

function loadSave(slotNumber)
{
    Game.currentState = 'PLAYING';
    Game.showScreen(null);
    Game.startGameLoop();

    showMobileControls(true);
    showVehicleTimer(true);
}

function deleteSave(slotNumber)
{
    const slotText = document.getElementById(`infoSlot${slotNumber}`);

    if(slotText)
    {
        slotText.textContent = 'Empty';
    }
}

function togglePause()
{
    const vehicleTimer = document.getElementById('vehicleTimer');

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

        if(vehicleTimer)
        {
            vehicleTimer.style.color = 'gray';
        }
    }
    else if(Game.currentState === 'PAUSED')
    {
        Game.currentState = 'PLAYING';
        Game.showScreen(null);

        showMobileControls(true);
        showActionBtn(true);

        if(vehicleTimer)
        {
            vehicleTimer.style.color = '';
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
    
    Game.showScreen('mainMenu');
    showMobileControls(false);
    showVehicleTimer(false);
    showActionBtn(false);
}

// initialization
window.addEventListener('DOMContentLoaded', () =>
{
    Game.init();
});