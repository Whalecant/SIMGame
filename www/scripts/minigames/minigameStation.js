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

class stationManager
{
    constructor()
    {
        this.completedLevels = new Set();

        this.nodeColors = {
            goldNode: '#ffd700',
            blackNode: '#333333',
            whiteNode: '#ffffff',
            purpleNode: '#9b59b6',
            pinkNode: '#ff69b4',
            azureNode: '#007fff',
            emeraldNode: '#50c878',
            amberNode: '#ffbf00',
        }

        this.roomNodes = 
        {
            northWing: [
                {
                    currentMgId: 'goldNode', 
                    x: 500, 
                    y: 550, 
                    width: 60, 
                    height: 60, 
                    levelIdx: 1, 
                    rewardPartKey: 'Part1',
                },
                {
                    currentMgId: 'blackNode',
                    x: 750,
                    y: 550,
                    width: 60,
                    height: 60,
                    levelIdx: 2,
                    rewardPartKey: 'Part2',
                },
            ],
            southWing: [
                {
                    currentMgId: 'whiteNode',
                    x: 500,
                    y: 200,
                    width: 60,
                    height: 60,
                    levelIdx: 3,
                    rewardPartKey: 'Part3',
                },
                {
                    currentMgId: 'purpleNode',
                    x: 750,
                    y: 200,
                    width: 60,
                    height: 60,
                    levelIdx: 4,
                    rewardPartKey: 'Part4',
                },
            ],
            eastWing: [
                {
                    currentMgId: 'pinkNode',
                    x: 400,
                    y: 300,
                    width: 60,
                    height: 60,
                    levelIdx: 5,
                    rewardPartKey: 'Part5',
                },
                {
                    currentMgId: 'azureNode',
                    x: 400,
                    y: 450,
                    width: 60,
                    height: 60,
                    levelIdx: 6,
                    rewardPartKey: 'Part6',
                },
            ],
            westWing: [
                {
                    currentMgId: 'emeraldNode',
                    x: 1000,
                    y: 300, 
                    width: 60,
                    height: 60,
                    levelIdx: 7,
                    rewardPartKey: 'Part7',
                },
                {
                    currentMgId: 'amberNode',
                    x: 1000,
                    y: 450,
                    width: 60,
                    height: 60,
                    levelIdx: 8,
                    rewardPartKey: 'Part8',
                },
            ],
        };
    }

    get minigames()
    {
        return {
            'goldNode': window.forestLevel1Minigame,
            'blackNode': window.forestLevel2Minigame,
            'whiteNode': window.forestLevel3Minigame,
            'purpleNode': window.forestLevel4Minigame,
            'pinkNode': window.forestLevel5Minigame,
            'azureNode': window.forestLevel6Minigame,
            'emeraldNode': window.forestLevel7Minigame,
            'amberNode': window.forestLevel8Minigame,
            'redNode': window.forestLevel9Minigame,
        };

    }

    markLevelComplete(mgId)
    {
        this.completedLevels.add(mgId);
    }

    isLevelComplete(mgId)
    {
        return this.completedLevels.has(mgId);
    }

    getNearbyStation(player, roomId)
    {
        const nodes = this.roomNodes[roomId];
        if(!nodes)
            return null;
    
        for(const node of nodes)
        {
            const dX = player.x - node.x;
            const dY = player.y - node.y;
            const dist = Math.sqrt(dX * dX + dY * dY);

            if(dist <= 60)
                return node;
        }
        return null;
    }

    toGray(hex)
    {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

        return Math.round(90 + gray * 0.4);
    }

    renderRoom(ctx, roomId)
    {
        const nodes = this.roomNodes[roomId];
        if(!nodes)
            return;

        ctx.font = '14px courier-new';
        ctx.textAlign = 'center';

        for(const node of nodes)
        {      
            const isCompleted = this.completedLevels.has(node.currentMgId);
            let textColor = '#ffffff';

            if(isCompleted)
            {
                const value = this.toGray(this.nodeColors[node.currentMgId]);
                ctx.fillStyle = `rgb(${value}, ${value}, ${value})`;
                textColor = value > 150 ? '#000000' : '#ffffff';
            }
            else
            {
                ctx.fillStyle = this.nodeColors[node.currentMgId];

                if(node.currentMgId === 'whiteNode' || node.currentMgId === 'goldNode')
                {
                    textColor = '#000000';
                }
            }

            ctx.fillRect(node.x - node.width/2, node.y - node.height/2, node.width, node.height);

            ctx.fillStyle = textColor;
            ctx.fillText(`Lvl ${node.levelIdx}`, node.x, node.y + 5);
        }
    }
};

window.stationManager = new stationManager();

