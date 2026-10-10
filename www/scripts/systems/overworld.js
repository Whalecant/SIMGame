const overworld = 
{
    mode: 'room', // can either be room  for the main hub and 4 wings, or mg for the 12 parts later

    isTrans: false,
    transType: 'pan', // pan means the camera pans over, fade is for fadeout and fade in transition
    transAct: null,  //either roomToRoom, roomToMg, or MgToRoom
    activeTransFrames: 30,
    framesElapsed: 0,
    transDir: null,
    fadeColor: '#000000',
    hasTransed: false,

    pendingExit: null,
    activeMg: null,
    returnPos: null,
    lastMgRes: null,

    canvas: null,
    ctx: null,

    init(canvas, ctx)
    {
        this.canvas = canvas;
        this.ctx = ctx;
    },

    easeInOutQuad(time) //again, do you want boring math explanation, or tl;dr math equation = time for fade transition
    {
        if (time < 0.5)
        {
            return time = 2 * time * time;
        }
        else
        {
            return time = 1 - Math.pow(-2 * time + 2, 2) / 2;
        }
    }, 

    update(pos, deltaTime)
    {
        if(this.isTrans)
        {
            this.updateTrans(pos);
            return;
        }

        if(this.mode === 'room')
        {
            
            roomManager.roomClamp(pos);
            const exit = roomManager.checkExits(pos);
            if(exit)
            {
                this.startExitTrans(exit, pos);
                return;
            }
        }
        else if(this.mode == 'mg')
        {                
            this.activeMg.tick(deltaTime);
        }
    },

    updateTrans(pos)
    {
        this.framesElapsed++;
        let swapPoint = 0;

        if (this.transType == 'fade')
        {
            swapPoint = this.activeTransFrames / 2;
        }
        else
        {
            swapPoint = this.activeTransFrames;
        }

        if(!this.hasTransed && this.framesElapsed >= swapPoint)
        {
            this.doSwap(pos);
            this.hasTransed = true;
        }

        if(this.framesElapsed >= this.activeTransFrames)
        {
            this.isTrans = false;
            this.pendingExit = null;
        }
    },

    startExitTrans(exit, pos)
    {
        this.isTrans = true;
        this.framesElapsed = 0;
        this.hasTransed = false;
        this.pendingExit = exit;
        this.transDir = exit.edge;
        this.fadeColor = '#000000';
        this.activeTransFrames = 30;

        if(exit.targetMg)
        {
            this.transAct = 'roomToMg';
            this.transType = 'fade';
            this.returnPos =
            {
                x : pos.x,
                y : pos.y
            };
        }
        else
        {
            this.transAct = 'roomToRoom';
            this.transType = 'pan';
        }
    },

    endMg(result)
    {
        this.lastMgRes = result;

        this.isTrans = true;
        this.framesElapsed = 0;
        this.hasTransed = false;
        this.transAct = 'mgToRoom';
        this.transType = 'fade';
        this.activeTransFrames = 45;
        this.fadeColor = '#000000';
    },

    hidePlayer()
    {
        if(this.isTrans)
        {
            return true;
        }

        if(this.mode == 'mg' && this.activeMg && this.activeMg.hidePlayer)
        {
            return true;
        }

        return false;
    },

    hideDpad()
    {
        if(this.isTrans)
        {
            return true;
        }

        if(this.mode == 'mg' && this.activeMg && this.activeMg.hideDpad)
        {
            return true;
        }

        return false;
    },
    
    showActionBtn()
    {
        if(this.isTrans)
        {
            return false;
        }

        return this.mode === 'room' || this.mode === 'mg';
    },
    
    doSwap(pos)
    {
        if(this.transAct === 'roomToMg')
        {
            const exit = this.pendingExit;
            this.mode = 'mg';
            this.mgEntryEdge = exit.edge;

            showVehicleTimer(false);

            const mgClass = window[exit.targetMg];
            this.activeMg = new mgClass(this.canvas, this.ctx, (result) => this.endMg(result));
            this.activeMg.start();
            return;
        }

        if(this.transAct === 'mgToRoom')
        {
            this.mode = 'room';
            this.activeMg = null;
            pos.x = this.returnPos.x;
            pos.y = this.returnPos.y;

            showVehicleTimer(true);

            const nudge = 20;
            if(this.mgEntryEdge === 'top')
            {
                pos.y += nudge;
            }
            if(this.mgEntryEdge === 'bot')
            {
                pos.y -= nudge;
            }
            if(this.mgEntryEdge === 'left')
            {
                pos.x += nudge;
            }
            if(this.mgEntryEdge === 'right')
            {
                pos.x -= nudge;
            }

            this.mgEntryEdge = null;
            this.returnPos = null;
            return;
        }


        //for room to room
        const exit = this.pendingExit;
        const dir = this.transDir;
        const bounds = roomManager.margin;
        const fromRoom = roomManager.currRoomId;

        roomManager.currRoomId = exit.targetRoom;

        if(dir === 'top')
        {
            pos.y = 720 - bounds - pos.height;
        }
        if(dir === 'bot')
        {
            pos.y = bounds + pos.height;
        }
        if(dir === 'left')
        {
            pos.x = 1280 - bounds - pos.width;
        }
        if(dir === 'right')
        {
            pos.x = bounds + pos.width;
        }

        if(window.eggManager)
        {
            eggManager.onRoomSwap(fromRoom, exit.targetRoom);
        }
    },

    render(ctx)
    {
        if(this.isTrans)
        {
            this.renderTrans(ctx);
            return;
        }

        if(this.mode === 'mg')
        {
            this.activeMg.render();
            return;
        }

        roomManager.renderRoom(ctx);
        if(window.Vehicle && roomManager.currRoomId === 'hub')
        {
            Vehicle.render(ctx);
        }

        if(window.savePoint && roomManager.currRoomId === 'hub')
        {
            savePoint.render(ctx);
        }

        if(window.oldMan && roomManager.currRoomId === 'hub')
        {
            oldMan.render(ctx);
        }

        if(window.stationManager && window.roomManager)
        {
            window.stationManager.renderRoom(ctx, roomManager.currRoomId);
        }
    },

    renderTrans(ctx)
    {
        if(this.transType === 'fade')
        {
            this.renderFadeTrans(ctx);
        }
        else
        {
            this.renderPanTrans(ctx);
        }
    },

    renderFadeTrans(ctx)
    {
        if(this.mode === 'mg')
        {
            this.activeMg.render();
        }
        else
        {
            roomManager.renderRoom(ctx);
        }

        const time = this.framesElapsed/this.activeTransFrames;
        let alpha = 0;

        if(time <= 0.5)
        {
            alpha = this.easeInOutQuad(time / 0.5);
        }
        else
        {
            alpha = 1 - this.easeInOutQuad((time - 0.5) / 0.5);
        }

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.fadeColor;
        ctx.fillRect(0, 0, 1280, 720);
        ctx.restore();
    },
    
    renderPanTrans(ctx)
    {
        const exit = this.pendingExit;
        const progress = this.framesElapsed / this.activeTransFrames;

        const width = 1280;
        const height = 720;

        let oldX = 0, oldY = 0, newX = 0, newY = 0;

        if(this.transDir === 'top')
        {
            oldY = height * progress;
            newY = -height + height * progress;
        }
        if(this.transDir === 'bot')
        {
            oldY = -height * progress;
            newY = height - height * progress;
        }
        if(this.transDir === 'left')
        {
            oldX = width * progress;
            newX = -width + width * progress;
        }
        if(this.transDir === 'right')
        {
            oldX = -width * progress;
            newX = width - width * progress;
        }

        ctx.save();
        ctx.translate(oldX, oldY);
        Rooms[roomManager.currRoomId].render(ctx);
        ctx.restore();

        ctx.save();
        ctx.translate(newX, newY);
        Rooms[this.pendingExit.targetRoom].render(ctx);
        ctx.restore();
    }


};

window.overworld = overworld;