const roomManager = 
{
    currRoomId: 'hub',
    isTrans: false,
    transFrames: 30, //uses frames cuz well, i haven't built a fucking timer yet
    framesElapsed: 0,
    transDir: null,
    incomingRoomId: null,
    margin: 25, //wall thickness

    getCurrRoom()
    {
        return Rooms[this.currRoomId];
    },

    inExitRange(pos, exit)
    {
        if(exit.edge === 'top' || exit.edge === 'bot')
        {
            return pos.x >= exit.rangeStart && pos.x <= exit.rangeEnd;
        }
        return pos.y >= exit.rangeStart && pos.y <= exit.rangeEnd;
    },

    roomClamp(pos)
    {
        const halfWidth = pos.width / 2;
        const halfHeight = pos.height / 2;
        const bounds = this.margin;

        const room = this.getCurrRoom();

        const topExit = room.exits.find(e => e.edge === 'top' && this.inExitRange(pos, e));
        const botExit = room.exits.find(e => e.edge === 'bot' && this.inExitRange(pos, e));
        const leftExit = room.exits.find(e => e.edge === 'left' && this.inExitRange(pos, e));
        const rightExit = room.exits.find(e => e.edge === 'right' && this.inExitRange(pos, e));
    
        if(pos.y - halfHeight < bounds && !topExit)
        {
            pos.y = bounds + halfHeight;
        }

        if(pos.y + halfHeight > 720-bounds && !botExit)
        {
            pos.y = 720 - bounds - halfHeight;
        }

        if(pos.x - halfWidth < bounds && !leftExit)
        {
            pos.x = bounds + halfWidth;
        }

        if(pos.x + halfWidth > 1280-bounds && !rightExit)
        {
            pos.x = 1280 - bounds - halfWidth;
        }

    },

    checkExits(pos)
    {
        if(this.isTrans)
        {
            return;
        }

        const room = this.getCurrRoom();
        const halfWidth = pos.width / 2;
        const halfHeight = pos.height / 2;
        const bounds = this.margin;

        for(const exit of room.exits)
        {
            if(!this.inExitRange(pos, exit))
            {
                continue;
            }

            const crossed = (exit.edge === 'top' && pos.y - halfHeight <= bounds) || (exit.edge === 'bot' && pos.y + halfHeight >= 720 - bounds) || (exit.edge === 'left' && pos.x - halfWidth <= bounds) || (exit.edge === 'right' && pos.x + halfWidth >= 1280 - bounds);

            if(crossed)
            {
                this.startTrans(exit);
                return;
            }
        }
    },

    startTrans(exit)
    {
        this.isTrans = true;
        this.framesElapsed = 0;
        this.transDir = exit.edge;
        this.incomingRoomId = exit.targetRoom;
    },

    update(pos)
    {
        if(!this.isTrans)
        {
            this.checkExits(pos);
            return;
        }

        this.framesElapsed++;

        if(this.framesElapsed >= this.transFrames)
        {
            this.completeTrans(pos);
        }
    },

    completeTrans(pos)
    {
        const dir = this.transDir;
        this.currRoomId = this.incomingRoomId;
        this.isTrans = false;
        this.incomingRoomId = null;

        const halfWidth = pos.width / 2;
        const halfHeight = pos.height / 2;
        const bounds = this.margin;

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
    },

    drawHorEdge(ctx, y, exit)
    {
        if(exit)
        {
            ctx.fillRect(0, y, exit.rangeStart, this.margin);
            ctx.fillRect(exit.rangeEnd, y, 1280 - exit.rangeEnd, this.margin);
        }
        else
        {
            ctx.fillRect(0, y, 1280, this.margin);
        }
    },

    drawVertEdge(ctx, x, exit)
    {
        if(exit)
        {
            ctx.fillRect(x, 0, this.margin, exit.rangeStart);
            ctx.fillRect(x, exit.rangeEnd, this.margin, 720-exit.rangeEnd)
        }
        else
        {
            ctx.fillRect(x, 0, this.margin, 720);
        }
    },

    drawBounds(ctx, room)
    {
        ctx.fillStyle = '#5c5c5c';
        this.drawHorEdge(ctx, 0, room.exits.find(e => e.edge === 'top'));
        this.drawHorEdge(ctx, 720 - this.margin, room.exits.find(e => e.edge === 'bot'));
        this.drawVertEdge(ctx, 0, room.exits.find(e => e.edge === 'left'));
        this.drawVertEdge(ctx, 1280 - this.margin, room.exits.find(e =>e.edge === 'right'));
    },

    render(ctx)
    {
        if(!this.isTrans)
        {
            const room = this.getCurrRoom();
            room.render(ctx);
            this.drawBounds(ctx, room);
            return;
        }

        const progress = this.framesElapsed / this.transFrames;
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
        this.getCurrRoom().render(ctx);
        ctx.restore();

        ctx.save();
        ctx.translate(newX, newY);
        Rooms[this.incomingRoomId].render(ctx);
        ctx.restore();

        //for several *OBVIOUS* reasons, broder is loaded after the pan, if you've played any retro game, that is self explanatory
    }
};

window.roomManager = roomManager;