const roomManager = 
{
    currRoomId: 'hub',
    /*
    isTrans: false,
    transFrames: 30, //uses frames cuz well, i haven't built a fucking timer yet
    framesElapsed: 0,
    transDir: null,
    incomingRoomId: null,
    */
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

    isInsideIslandBounds(pos, room)
    {
        if(!room)
            return true;

        const cx = room.centerX || 640;
        const cy = room.centerY || 360;
        const rx = room.radiusX || 380;
        const ry = room.radiusY || 180;

        const dx = pos.x - cx;
        const dy = pos.y - cy;

        if(Array.isArray(room.exits))
        {
            for (const exit of room.exits)
            {
                if(this.inExitRange(pos, exit))
                {
                    if(exit.edge === 'top' && pos.y < cy)
                        return true;
                    if(exit.edge === 'bot' && pos.y > cy)
                        return true;
                    if(exit.edge === 'left' && pos.x < cx)
                        return true;
                    if(exit.edge === 'right' && pos.x > cx)
                        return true;
                }
            }
        }
        

        return((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry)) <= 1;
    },

    roomClamp(pos)
    {
        const room = this.getCurrRoom();
        if(!room)
            return;

        const halfWidth = pos.width / 2;
        const halfHeight = pos.height / 2;

        const minX = room.minX ?? 200;
        const maxX = room.maxX ?? 1080;
        const minY = room.minY ?? 180;
        const maxY = room.maxY ?? 540;

        const doorway = 16;

        const exits = room.exits || [];
        const topExit = exits.find(e => e.edge === 'top');
        const botExit = exits.find(e => e.edge === 'bot');
        const leftExit = exits.find(e => e.edge === 'left');
        const rightExit = exits.find(e => e.edge === 'right');

        const lane = (value, exit) =>
        {
            return Math.max(exit.rangeStart, Math.min(exit.rangeEnd, value));
        };

        const overTop = minY - (pos.y - halfHeight);
        if(overTop > 0)
        {
            if(topExit && (overTop > doorway || this.inExitRange(pos, topExit)))
            {
                pos.x = lane(pos.x, topExit, halfWidth);
            }
            else
            {
                pos.y = minY + halfHeight;
            }
        }

        const overBot = (pos.y + halfHeight) - maxY;
        if(overBot > 0)
        {
            if(botExit && (overBot > doorway || this.inExitRange(pos, botExit)))
            {
                pos.x = lane(pos.x, botExit, halfWidth);
            }
            else
            {
                pos.y = maxY - halfHeight;
            }
        }

        const overLeft = minX - (pos.x - halfWidth);
        if(overLeft > 0)
        {
            if(leftExit && (overLeft > doorway || this.inExitRange(pos, leftExit)))
            {
                pos.y = lane(pos.y, leftExit, halfHeight);
            }
            else
            {
                pos.x = minX + halfWidth;
            }
        }

        const overRight = (pos.x + halfWidth) - maxX;
        if(overRight > 0)
        {
            if(rightExit && (overRight > doorway || this.inExitRange(pos, rightExit)))
            {
                pos.y = lane(pos.y, rightExit, halfHeight);
            }
            else
            {
                pos.x = maxX - halfWidth;
            }
        }
    },

        // const halfWidth = pos.width / 2;
        // const halfHeight = pos.height / 2;
        // const bounds = this.margin;

        // const room = this.getCurrRoom();

        // const topExit = room.exits.find(e => e.edge === 'top' && this.inExitRange(pos, e));
        // const botExit = room.exits.find(e => e.edge === 'bot' && this.inExitRange(pos, e));
        // const leftExit = room.exits.find(e => e.edge === 'left' && this.inExitRange(pos, e));
        // const rightExit = room.exits.find(e => e.edge === 'right' && this.inExitRange(pos, e));
    
        // if(pos.y - halfHeight < bounds && !topExit)
        // {
        //     pos.y = bounds + halfHeight;
        // }

        // if(pos.y + halfHeight > 720-bounds && !botExit)
        // {
        //     pos.y = 720 - bounds - halfHeight;
        // }

        // if(pos.x - halfWidth < bounds && !leftExit)
        // {
        //     pos.x = bounds + halfWidth;
        // }

        // if(pos.x + halfWidth > 1280-bounds && !rightExit)
        // {
        //     pos.x = 1280 - bounds - halfWidth;
        // }

    checkExits(pos)
    {
        /*
        if(this.isTrans)
        {
            return;
        }
        */

        const room = this.getCurrRoom();
        const halfWidth = pos.width / 2;
        const halfHeight = pos.height / 2;
                

        for(const exit of room.exits)
        {
            if(!this.inExitRange(pos, exit))
            {
                continue;
            }

            const crossed = (exit.edge === 'top' && pos.y - halfHeight <= 0) || (exit.edge === 'bot' && pos.y + halfHeight >= 720) || (exit.edge === 'left' && pos.x - halfWidth <= 0) || (exit.edge === 'right' && pos.x + halfWidth >= 1280);

            if(crossed)
            {
                return exit;
            }
        }

        return null;
    },

    /*

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
    */

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

    /*
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
    */



    renderBridges(ctx, room)
    {
        if(!bridgeSprite.complete || bridgeSprite.naturalWidth === 0)
            return;

        for (const exit of room.exits)
        {
            ctx.save();

            const len = exit.length || 180;
            const thick = exit.thickness || 80;

            if(exit.edge === 'left')
            {
                ctx.drawImage(bridgeSprite, 0, exit.rangeStart, len, thick);            }
            else if(exit.edge === 'right')
            {
                ctx.drawImage(bridgeSprite, 1280 - len, exit.rangeStart, len, thick);
            }
            else if(exit.edge === 'top')
            {
                const midX = (exit.rangeStart + exit.rangeEnd) / 2;
                ctx.translate(midX, len / 2);
                ctx.rotate(Math.PI / 2);
                ctx.drawImage(bridgeSprite, -len / 2, -thick / 2, len, thick);
            }
            else if(exit.edge === 'bot')
            {
                const midX = (exit.rangeStart + exit.rangeEnd) / 2;
                ctx.translate(midX, 720 - len / 2);
                ctx.rotate(-Math.PI / 2);
                ctx.drawImage(bridgeSprite, -len / 2, -thick / 2, len, thick);
            }

            ctx.restore();
        }
    },

    renderRoom(ctx)
    {
        const room = this.getCurrRoom();
        room.render(ctx);
        this.renderBridges(ctx, room)
    },

    //the multiline comments are the parts taht got moved to overworld.js
};

window.roomManager = roomManager;