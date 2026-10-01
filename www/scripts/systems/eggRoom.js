const info = JSON.parse(localStorage.getItem('SCCFEggReturn') || 'null') || {};
const slot = info.slot;
const takenKey = 'SCCFEggTaken_' + slot;

let taken = localStorage.getItem(takenKey) === '1';

const msgQueue = [];
let msgBusy = false;


const door = 
{
    x: 590,
    y: 690,
    w: 100,
    h: 30,
}

function showMsgPopup(text, duration = 1800)
{
    msgQueue.push({text, duration});

    if(!msgBusy)
    {
        nextMsg();
    }
}

function nextMsg()
{
    const el = document.getElementById('msgPopup');
    const msg = msgQueue.shift();

    if(!msg || !el)
    {
        msgBusy = false;
        return;
    }

    msgBusy = true;
    el.textContent = msg.text;
    el.classList.add('visible');

    setTimeout(() =>
    {
        el.classList.remove('visible');
        setTimeout(nextMsg, 250);
    }, msg.duration);
}
const keys = {};
let ePressed = false;

function press(k)
{
    if(!keys[k])
    {
        keys[k] = true;
        if(k === 'e') 
            ePressed = true;
    }
}

function release(k)
{
    keys[k] = false;
}

const down = (...ks) => ks.some(k => keys[k]);

addEventListener('keydown', e =>press(e.key.toLowerCase()));
addEventListener('keyup', e => release(e.key.toLowerCase()));

if('ontouchstart' in window)
{
    document.querySelectorAll('.t').forEach(btn =>
    {
        btn.style.display = 'block';
        btn.addEventListener('pointerdown', e => 
            {
                e.preventDefault();
                press(btn.dataset.k);
            }
        );
        btn.addEventListener('pointerup', () => release(btn.dataset.k));
        btn.addEventListener('touchstart', e => press(btn.dataset.k));
        btn.addEventListener('touchend', e => release(btn.dataset.k));
    });
}

const cv = document.getElementById('c');
const ctx = cv.getContext('2d');
ctx.imageSmoothingEnabled = false;

const sprite = new Image();
sprite.src = './assets/character/characterAnimationSpritesheet.png';
const dirMap = 
{
    down: 0,
    up: 3,
    left: 6,
    right: 9,
};

const squishScaleY = [1.0, 0.9, 1.0];
const squishScaleX = [1.0, 1.15, 1.0];

const pos = 
{
    x: 640,
    y: 620,
    w: 48,
    h: 48,
    dir: 'up',
    frame: 0,
    t: 0,
    moving: false,
};

const trunk = 
{
    x: 880,
    y: 262,
    w: 40,
    h: 50,
};

const egg = 
{
    x: 900,
    y: 228,
    w: 40,
    h: 50,
};

const TREE_BASE_Y = 312;

const blocked = (x, y) => x > 860 && x < 940 && y > 242 && y < 332;

function leave()
{
    window.location.replace('index.html');
}

function takeEgg()
{
    taken = true;
    localStorage.setItem(takenKey, '1');

    showMsgPopup('Egg.'); 

    if(typeof achievementManager !== 'undefined')
    {
        achievementManager.unlock('egg');
    }
}

function update(dt)
{
    const sp = 300 * dt;
    let nx = pos.x, ny = pos.y;

    pos.moving = false;

    if(down('w', 'arrowup'))
    {
        ny -= sp;
        pos.dir = 'up';
        pos.moving = true;
    }
    if(down('s', 'arrowdown'))
    {
        ny += sp;
        pos.dir = 'down';
        pos.moving = true;
    }
    if(down('a', 'arrowleft'))
    {
        nx -= sp;
        pos.dir = 'left';
        pos.moving = true;
    }
    if(down('d', 'arrowright'))
    {
        nx += sp;
        pos.dir = 'right';
        pos.moving = true;
    }

    if(!blocked(pos.x, ny))
    {
        pos.y = ny;
    }

    if(!blocked(nx, pos.y))
    {
        pos.x = nx;
    }

    pos.x = Math.max(60, Math.min(1220, pos.x));
    pos.y = Math.max(50, pos.y);

    if(pos.moving)
    {
        pos.t += dt;
        if(pos.t >= 0.15)
        {
            pos.t = 0;
            pos.frame = (pos.frame + 1) % 3;
        }
    }
    else
    {
        pos.frame = 0;
        pos.t = 0;
    }

    if(ePressed)
    {
        ePressed = false;
        if(!taken && pos.y < 262 && Math.hypot(pos.x - egg.x, pos.y - egg.y) < 70)
        {
            takeEgg();
        }
    }

    const doorMin = door.x + 24;
    const doorMax = door.x + door.w - 24;

    const inDoor = pos.x > doorMin && pos.x < doorMax;
    pos.y = Math.max(50, Math.min(inDoor ? 720 : door.y, pos.y));

    if(pos.y > door.y)
    {
        pos.x = Math.max(doorMin, Math.min(doorMax, pos.x));
    }

    pos.x = Math.max(60, Math.min(1220, pos.x));

    if(pos.y > 700 && inDoor)
    {
        leave();
    }
}


function drawPlayer()
{
    if(sprite.complete && sprite.naturalWidth)
    {
        const f = dirMap[pos.dir] + pos.frame;

        const scaleX = pos.moving ? squishScaleX[pos.frame] : 1.0;
        const scaleY = pos.moving ? squishScaleY[pos.frame] : 1.0;
        const drawWidth = Math.round(pos.w * scaleX);
        const drawHeight = Math.round(pos.h * scaleY);

        ctx.drawImage
        (
            sprite,
            f * 304, 0, 304, 304,
            pos.x - drawWidth / 2,
            pos.y - pos.h / 2 + (pos.h - drawHeight),
            drawWidth,
            drawHeight
        );
    }
    else
    {
        ctx.fillStyle = 'skyblue';
        ctx.fillRect(pos.x - 24, pos.y - 24, 48, 48);
    }
}

function drawEgg()
{
    if(taken)
        return;

    ctx.fillStyle = '#fff7e0';
    ctx.strokeStyle = '#c9b58a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(egg.x, egg.y, 14, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}


const CANOPY = 
{
    x: 900,
    y: 190,
    r: 110,
}

function underCanopy()
{
    return pos.y < TREE_BASE_Y && Math.hypot(pos.x - CANOPY.x, pos.y - CANOPY.y) < CANOPY.r + 24;
}

function drawTree(fade)
{
    ctx.fillStyle = '#5a3b22';
    ctx.fillRect(trunk.x, trunk.y, trunk.w, trunk.h);

    ctx.globalAlpha = fade ? 0.55 : 1;
    ctx.fillStyle = '#dc3248';
    ctx.beginPath();
    ctx.arc(CANOPY.x, CANOPY.y, CANOPY.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
}



function render()
{
    ctx.fillStyle = '#e246c6';
    ctx.fillRect(0, 0, 1280, 720);

    ctx.fillStyle = '#6b4a2b';
    ctx.fillRect(door.x, door.y, door.w, door.h);

    drawEgg();

    const behind = pos.y < TREE_BASE_Y;
    const fade = underCanopy();

    if(behind)
        drawPlayer();

    drawTree(fade);

    if(!behind)
        drawPlayer();
}

let last = 0;
function loop(ts)
{
    const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0;
    last = ts;
    update(dt);
    render();
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);