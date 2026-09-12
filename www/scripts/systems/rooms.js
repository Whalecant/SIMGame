const islandSprite = new Image();
islandSprite.src = 'assets/map/island.png';

const bridgeSprite = new Image();
bridgeSprite.src = 'assets/map/bridge.png';

const rooms = 
{
    hub:
    {
        id: 'hub',
        color: '#4f8ce7',
        minX: 200,
        maxX: 1080,
        minY: 180,
        maxY: 540,
        exits:
        [
            {
                edge: 'top', 
                rangeStart: 560, 
                rangeEnd: 720, 
                targetRoom: 'northWing',
                length: 220,
                thickness: 90,
            },
            
            {
                edge: 'bot', 
                rangeStart: 560, 
                rangeEnd: 720, 
                targetRoom: 'southWing',
                length: 230,
                thickness: 90,
            },

            {
                edge: 'right', 
                rangeStart: 350, 
                rangeEnd: 600, 
                targetRoom: 'eastWing',
                length: 250,
                thickness: 90,
            },
            
            {
                edge: 'left', 
                rangeStart: 350, 
                rangeEnd: 600, 
                targetRoom: 'westWing',
                length: 250,
                thickness: 90,
            }

        ],

        render(ctx)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, 1280, 720);

            if(islandSprite.complete && islandSprite.naturalWidth !== 0)
            {
                ctx.drawImage(islandSprite, 0, 0, 1280, 720);
            }
        }
    },

    northWing:
    {
        id: 'northWing',
        color: '#4f8ce7',

        minX: 180,
        maxX: 1100,
        minY: 340,
        maxY: 720,
        exits:
        [
            {
                edge: 'bot',
                rangeStart: 560,
                rangeEnd: 720,
                targetRoom: 'hub',
                length: 50,
                thickness: 90,
            },
        ],

        render(ctx)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, 1280, 720);

            if(islandSprite.complete && islandSprite.naturalWidth !== 0)
            {
                ctx.drawImage(islandSprite, 180, 300, 920, 500);
            }
        }
    }, 

    southWing:
    {
        id: 'southWing',
        color: '#4f8ce7',
        minX: 180,
        maxX: 1100,
        minY: 0,
        maxY: 380,
        exits:
        [
            {
                edge: 'top',
                rangeStart: 560,
                rangeEnd: 720,
                targetRoom: 'hub',
                length: 100,
                thickness: 90,
            },
        ],

        render(ctx)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, 1280, 720);

            if(islandSprite.complete && islandSprite.naturalWidth !== 0)
            {
                ctx.drawImage(islandSprite, 180, -80, 920, 500);
            }
        }
    }, 

    eastWing:
    {
        id: 'eastWing',
        color: '#4f8ce7',
        minX: 0,
        maxX: 600,
        minY: 120,
        maxY: 600,

        exits:
        [
            {
                edge: 'left',
                rangeStart: 350,
                rangeEnd: 600,
                targetRoom: 'hub',
                length: 100,
                thickness: 90,
                
            },
        ],

        render(ctx)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, 1280, 720);

            if(islandSprite.complete && islandSprite.naturalWidth !== 0)
            {
                ctx.drawImage(islandSprite, -40, 110, 720, 500);
            }
        }
    }, 

    westWing:
    {
        id: 'westWing',
        color: '#4f8ce7',
        minX: 680,
        maxX: 1280,
        minY: 120,
        maxY: 600,
        exits:
        [
            {
                edge: 'right',
                rangeStart: 350,
                rangeEnd: 600,
                targetRoom: 'hub',
                length: 100,
                thickness: 90,
            },
        ],

        render(ctx)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, 1280, 720);

            if(islandSprite.complete && islandSprite.naturalWidth !== 0)
            {
                ctx.drawImage(islandSprite, 600, 110, 720, 500);       
            }
        }
    }, 
};

window.Rooms = rooms;