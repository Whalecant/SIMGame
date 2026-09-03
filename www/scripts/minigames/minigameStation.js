class minigameStation
{
    constructor(room, x, y, width, height, currentMgId, rewardPartKey, radii, colliderWidth, colliderHeight, colliderOffset)
    {
        this.room = room;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.currentMgId = currentMgId;
        this.rewardPartKey = rewardPartKey;
        this.radii = radii;
        this.colliderWidth = colliderWidth;
        this.colliderHeight = colliderHeight;
        this.colliderOffset = colliderOffset;
    }

    nearPlayer(player)
    {
        const dx = player.x - (this.x + this.width / 2);
        const dy = player.y - (this.y + this.height / 2);

        return Math.sqrt(dx * dx + dy * dy) < 60;
    } 

    
    boxCollider(pos, nextX, nextY)
    {
        const halfWidth = pos.width / 2;
        const halfHeight = pos.height / 2;

        const left = nextX - halfWidth;
        const right = nextX + halfWidth;
        const top = nextY - halfHeight;
        const bot = nextY + halfHeight;

        const cx = this.x + this.colliderOffset;
        const cy = this.y;

        const sLeft = cx - this.colliderWidth/2;
        const sRight = cx + this.colliderWidth/2;
        const sTop = cy - this.colliderHeight/10;
        const sBot = cy + this.colliderHeight;

        return left < sRight && right > sLeft && top < sBot && bot > sTop;
    }

    render(ctx)
    {
        ctx.fillStyle = '#4a5568';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        if(window.Player && this.nearPlayer(window.Player))
        {
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`[E] Get ${this.rewardPartKey}`, this.x + this.width/2, this.y - 10);
        }
    }
}

const stationManager = 
{
    stations:
    [
        new minigameStation('northWing', 300, 150, 64, 64, 'connectWireMinigame', 'Wires', 75, 15, 30, 30),
        new minigameStation('northWing', 600, 150, 64, 64, 'mgTemp1', 'Part2', 75, 15, 30, 30),
        new minigameStation('northWing', 900, 150, 64, 64, 'mgTemp2', 'Part3', 75, 15, 30, 30),

        new minigameStation('southWing', 300, 450, 64, 64, 'mgTemp3', 'Part4', 75, 15, 30, 30),
        new minigameStation('southWing', 600, 450, 64, 64, 'mgTemp4', 'Part5', 75, 15, 30, 30),
        new minigameStation('southWing', 900, 450, 64, 64, 'mgTemp5', 'Part6', 75, 15, 30, 30),

        new minigameStation('eastWing', 1000, 125, 64, 64, 'mgTemp6', 'Part7', 75, 15, 30, 30),
        new minigameStation('eastWing', 1000, 325, 64, 64, 'mgTemp7', 'Part8', 75, 15, 30, 30),
        new minigameStation('eastWing', 1000, 525, 64, 64, 'mgTemp8', 'Part9', 75, 15, 30, 30),

        new minigameStation('westWing', 200, 125, 64, 64, 'mgTemp9', 'Part10', 75, 15, 30, 30),
        new minigameStation('westWing', 200, 325, 64, 64, 'mgTemp10', 'Part11', 75, 15, 30, 30),
        new minigameStation('westWing', 200, 525, 64, 64, 'mgTemp11', 'Part12', 75, 15, 30, 30),
    ],

    getRoomStations(roomName)
    {
        return this.stations.filter(station => station.room === roomName);
    },

    checkCollision(player, currRoom, nextX, nextY)
    {
        const roomStations = this.getRoomStations(currRoom);
        return roomStations.some(station => (station.boxCollider(player, nextX, nextY))); // some() is a funciton to test if at least 1 element in the array provided a callback funciton
    },

    getNearbyStation(player, currRoom)
    {
        const roomStations = this.getRoomStations(currRoom);
        return roomStations.find(station => station.nearPlayer(player)) || null;
    },

    renderRoom(ctx, currRoom)
    {
        const roomStations = this.getRoomStations(currRoom);
        roomStations.forEach(station => station.render(ctx));
    }
};

window.stationManager = stationManager;

